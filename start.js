#!/usr/bin/env node
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

import axios from 'axios'
import chalk from 'chalk'

/**
 * Paths
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Configurações
 */
const config = {
    infra: {
        command: 'docker',
        args: ['compose', 'up', '-d', '--pull', 'missing'],
        cwd: __dirname
    },

    backend: {
        url: 'http://localhost:3000/api/health',
        timeout: 120000,
        retryInterval: 5000
    },

    backendLogs: {
        command: 'docker',
        args: ['compose', 'logs', '-f', 'backend'],
        cwd: __dirname
    },

    frontend: {
        command: 'ng',
        args: ['serve'],
        cwd: path.join(__dirname, 'frontend')
    }
}

/**
 * Função que inicia um processo
 * @param {*} name 
 * @param {*} param1 
 * @returns 
 */
function startProcess(name, { command, args, cwd }) {
    console.info(chalk.blue(`Iniciando ${name}...`))

    const proc = spawn(command, args, {
        cwd,
        stdio: 'inherit',
        shell: true
    })

    proc.on('error', err => {
        console.error(chalk.red(`Erro ao iniciar ${name}:`), err)
        process.exit(1)
    })

    return proc
}

/**
 * Função que aguarda o backend ficar disponível
 * @returns 
 */
async function waitForBackend() {
    const start = Date.now()

    while (Date.now() - start < config.backend.timeout) {
        try {
            const res = await axios.get(config.backend.url, { timeout: 2000 })
            if (res.status === 200) {
                console.info(chalk.green('Backend está pronto'))
                return true
            }
        } catch {
            console.info(chalk.yellow('Aguardando backend...'))
            await new Promise(r => setTimeout(r, config.backend.retryInterval))
        }
    }

    console.error(chalk.red('Timeout aguardando backend'))
    return false
}

/**
 * Função principal para iniciar o ambiente FullStack
 */
async function startFullStack() {
    let frontendProc
    let backendLogsProc

    try {
        // Sobe a infraestrutura
        startProcess('infra (docker compose)', config.infra)

        // Aguardar backend
        const backendReady = await waitForBackend()
        if (!backendReady) process.exit(1)

        // Inicia os logs do backend
        backendLogsProc = startProcess('logs do backend', config.backendLogs)

        // Inicia o frontend
        frontendProc = startProcess('frontend', config.frontend)

        // Captura SIGINT para encerrar os processos
        process.on('SIGINT', () => {
            console.info(chalk.yellow('\n Encerrando ambiente...'))

            frontendProc?.kill()
            backendLogsProc?.kill()

            spawn('docker', ['compose', 'stop'], {
                cwd: __dirname,
                stdio: 'inherit',
                shell: true
            })

            process.exit()
        })

    } catch (err) {
        console.error(chalk.red('Erro no start FullStack:'), err)
        process.exit(1)
    }
}

startFullStack()
