/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, {useState, useEffect} from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from './utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from './styles/colors'
import {FullPageSpinner} from 'components/lib'

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
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync()

  useEffect(() => {
    run(getUser())
  }, [run])

  async function login(form) {
    await run(auth.login(form))
  }
  async function register(form) {
    await run(auth.register(form))
  }

  async function logout() {
    run(auth.logout())
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    ;<div
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
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
