import toBeType from "jest-tobetype"
const request = require('supertest')
const app = require('../../index')
expect.extend(toBeType)

describe('translation routes', () => {
  describe('/api/translation/', () => {
    it('GET /api/translation', () => {
      return request(app)
        .get('/api/translation?translate=es!en!Hola como estas?')
        .expect(200)
        .then(res => {
          expect(res.body).toBeType('string')
          expect(res.body).toBe('Hello how are you?')
        })
    })
  })
})
