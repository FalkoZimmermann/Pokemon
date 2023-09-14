let pokemonAllUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'; // Die URL für die ersten 20 Pokémon
let pokemonDetails = document.getElementById("pokemon-details");

function init() {
    const pokemonAllUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'; // Die URL für die ersten 20 Pokémon
    const pokemonDetails = document.getElementById("pokemon-details");

    // Eine XMLHttpRequest erstellen
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Erfolgreiche Antwort erhalten
            const pokemonList = JSON.parse(xhr.responseText).results;

            // Durch die Liste der Pokémon iterieren und Informationen anzeigen
            pokemonList.forEach(function (pokemon) {
                const pokemonUrl = pokemon.url;
                const pokemonXhr = new XMLHttpRequest();

                pokemonXhr.onload = function () {
                    if (pokemonXhr.status === 200) {
                        const pokemonData = JSON.parse(pokemonXhr.responseText);

                        // Pokémon-Daten in das HTML einfügen
                        const pokemonImage = document.createElement("img");
                        pokemonImage.src = pokemonData.sprites.front_default;
                        pokemonImage.alt = pokemonData.name;

                        const pokemonName = document.createElement("h2");
                        pokemonName.textContent = pokemonData.name;

                        const pokemonContainer = document.createElement("div");
                        pokemonContainer.appendChild(pokemonImage);
                        pokemonContainer.appendChild(pokemonName);

                        pokemonDetails.appendChild(pokemonContainer);
                    } else {
                        // Es gab einen Fehler bei der Anfrage für ein bestimmtes Pokémon
                        console.error("Fehler beim Laden der Pokemon-Daten. Statuscode:", pokemonXhr.status);
                    }
                };

                // Die Anfrage senden, um die Details für ein bestimmtes Pokémon abzurufen
                pokemonXhr.open("GET", pokemonUrl);
                pokemonXhr.send();
            });
        } else {
            // Es gab einen Fehler bei der Anfrage, um die Liste der Pokémon abzurufen
            console.error("Fehler beim Laden der Pokemon-Liste. Statuscode:", xhr.status);
        }
    };

    // Die Anfrage senden, um die Liste der Pokémon abzurufen
    xhr.open("GET", pokemonAllUrl);
    xhr.send();
}

// Die init-Funktion aufrufen, um die Daten zu laden, sobald die Seite geladen ist
function createPokemonCard(pokemonData) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    const pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemon-image");
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.alt = pokemonData.name;

    const pokemonName = document.createElement("h2");
    pokemonName.classList.add("pokemon-name");
    pokemonName.textContent = pokemonData.name;

    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonName);

    return pokemonCard;
}

// Funktion zum Laden der Pokémon-Daten
function loadPokemonData(url) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            const pokemonData = JSON.parse(xhr.responseText);
            const pokemonCard = createPokemonCard(pokemonData);
            document.getElementById("pokemon-details").appendChild(pokemonCard);
        } else {
            console.error("Fehler beim Laden der Pokemon-Daten. Statuscode:", xhr.status);
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

// Funktion zum Initialisieren der Seite
function init() {
    const pokemonAllUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20';

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            const pokemonList = JSON.parse(xhr.responseText).results;

            pokemonList.forEach(function (pokemon) {
                loadPokemonData(pokemon.url);
            });
        } else {
            console.error("Fehler beim Laden der Pokemon-Liste. Statuscode:", xhr.status);
        }
    };

    xhr.open("GET", pokemonAllUrl);
    xhr.send();
}

window.onload = init;