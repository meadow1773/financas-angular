import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import { Project } from 'ts-morph'

const pastaModels =  path.join(process.cwd(), 'src/models/')
const arquivosModels = fs.readdirSync(pastaModels).filter(arquivo => arquivo.endsWith('.ts'))
const arquivoHash = path.join(process.cwd(), "../frontend/src/interfaces/.generation-hash")

// Calcula hash dos arquivos de modelo
function calculaModelHash(): string {
    const hash = crypto.createHash("sha256")

    arquivosModels.forEach(arquivo => {
        const content = fs.readFileSync(
            path.join(pastaModels.replace("/*.ts", ""), arquivo))
        hash.update(content)
    })

    return hash.digest("hex")
}

// Verifica se houve mudanças
function hasChanges(newHash: string): boolean {
    try {
        const oldHash = fs.readFileSync(arquivoHash, "utf-8")
        return oldHash !== newHash
    } catch {
        return true
    }
}

async function generateInterfaces() {
    // Checa se precisa gerar.
    const hashAtual = calculaModelHash()
    if(!hasChanges(hashAtual)) {
        console.log('Não foram geradas interfaces novas.')
        return
    }
    // Configurações
    const project = new Project({
        tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
        skipAddingFilesFromTsConfig: true
    })

    arquivosModels.forEach(arquivo => project.addSourceFileAtPath(path.join(pastaModels, arquivo)))

    // Limpa diretório de interfaces
    const pastaSaida = path.join(process.cwd(), "../frontend/src/interfaces/models.ts")
    if (fs.existsSync(pastaSaida)) fs.unlinkSync(pastaSaida)

    const arquivoSaida = project.createSourceFile(pastaSaida, "", { overwrite: true })

    // Cabeçalho do arquivo
    arquivoSaida.addStatements([
        "// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY",
        "// Gerado automaticamente em: " + new Date().toISOString(),
        ""
    ])

    // Processa cada classe
    for (const arquivoOrigem of project.getSourceFiles()) {
        for (const classe of arquivoOrigem.getClasses()) {
            const nomeClasse = classe.getName()
            if (!nomeClasse) continue

            // Cria a interface
            const nomeInterface = nomeClasse
            const interfaceNova = arquivoSaida.addInterface({
                name: nomeInterface,
                isExported: true,
                docs: classe.getJsDocs().map(doc => doc.getText()),
            })

            // Propriedades
            classe.getProperties().forEach(propriedade => {
                if (propriedade.getScope() !== 'private') {
                    interfaceNova.addProperty({
                        name: propriedade.getName(),
                        type: propriedade.getType().getText(propriedade),
                        hasQuestionToken: propriedade.hasQuestionToken(),
                        docs: propriedade.getJsDocs().map(doc => doc.getText())
                    })
                }
            })

            // Propriedades declarados nos parâmetros do construtor
            classe.getConstructors().forEach(ctor => {
                ctor.getParameters().forEach(param => {
                    if (param.getScope() !== 'private' && !interfaceNova.getProperty(param.getName())) {
                        interfaceNova.addProperty({
                            name: param.getName(),
                            type: param.getType().getText(param),
                            hasQuestionToken: param.isOptional()
                        })
                    }
                })
            })
        }
    }
    await arquivoSaida.save()
    fs.writeFileSync(arquivoHash, hashAtual)
    console.log('Interfaces geradas com sucesso!')
}

generateInterfaces().catch(console.error)
