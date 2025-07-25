#!/usr/bin/env node
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

import axios from 'axios'
import chalk from 'chalk'

// Configuração de caminhos
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configurações
const config = {
    backend: {
        command: 'npm',
        args: ['run', 'dev'],
        cwd: path.join(__dirname, 'backend'),
        url: 'http://localhost:3000/api/health',
        timeout: 60000, // 60 segundos
        retryInterval: 5000 // 5 segundos
    },
    frontend: {
        command: 'ng',
        args: ['serve'],
        cwd: path.join(__dirname, 'frontend')
    }
}

// Função para verificar saúde do backend
async function checkBackendHealth() {
    const startTime = Date.now()

    while (Date.now() - startTime < config.backend.timeout) {
        try {
            const response = await axios.get(config.backend.url, { timeout: 2000 })
            if (response.status === 200) {
                console.log(chalk.green('Backend está pronto!'))
                return true
            }
        } catch (error) {
            console.log(chalk.yellow('Aguardando backend iniciar...'))
            await new Promise(resolve => setTimeout(resolve, config.backend.retryInterval))
        }
    }

    console.log(chalk.red('Timeout: Backend não respondeu dentro do tempo esperado'))
    return false
}

// Função para iniciar um processo
function startProcess(name, { command, args, cwd }) {
    console.log(chalk.blue(`Iniciando ${name}...`))
    const proc = spawn(command, args, {
        cwd,
        stdio: 'inherit',
        shell: true
    })

    proc.on('error', (err) => {
        console.error(chalk.red(`Erro ao iniciar ${name}:`), err)
        process.exit(1)
    })

    return proc
}

// Função principal
async function startFullStack() {
    try {
    // Inicia o backend
        const backend = startProcess('backend', config.backend)

        // Verifica saúde do backend
        const isBackendReady = await checkBackendHealth()
        if (!isBackendReady) {
            backend.kill()
            process.exit(1)
        }

        // Inicia o frontend após backend estar pronto
        const frontend = startProcess('frontend', config.frontend)

        // Manipulação de encerramento
        process.on('SIGINT', () => {
            console.log(chalk.yellow('\nEncerrando processos...'))
            backend.kill()
            frontend.kill()
            process.exit()
        })

    } catch (error) {
        console.error(chalk.red('Erro no script FullStack:'), error)
        process.exit(1)
    }
}

startFullStack()
