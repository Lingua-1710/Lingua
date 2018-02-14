import toBeType from "jest-tobetype"
const request = require('supertest')
const { db } = require('../../db')
const app = require('../../index')
const Language = db.model('languages')
expect.extend(toBeType)

describe('language routes', () => {
  beforeAll(() => {
    return db.sync({force: true})
  })

  afterAll(() => {
    db.close()
    return null
  })

  describe('/api/languages/', () => {
    const testLanguage = {
      name: 'French',
      code: 'fr-FR',
      google: 'fr'
    }

    beforeEach(() => {
      return Language.create(testLanguage)
    })

    it('GET /api/languages', () => {
      return request(app)
        .get('/api/languages')
        .expect(200)
        .then(res => {
          expect(res.body).toBeType('array')
          expect(res.body[0].name).toBe(testLanguage.name)
          expect(res.body[0].code).toBe(testLanguage.code)
          expect(res.body[0].google).toBe(testLanguage.google)
        })
    })
  })
})
