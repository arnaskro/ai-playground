import dotenv from 'dotenv'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import readline from 'readline'
import chalk from 'chalk'
dotenv.config({ path: '../.env' })

const log = console.log

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const chatModel = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
})

async function getInput() {
  return new Promise<string>((resolve, reject) => {
    rl.question(chalk.yellow('\n## Input: '), (answer) => {
      resolve(answer)
    })
  })
}

// greeting
log(chalk.underline.blue('# 01 - Hello World'))

async function loop() {
  const text = await getInput()
  const result = await chatModel.invoke(text)
  log(chalk.green('## Output:'), result.content)
  loop()
}

loop()
