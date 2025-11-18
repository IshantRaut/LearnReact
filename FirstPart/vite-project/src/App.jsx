import { useState } from 'react'
import Chai from './chai'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
const username = "Ishant"
  return (
    <>
      <div className="App">
      <h1>Hello World! {username}</h1>
      <Chai />
    </div>
    </>
  )
}

export default App
