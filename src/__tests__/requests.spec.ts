import request from 'supertest'
import glob from 'glob'
import { each } from 'lodash'
import path from 'path'
import Bluebird from 'bluebird'
import faker from 'faker'

import { buildFastify } from '../app'

const fastify = buildFastify()

beforeAll(() => fastify.ready())
afterAll(() => fastify.close())

describe('server', () => {
  it('returns 404 for other methods', async done => {
    await Bluebird.each(['get', 'put', 'head', 'delete', 'options'], method =>
      request(fastify.server)
        [method as 'get']('/webhook')
        .expect(404),
    )

    done()
  })

  it('returns 404 for other endpoints', async done => {
    await request(fastify.server)
      .post(`/${faker.random.word()}`)
      .expect(404)

    done()
  })
})

describe('webhook events', () => {
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
