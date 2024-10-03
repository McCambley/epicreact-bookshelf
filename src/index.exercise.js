// 🐨 you'll need to import react and createRoot from react-dom up here
import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

function LoginForm({buttonText, onSubmit}) {
  function handleSubmit(e) {
    e.preventDefault()
    const {username, password} = e.target.elements
    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{buttonText}</h2>
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

function App() {
  const [openModal, setOpenModal] = useState('none')
  function handleLoginClick() {
    setOpenModal('login')
  }
  function handleRegisterClick() {
    setOpenModal('register')
  }
  function closeModal() {
    setOpenModal('none')
  }

  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  return (
    <>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <div>
        <div>
          <button onClick={handleLoginClick}>Log in</button>
        </div>
        <div>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
      <Dialog isOpen={openModal === 'login'} onDismiss={closeModal}>
        <LoginForm buttonText={'Login'} onSubmit={login} />
      </Dialog>
      <Dialog isOpen={openModal === 'register'} onDismiss={closeModal}>
        <LoginForm buttonText={'Register'} onSubmit={register} />
      </Dialog>
    </>
  )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
const root = document.getElementById('root')
createRoot(root).render(<App />)
