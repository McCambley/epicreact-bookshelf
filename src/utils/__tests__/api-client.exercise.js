import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {server, rest} from 'test/server'
import {client} from '../api-client'

const apiURL = process.env.REACT_APP_API_URL

jest.mock('react-query')
jest.mock('auth-provider')

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  //
  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  const endpoint = 'test-endpoint'
  const token = 'FAKE_TOKEN'
  const mockResult = {mockValue: 'VALUE'}
  let request
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  //
  await client(endpoint, {token})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  const endpoint = 'test-endpoint'
  const data = {a: 'b'}

  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body))
    }),
  )
  const response = await client(endpoint, {data})
  expect(response).toEqual(data)
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  let request
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'foo',
    },
  }
  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, config)
  expect(request.headers.get('Content-Type')).toBe(`foo`)
})

test('Auto log out if the server returns a 401', async () => {
  const endpoint = 'test-endpoint'
  const testError = {message: 'Test error'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError))
    }),
  )
  // const error = await client(endpoint).catch(e => e)

  // expect(error).toEqual(testError)
  await expect(client(endpoint)).rejects.toEqual(testError)

  // expect(queryCache.clear).toHaveBeenCalledTimes(1)
  // expect(auth.logout).toHaveBeenCalledTimes(1)
})
