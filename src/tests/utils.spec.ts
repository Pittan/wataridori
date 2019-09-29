import { wait } from '../utils'

jest.useFakeTimers()

test('wait should resolve after specified milliseconds', () => {
  wait(1000)
  expect(setTimeout).toHaveBeenCalledTimes(1)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
})
