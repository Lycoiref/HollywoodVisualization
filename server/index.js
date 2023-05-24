import Koa from 'koa'
import cors from 'koa2-cors'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { getCSV } from './utils/pretreatment.js'

const app = new Koa()
const prisma = new PrismaClient()

app.use(cors())

app.use(async (ctx, next) => {
    const fileNames = fs.readdirSync('./data')
    console.log(fileNames)
    const data = await getCSV(fileNames[0])
    console.log(data[1])
    if (ctx.url.match('/api/hollywood')) {
        ctx.body = data
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
