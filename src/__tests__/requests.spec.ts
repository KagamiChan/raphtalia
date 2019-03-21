import request from 'supertest'
import glob from 'glob'
import { each } from 'lodash'
import path from 'path'

import { app } from '../app'

describe('webhook events', () => {
  const events = glob.sync(path.resolve(__dirname, './events/*.json'))
  each(events, event => {
    const eventName = path.basename(event).replace('.json', '')
    return it(eventName, async done => {
      const resp = await request(app.callback())
        .post('/app')
        .set('Accept', 'application/json')
        .set('X-GitHub-Event', eventName)
        .expect(200)

      expect(resp.body).toMatchSnapshot()
      done()
    })
  })
})
