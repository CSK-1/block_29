import { useState } from 'react'
import './App.css'
import AllPlayers from './components/AllPlayers'
import SinglePlayer from './components/SinglePlayer'
import { Routes, Route, Link } from 'react-router-dom'
import NewPlayerForm from './components/NewPlayerForm'

function App() {
  const [player, setPlayer] = useState()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
				<Link to="/">Home</Link>
        <input 
          type="text" 
          placeholder="Search players..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: "1rem", flexGrow: 1, maxWidth: "300px" }}
        />
        <Link to="/form">Add a New Player</Link>
			</nav>
      <h1>Welcome to the Puppy Bowl!</h1>
      <Routes>
        <Route path="/" element={<AllPlayers setPlayer={setPlayer} searchTerm={searchTerm}/>}/>
        <Route path="/players/:id" element={<SinglePlayer/>}/>
        <Route path="/form" element={<NewPlayerForm/>}/>
      </Routes>
    </>
  )
}

export default App
