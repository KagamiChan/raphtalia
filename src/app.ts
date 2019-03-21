import Fastify, { FastifyInstance, ServerOptions } from 'fastify'

export const buildFastify = (options: ServerOptions = {}): FastifyInstance => {
  const app = Fastify(options)

  app.post('/webhook', (request, reply) => {
    reply.send('hello world')
  })

  return app
}
