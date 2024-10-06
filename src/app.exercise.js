/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {useState} from 'react'

function App() {
  const [user, setUser] = useState(null)

  async function login(form) {
    const u = await auth.login(form)
    setUser(u)
  }
  async function register(form) {
    const u = await auth.register(form)
    setUser(u)
  }

  async function logout() {
    await auth.logout()
    setUser(null)
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
