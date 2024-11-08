import * as React from 'react'
import {useAuth} from './context/auth-context'
// 🐨 you'll want to render the FullPageSpinner as the fallback
// import {FullPageSpinner} from './components/lib'

// 🐨 exchange these for React.lazy calls
// import {AuthenticatedApp} from './authenticated-app'
// import {UnauthenticatedApp} from './unauthenticated-app'
const AuthenticatedApp = React.lazy(() => import('./authenticated-app.js'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app.js'))

function App() {
  const {user} = useAuth()
  // 🐨 wrap this in a <React.Suspense /> component
  return (
    <React.Suspense fallback={<div>'loading...'</div>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
