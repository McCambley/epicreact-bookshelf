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

// 💰 I'm going to give this to you. It's a way for you to create a promise
// which you can imperatively resolve or reject whenever you want.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// Use it like this:
// const {promise, resolve} = deferred()
// promise.then(() => console.log('resolved'))
// do stuff/make assertions you want to before calling resolve
// resolve()
// await promise
// do stuff/make assertions you want to after the promise has resolved

// 🐨 flesh out these tests
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
  expect(result.current).toEqual({
    status: 'resolved',
    data: value,
    error: null,

    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,

    setData: expect.any(Function),
    setError: expect.any(Function),
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  act(() => {
    result.current.reset()
  })

  expect(result.current).toEqual({
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
  })
})

test('calling run with a promise which rejects', async () => {
  // 🐨 this will be very similar to the previous test, except you'll reject the
  // promise instead and assert on the error state.
  // 💰 to avoid the promise actually failing your test, you can catch
  //    the promise returned from `run` with `.catch(() => {})`
  const {promise, reject} = deferred()
  const {result} = renderHook(() => useAsync())
  let p
  act(() => {
    p = result.current.run(promise)
  })

  const rejectedValue = Symbol({rejectedValue: 'val'})
  await act(async () => {
    reject(rejectedValue)
    await p.catch(e => {
      // ignore error
    })
  })
  expect(result.current).toEqual({
    status: 'rejected',
    data: null,
    error: rejectedValue,

    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,

    setData: expect.any(Function),
    setError: expect.any(Function),
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  act(() => {
    result.current.reset()
  })

  expect(result.current).toEqual({
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
  })
})

test('can specify an initial state', () => {
  const mockData = Symbol('resolved value')
  const customInitialState = {status: 'resolved', data: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))
  expect(result.current).toEqual({
    status: 'resolved',
    data: customInitialState.data,
    error: null,

    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,

    setData: expect.any(Function),
    setError: expect.any(Function),
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('can set the data', async () => {
  // 💰 result.current.setData('whatever you want')
  const mockData = Symbol('resolved value')
  const customInitialState = {status: 'resolved', data: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))
  expect(result.current).toEqual({
    status: 'resolved',
    data: customInitialState.data,
    error: null,

    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,

    setData: expect.any(Function),
    setError: expect.any(Function),
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  const newData = Symbol('new data')

  act(() => {
    result.current.setData(newData)
  })
  expect(result.current).toEqual({
    status: 'resolved',
    data: newData,
    error: null,

    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,

    setData: expect.any(Function),
    setError: expect.any(Function),
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('can set the error', async () => {
  const {result} = renderHook(() => useAsync())
  const newError = Symbol('new data')

  act(() => {
    result.current.setError(newError)
  })

  expect(result.current).toEqual({
    status: 'rejected',
    data: null,
    error: newError,

    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,

    setData: expect.any(Function),
    setError: expect.any(Function),
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('No state updates happen if the component is unmounted while pending', async () => {
  const {result, unmount} = renderHook(() => useAsync())
  const {promise, resolve} = deferred()
  // 💰 const {result, unmount} = renderHook(...)
  // 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)
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
