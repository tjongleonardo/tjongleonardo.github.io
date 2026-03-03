// Global variables
let currentPokemon = null;
let team = [];

// Event listeners
document.getElementById("search-btn").addEventListener("click", searchPokemon);
document.getElementById("add-team-btn").addEventListener("click", addToTeam);

// Allow pressing Enter key to search
document.getElementById("pokemon-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchPokemon();
    }
});

// Search for Pokemon by name or ID
async function searchPokemon() {
    const input = document.getElementById("pokemon-input").value.toLowerCase().trim();
    
    if (!input) {
        alert("Please enter a Pokemon name or ID!");
        return;
    }
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        const data = await response.json();
        currentPokemon = data;
        displayPokemon(data);
        
    } catch (error) {
        alert("Pokemon not found! Please check the name or ID and try again.");
        console.error(error);
    }
}

// Display Pokemon information
function displayPokemon(pokemon) {
    // Display Pokemon name
    document.getElementById("pokemon-name").textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    // Display Pokemon image
    const imageElement = document.getElementById("pokemon-image");
    imageElement.src = pokemon.sprites.front_default;
    imageElement.style.display = "block";
    
    // Set Pokemon cry audio
    const cryElement = document.getElementById("pokemon-cry");
    if (pokemon.cries && pokemon.cries.latest) {
        cryElement.src = pokemon.cries.latest;
    } else if (pokemon.cries && pokemon.cries.legacy) {
        cryElement.src = pokemon.cries.legacy;
    }
    
    // Populate moves dropdowns
    populateMoves(pokemon.moves);
}

// Populate moves dropdowns
function populateMoves(moves) {
    const moveSelects = [
        document.getElementById("move1"),
        document.getElementById("move2"),
        document.getElementById("move3"),
        document.getElementById("move4")
    ];
    
    // Clear existing options (keep the first default option)
    moveSelects.forEach(select => {
        select.innerHTML = '<option value="">Select Move</option>';
    });
    
    // Get first 20 moves (API returns many moves)
    const limitedMoves = moves.slice(0, 20);
    
    // Add moves to each dropdown
    limitedMoves.forEach(move => {
        const moveName = move.move.name.replace(/-/g, " ");
        
        moveSelects.forEach(select => {
            const option = document.createElement("option");
            option.value = move.move.name;
            option.textContent = moveName.charAt(0).toUpperCase() + moveName.slice(1);
            select.appendChild(option);
        });
    });
}

// Add Pokemon to team
function addToTeam() {
    if (!currentPokemon) {
        alert("Please search for a Pokemon first!");
        return;
    }
    
    if (team.length >= 6) {
        alert("Your team is full! Maximum 6 Pokemon allowed.");
        return;
    }
    
    
    // Get selected moves from the dropdowns
    const selectedMoves = [
        document.getElementById("move1").value,
        document.getElementById("move2").value,
        document.getElementById("move3").value,
        document.getElementById("move4").value
    ].filter(move => move !== ""); // Filter out empty selections
    
    // Get move names for display (convert from dash-case to readable format)
    const selectedMoveNames = selectedMoves.map(move => 
        move.replace(/-/g, " ").charAt(0).toUpperCase() + move.replace(/-/g, " ").slice(1)
    );
    
    // Add Pokemon to team
    team.push({
        id: currentPokemon.id,
        name: currentPokemon.name,
        image: currentPokemon.sprites.front_default,
        moves: selectedMoveNames
    });
    
    updateTeamDisplay();    
}

// Update team display
function updateTeamDisplay() {
    const teamContainer = document.getElementById("team-container");
    const teamCount = document.getElementById("team-count");
    
    // Update team count
    teamCount.textContent = team.length;
    
    // Clear current team display
    teamContainer.innerHTML = "";
    
    // Display each team member
    team.forEach((pokemon, index) => {
        const memberDiv = document.createElement("div");
        memberDiv.className = "team-member";
        
        // Generate moves HTML
        let movesHtml = '';
        if (pokemon.moves.length > 0) {
            movesHtml = '<div class="moves-display"><p class="moves-title">Moves:</p><ul class="moves-list">';
            pokemon.moves.forEach(move => {
                movesHtml += '<li>' + move + '</li>';
            });
            movesHtml += '</ul></div>';
        } else {
            movesHtml = '<p class="no-moves">No moves selected</p>';
        }
        
        memberDiv.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            ${movesHtml}
            <button onclick="removeFromTeam(${index})">Remove</button>
        `;
        teamContainer.appendChild(memberDiv);
    });
}

// Remove Pokemon from team
function removeFromTeam(index) {
    team.splice(index, 1);
    updateTeamDisplay();
}
