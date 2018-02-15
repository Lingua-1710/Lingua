import toBeType from "jest-tobetype"
const request = require('supertest')
const app = require('../../index')
expect.extend(toBeType)

describe('translation routes', () => {
  const fromLang = 'es'
  const toLang = 'en'
  const text = 'Hola como estas?'
  describe('/api/translation/', () => {
    it('GET /api/translation', () => {
      return request(app)
        .get(`/api/translation?fromLang=${fromLang}&toLang=${toLang}&text=${text}`)
        .expect(200)
        .then(res => {
          expect(res.body).toBeType('string')
          expect(res.body).toBe('Hello how are you?')
        })
    })
  })
})
