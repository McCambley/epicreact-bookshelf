// 🐨 you'll need to import react and createRoot from react-dom up here
import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

function LoginForm({buttonText}) {
  const [formData, setFormData] = useState({username: '', password: ''})

  function handleSubmit() {
    console.log(buttonText, formData)
  }

  const handleChange = property => e => {
    return setFormData(previous => ({...previous, [property]: e.target.value}))
  }

  return (
    <>
      <h2>{buttonText}</h2>
      <div>
        <label htmlFor="login_username">Username: </label>
        <input
          type="text"
          id="login_username"
          name="username"
          value={formData.username}
          onChange={handleChange('username')}
        />
      </div>
      <div>
        <label htmlFor="login_password">Password: </label>
        <input
          type="password"
          id="login_password"
          name="password"
          value={formData.password}
          onChange={handleChange('password')}
        />
      </div>
      <button onClick={handleSubmit}>{buttonText}</button>
    </>
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
        <LoginForm buttonText={'Login'} />
      </Dialog>
      <Dialog isOpen={openModal === 'register'} onDismiss={closeModal}>
        <LoginForm buttonText={'Register'} />
      </Dialog>
    </>
  )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
const root = document.getElementById('root')
createRoot(root).render(<App />)
