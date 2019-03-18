import Koa from 'koa'
import logger from 'koa-pino-logger'

const app = new Koa()

app.use(logger())
app.silent = true

app.use(async ctx => {
  ctx.body = 'Hello world'
})

app.listen(3000)
