import { useState } from "react"

function NewPlayerForm () {
    const [name, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [status, setStatus] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [teamId, setTeamId] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-pt/players",
                {
                    method: "POST",
                    headers:{
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name, 
                        breed: breed,
                        status: status,
                        imageUrl: imageUrl,
                        teamId: teamId
                    })
                }
            )
            const result = await response.json()
            console.log(result)
        }catch(error){
            console.error("Oops, something went wrong with adding that player!", err)
            setError(error.message)
        }
    }

    return (
        <>
        <h2>Add a Player</h2>
        {error && <p>{error}</p>}
        <form className="form" onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "space-between" }}>
            <label>
                Name: 
                <input name="name" value={name} onChange={(event)=> setName(event.target.value)} required/>
            </label>
            <label>
                Breed: 
                <input name="breed" value={breed} onChange={(event)=> setBreed(event.target.value)} required/>
            </label>
            <label>
                Status: 
                <select name="status" value={status} onChange={(event)=> setStatus(event.target.value)}>
                    <option value="field">Field</option>
                    <option value="bench">Bench</option>
                </select>
            </label>
            <label>
                Image URL:
                <input name="imageUrl" value={imageUrl} onChange={(event)=> setImageUrl(event.target.value)}/>
            </label>
            <label>
                Team: 
                <select name="teamId" value={teamId} onChange={(event)=> setTeamId(event.target.value)}>
                    <option value="4943">Fluff</option>
                    <option value="4942">Ruff</option>
                </select>
            </label>
            <button>Submit</button>
        </form>
        </>
    )
}

export default NewPlayerForm