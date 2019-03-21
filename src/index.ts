import logger from 'koa-pino-logger'

import { app } from './app'

if (require.main === module) {
  app.use(logger())
  app.silent = true
  app.listen(3000)
}
