import { buildFastify } from './app'

const main = async (): Promise<void> => {
  const fastify = buildFastify({
    logger: true,
  })
  try {
    await fastify.listen(3000)
  } catch (e) {
    fastify.log.error(e)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}
