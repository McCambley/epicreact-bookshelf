// 🐨 you'll need to import react and createRoot from react-dom up here
import React from 'react'
import {createRoot} from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
function App() {
  function handleLoginClick() {
    alert('Clicked 1')
  }
  function handleRegisterClick() {
    alert('Clicked w')
  }
  return (
    <React.Fragment>
      <Logo />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={handleLoginClick}>Log in</button>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </React.Fragment>
  )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
const root = document.getElementById('root')
createRoot(root).render(<App />)
