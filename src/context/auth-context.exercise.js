import * as React from 'react'

const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw Error('useAuth must be used in a child of AuthContext.Provider')
  }
  return context
}

export {AuthContext, useAuth}
