import Fastify, { FastifyInstance } from 'fastify'

export const buildFastify = (): FastifyInstance => {
  const app = Fastify()

  app.post('/webhook', (request, reply) => {
    reply.send('hello world')
  })

  return app
}
