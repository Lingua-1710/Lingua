import toBeType from "jest-tobetype"
const request = require('supertest')
const { db } = require('../../db')
const app = require('../../index')
const Prompt = db.model('prompts')
expect.extend(toBeType)

describe('prompt routes', () => {
  beforeAll(() => {
    return db.sync({force: true})
  })

  afterAll(() => {
    db.close()
    return null
  })

  describe('/api/prompts/', () => {
    const testText = 'Hello, how are you?'

    beforeEach(() => {
      return Prompt.create({
        text: testText
      })
    })

    it('GET /api/prompts', () => {
      return request(app)
        .get('/api/prompts')
        .expect(200)
        .then(res => {
          expect(res.body).toBeType('array')
          expect(res.body[0].text).toBe(testText)
        })
    })

    it('GET /api/prompts/:id', () => {
      return request(app)
        .get('/api/prompts/1')
        .expect(200)
        .then(res => {
          expect(res.body).toBeType('object')
          expect(res.body.text).toBe(testText)
        })
    })
  })
})
