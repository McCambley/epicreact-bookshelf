// this module doesn't do anything for the exercise. But you'll use this for
// the extra credit!
import React from 'react'
import {AuthProvider} from './auth-context.exercise'
import {ReactQueryConfigProvider} from 'react-query'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

function AppProviders({children}) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
