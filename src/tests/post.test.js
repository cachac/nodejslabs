import supertest from 'supertest'
import mongoose from 'mongoose'

import { app, server } from '../main.js'

import config from '../config/index.js'

// const request = require('supertest')
// const app = require('../main')

const api = supertest(app)
let token = null

// test('Sum testing', () => {
//   expect(1 + 1).toBe(2)
// })

test('Login', async () => {
  const res = await api.post('/user/JWT').send({
    username: config.TEST_USERNAME,
    password: config.TEST_PW
  })
  expect(res.statusCode).toEqual(200)
  expect(res.header).toHaveProperty('set-cookie')

  token = res.header['set-cookie'][0].split('=')[1].split(';')[0]
})

describe('Check Posts List', () => {
  let postID = null
  it('Create a Post', async () => {
    const res = await api
      .post('/post/create')
      .set('Cookie', [`access-token=${token}`])
      .send({
        title: 'test post',
        author: 'Jest',
        body: 'For testing purposes'
      })
    postID = res.body._id
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
  })

  it('Finding All Posts', async () => {
    const res = await api.get('/post/readAll').set('Cookie', [`access-token=${token}`])
    expect(res.statusCode).toEqual(200)
  })

  it('Finding Post by ID', async () => {
    const res = await api
      .post('/post/readByID')
      .set('Cookie', [`access-token=${token}`])
      .send({
        _id: postID
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('title')
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
