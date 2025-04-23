import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllPlayers({ setPlayer, searchTerm }) {
	const [players, setPlayers] = useState([]);
	const navigate = useNavigate();

	const teamMap = {
		4943: "Fluff",
		4942: "Ruff",
	};

	useEffect(() => {
		const getPlayers = async () => {
			const res = await fetch(
				"https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-pt/players"
			);
			const data = await res.json();

			setPlayers(data.data.players);
		};
		getPlayers();
	}, []);

	const handleClick = (player) => {
		setPlayer(player);
		navigate(`/players/${player.id}`);
	};

	const filteredPlayers = players.filter((player) =>
		player.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<h2>Your 2025 Puppy Bowl players are:</h2>
			<div>
				{filteredPlayers.map((player) => (
					<div key={player.id}>
						<h3>{player.name}</h3>
						<img src={player?.imageUrl} style={{ height: "400px" }} />
						<p>Team: {teamMap[String(player.teamId)] || "Unknown Team"}</p>
						<p>Status: {player.status}</p>
					</div>
				))}
				{filteredPlayers.length === 0 && <p>No players match your search.</p>}
			</div>
		</>
	);
}

export default AllPlayers;
