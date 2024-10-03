// 🐨 you'll need to import react and createRoot from react-dom up here
import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
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
        <h2>Login</h2>
        <div>
          <label for="login_username">Username: </label>
          <input type="text" id="login_username" name="username" />
        </div>
        <div>
          <label for="login_password">Password: </label>
          <input type="password" id="login_password" name="password" />
        </div>
      </Dialog>
      <Dialog isOpen={openModal === 'register'} onDismiss={closeModal}>
        <h2>Register</h2>
        <div>
          <label for="register_username">Username: </label>
          <input type="text" id="register_username" name="username" />
        </div>
        <div>
          <label for="register_password">Password: </label>
          <input type="password" id="register_password" name="password" />
        </div>
      </Dialog>
    </>
  )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
const root = document.getElementById('root')
createRoot(root).render(<App />)
