import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
    const filePath = join(process.cwd(), 'assets', 'users.json')
    const file = readFileSync(filePath, 'utf-8')
    return JSON.parse(file)
})
