import Koa from 'koa'
import cors from 'koa2-cors'
import { PrismaClient } from '@prisma/client'

const app = new Koa()
const prisma = new PrismaClient()

app.use(cors())

app.use(async (ctx, next) => {
    if (ctx.url.match('/api/roads')) {
        const options = await getOption(
            Number(ctx.query.day),
            Number(ctx.query.section)
        )
        ctx.body = options
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
