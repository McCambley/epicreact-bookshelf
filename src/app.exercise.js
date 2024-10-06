/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, {useState, useEffect} from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from './utils/api-client'

async function getUser() {
  let user = null
  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user
}

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser().then(u => setUser(u))
  }, [])

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
