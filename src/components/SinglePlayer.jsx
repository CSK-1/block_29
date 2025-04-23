import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SinglePlayer() {
	const [currentPlayer, setCurrentPlayer] = useState(null);

	const { id } = useParams();

	const teamMap = {
		4943: "Fluff",
		4942: "Ruff",
	};

	useEffect(() => {
		const getPlayer = async () => {
			const res = await fetch(
				`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-pt/players/${id}`
			);
			const data = await res.json();

			setCurrentPlayer(data.data.player);
		};
		getPlayer();
	}, []);

	async function handleClick(event) {
		event.preventDefault();
		try {
			const response = await fetch(
				`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-pt/players/${id}`,
				{
					method: "DELETE",
				}
			);
			alert("Player deleted!");
		} catch (error) {
			console.error(
				"Oops, something went wrong with deleting that player!",
				error
			);
		}
	}

	if (!currentPlayer) return <p>Loading player...</p>;

	return (
		<>
			<div>
				<h3>{currentPlayer.name}</h3>
				<img
					src={currentPlayer.imageUrl}
					alt={currentPlayer.name}
					style={{ height: "400px" }}
				/>
				<p>Breed: {currentPlayer.breed}</p>
				<p>Team: {teamMap[String(currentPlayer.teamId)] || "Other"}</p>
				<p>Status: {currentPlayer.status}</p>
				<button onClick={handleClick}>Delete this Player</button>
			</div>
		</>
	);
}

export default SinglePlayer;
