import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Users } from './components/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Users/>
    </div>
  )
}

export default App
