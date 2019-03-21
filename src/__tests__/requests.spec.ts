import request from 'supertest'
import glob from 'glob'
import { each } from 'lodash'
import path from 'path'

import { buildFastify } from '../app'

describe('webhook events', () => {
  const fastify = buildFastify()

  beforeAll(() => fastify.ready())
  afterAll(() => fastify.close())

  const events = glob.sync(path.resolve(__dirname, './events/*.json'))

  each(events, event => {
    const eventName = path.basename(event).replace('.json', '')
    return it(eventName, async done => {
      const resp = await request(fastify.server)
        .post('/webhook')
        .set('Accept', 'application/json')
        .set('X-GitHub-Event', eventName)
        .expect(200)

      expect(resp.body).toMatchSnapshot()
      done()
    })
  })
})
