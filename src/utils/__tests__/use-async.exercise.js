// 🐨 We'll use renderHook rather than render here
import {renderHook, act} from '@testing-library/react'
// 🐨 Here's the thing you'll be testing:
import {useAsync} from '../hooks'

beforeEach(() => {
  jest.spyOn(console, 'error')
})

afterEach(() => {
  console.error.mockRestore()
})

const defaultState = {
  status: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  setData: expect.any(Function),
  setError: expect.any(Function),
  run: expect.any(Function),
  reset: expect.any(Function),
}

const pendingState = {
  ...defaultState,
  status: 'pending',
  isIdle: false,
  isLoading: true,
}

const resolvedState = {
  ...defaultState,
  status: 'resolved',
  isIdle: false,
  isSuccess: true,
}
const rejectedState = {
  ...defaultState,
  status: 'rejected',
  isIdle: false,
  isError: true,
}
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('calling run with a promise which resolves', async () => {
  const {promise, resolve} = deferred()
  const {result} = renderHook(() => useAsync())
  let p
  act(() => {
    p = result.current.run(promise)
  })

  const value = Symbol({val: 'val'})
  await act(async () => {
    resolve(value)
    await p
  })
  expect(result.current).toEqual({...resolvedState, data: value})

  act(() => {
    result.current.reset()
  })

  expect(result.current).toEqual(defaultState)
})

test('calling run with a promise which rejects', async () => {
  const {promise, reject} = deferred()
  const {result} = renderHook(() => useAsync())
  let p
  act(() => {
    p = result.current.run(promise)
  })

  const rejectedValue = Symbol({rejectedValue: 'val'})
  await act(async () => {
    reject(rejectedValue)
    await p.catch(e => {})
  })
  expect(result.current).toEqual({
    ...rejectedState,
    error: rejectedValue,
  })

  act(() => {
    result.current.reset()
  })

  expect(result.current).toEqual(defaultState)
})

test('can specify an initial state', () => {
  const mockData = Symbol('resolved value')
  const customInitialState = {status: 'resolved', data: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))
  expect(result.current).toEqual({
    ...resolvedState,
    data: customInitialState.data,
  })
})

test('can set the data', async () => {
  const mockData = Symbol('resolved value')
  const customInitialState = {status: 'resolved', data: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))
  expect(result.current).toEqual({
    ...resolvedState,
    data: customInitialState.data,
  })

  const newData = Symbol('new data')

  act(() => {
    result.current.setData(newData)
  })
  expect(result.current).toEqual({
    ...resolvedState,
    data: newData,
  })
})

test('can set the error', async () => {
  const {result} = renderHook(() => useAsync())
  const newError = Symbol('new data')

  act(() => {
    result.current.setError(newError)
  })

  expect(result.current).toEqual({
    ...rejectedState,
    error: newError,
  })
})

test('No state updates happen if the component is unmounted while pending', async () => {
  const {result, unmount} = renderHook(() => useAsync())
  const {promise, resolve} = deferred()
  let p
  act(() => {
    p = result.current.run(promise)
  })
  unmount()
  await act(async () => {
    resolve()
    await p
  })
  expect(console.error).not.toHaveBeenCalled()
})

test('calling "run" without a promise results in an early error', async () => {
  const {result} = renderHook(() => useAsync())
  expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(
    `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`,
  )
})
