
let allPokemonsData = [];
let showedPokemonlength = 52;
const typeStyles = {
    fire: "background-image: url(img/fire.jpg);",
    grass: "background-image: url(img/grass.jpg);",
    water: "background-image: url(img/water.jpg);",
    bug: "background-image: url(img/bug.jpg);",
    normal: "background-image: url(img/normal.jpg);",
    poison: "background-image: url(img/poisen.jpg);",
    electric: "background-image: url(img/thunder.jpg);",
    ground: "background-image: url(img/ground.jpg);",
    fly: "background-image: url(img/flying.jpg);",
    fighting: "background-image: url(img/fight.jpg);",
    psychic: "background-image: url(img/psycho.jpg);",
    rock: "background-image: url(img/stone.jpg);",
    ghost: "background-image: url(img/ghost.jpg);",
    ice: "background-image: url(img/ice.jpg);",
    dragon: "background-image: url(img/dragon.jpg);",
    fairy: "background-image: url(img/fairy.jpg);",
    dark: "background-image: url(img/dark.jpg);",
    steel: "background-image: url(img/steel.jpg);",
};

function init() {
    loadPokemon();
}

async function loadPokemon() {
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ``;
    for (id = 1; id < showedPokemonlength; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonsData.push(currentPokemon);
        renderPokemonCards(id, currentPokemon);  
    }
}

function renderPokemonCards(id, currentPokemon){
    if( id < showedPokemonlength-1){
        cardContainer.innerHTML +=
        `${pokemonCardTemplate(id, currentPokemon)}`;
    pokemonTypeBackgroundColor(id);
    }
}

function loadMorePokemons() {
    showedPokemonlength += 30;
    init();
}

function pokemonIdNumberShow(currentPokemon){
    let number = currentPokemon['id'];
    if (number < 10) {
        return `#00${number}`;
      } else if (number < 100) {
        return `#0${number}`;
      } else {
        return `#${number}`;
      }
}

function pokemonTypeBackgroundColor(id) {
    let currentPokemonType = currentPokemon['types']['0']['type']['name'];
    let container = document.getElementById(`pokemon-card${id}`);
    if (currentPokemonType) {
        container.classList.add(currentPokemonType);
    }
}

function nameOfThePokemon() {
    return currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
}



async function openPokemonCard(id) {
    let container = document.getElementById('openedPokemonCard');
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    clickedPokemon = await response.json();

    let details = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let responsedetails = await fetch(details);
    detailsPokemon = await responsedetails.json();
    
    let evo = detailsPokemon['evolves_from_species'];

    container.innerHTML = `${openPokemonCardTemplate(clickedPokemon,detailsPokemon,evo)}`;
    
    checkTheEvolutions(evo, id);
    bars(id);
    showAndloadMoves(id);
    container.classList.remove('d-none');
}

function showAndloadMoves(id) {
    let container = document.getElementById('skills');

    for (let i = 0; i < allPokemonsData[id]['moves'].length; i++) {
        container.innerHTML += `<div class="skills-container">${allPokemonsData[id]['moves'][i]['move']['name'].charAt(0).toUpperCase() + allPokemonsData[id]['moves'][i]['move']['name'].slice(1)}</div>`;
    }
}

function checkTheEvolutions(evo, id) {
    newid = id - 2;
    if (evo == null) {
        document.getElementById('evolution').innerHTML = `Evolution from: There is no evolution before!`;
        
    } else {
        document.getElementById('evolution').innerHTML = `Evolution from: ` + evo['name'].charAt(0).toUpperCase() + evo['name'].slice(1); 
    }
}



async function searchForPokemon() {
    let search = document.getElementById('searchfield').value;
    search = search.toLowerCase();

    let list = document.getElementById('cardContainer');
    list.innerHTML = ``;

    for (let index = 0; index < allPokemonsData.length; index++) {
        let id = index  ;
        let results = allPokemonsData[id];
      
        if (results.name.toLowerCase().includes(search) && search.value != 0) {
            list.innerHTML += `
          ${searchFunctionTemplate(results, id)}`;
          document.getElementById(`pokemon-card${id}`).classList.add(`${results['types']['0']['type']['name']}`)
        } 
    }
}

function pokemonTypesSearchfield(results){
   if (results['types']['0'] && results['types']['1'] ){
    return `<p class="pokemon-type">${results['types']['0']['type']['name'].charAt(0).toUpperCase()+ results['types']['0']['type']['name'].slice(1)}</p>
    <p class="pokemon-type">${results['types']['1']['type']['name'].charAt(0).toUpperCase()+ results['types']['1']['type']['name'].slice(1)}</p>`;
   }else {
    return `<p class="pokemon-type">${results['types']['0']['type']['name'].charAt(0).toUpperCase() + results['types']['0']['type']['name'].slice(1)}</p>`;
   }
   
}

function pokemonIdNumberShowSearchfield(results){
    let number = results['id'];
    if (number < 10) {
        return `#00${number}`;
      } else if (number < 100) {
        return `#0${number}`;
      } else {
        return `#${number}`;
      }
}


window.addEventListener('resize', function() {
    let searchfield = document.getElementById('searchfield');
    if (window.innerWidth <= 1200) {
      searchfield.setAttribute('placeholder', 'Search Pokemon...');
    } else {
      searchfield.setAttribute('placeholder', 'Search for specific Pokemon...');
    }
  });



function capitalizeFirstLetterOpenCard() {
    return clickedPokemon['name'].charAt(0).toUpperCase() + clickedPokemon['name'].slice(1);
}
function capitalizeFirstLetterOpenCardEvo(evo) {
    return evo.charAt(0).toUpperCase() + evo.slice(1);
}

function showAbout() {
    document.getElementById('about').classList.remove('d-none')
    document.getElementById('aboutText').classList.remove('d-none')
    document.getElementById('stats').classList.add('d-none')
    document.getElementById('skills').classList.add('d-none')
    
}
function showStats() {
    document.getElementById('about').classList.add('d-none')
    document.getElementById('aboutText').classList.add('d-none')
    document.getElementById('stats').classList.remove('d-none')
    document.getElementById('skills').classList.add('d-none')
    
}
function showSkills() {
    document.getElementById('about').classList.add('d-none')
    document.getElementById('aboutText').classList.add('d-none')
    document.getElementById('stats').classList.add('d-none')
    document.getElementById('skills').classList.remove('d-none')
    
}


function closeOpenedPokemonCard() {
    let container = document.getElementById('openedPokemonCard');
    container.classList.add('d-none');
    document.getElementById('about').classList.remove('d-none');
    document.getElementById('aboutText').classList.remove('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('skills').classList.add('d-none')
}

function doNotCloseWhenClickedInsightContainer() {
    event.stopPropagation();
}

async function bars(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    clickedPokemon = await response.json();

    const ctx = document.getElementById('chart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],

            datasets: [{
                label: 'Basestats',
                backgroundColor: [
                  'rgb(255, 65, 27)',
                  'rgb(98, 189, 90',
                  'rgb(43, 155, 227)',
                  'rgb(187, 85, 68)', 
                  'rgb(110, 67, 112)', 
                  'rgb(86, 112, 190)'
                ],
                data: [clickedPokemon['stats']['0']['base_stat'], clickedPokemon['stats']['1']['base_stat'], clickedPokemon['stats']['2']['base_stat'], clickedPokemon['stats']['3']['base_stat'], clickedPokemon['stats']['4']['base_stat'], clickedPokemon['stats']['5']['base_stat']],
                borderColor: [
                    'white',
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
            },
            maintainAspectRatio: false,
            scales: {
              y: {
                stacked: true,
                grid: {
                  display: true,
                  color: "rgba(255,99,132,0.2)"
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
        }
    })
}

function pokemonCardTemplate(id, currentPokemon) {
    // Verwende die entsprechende CSS-Klasse aus dem Array basierend auf dem Typ des Pokémons
    const typeClass = currentPokemon['types'][0]['type']['name'];
    const typeStyle = typeStyles[typeClass];
    
    return `<div class="pokemon-card ${typeClass}" style="${typeStyle}" id="pokemon-card${id}" onclick="openPokemonCard(${id})">
    <div class="pokemon-name"><h2 id="pokemonName" > ${nameOfThePokemon()}</h2> </div>
    <p id="number">${pokemonIdNumberShow(currentPokemon)}</p>
    <img class="avatar" id="pokemonAvatar" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    <div class="type" id="pokemon-type">${pokemonTypes(currentPokemon, id)}</div>
    </div>`;
}


function pokemonTypes(currentPokemon, id){
    let types  = currentPokemon['types'];
    let plusone = id + 1 ;
   if (types['0'] && types['1'] ){
    return `<p class="pokemon-type" id="type${id}">${types['0']['type']['name'].charAt(0).toUpperCase() + types['0']['type']['name'].slice(1)}</p>
    <p class="pokemon-type" id="type${plusone}">${types['1']['type']['name'].charAt(0).toUpperCase() + types['1']['type']['name'].slice(1)}</p>`;
    
   }else {
    return `<p class="pokemon-type" id="type${id}">${types['0']['type']['name'].charAt(0).toUpperCase() + types['0']['type']['name'].slice(1)}</p>`;
   }
}


function openPokemonCardTemplate(clickedPokemon,detailsPokemon,evo){
    return  `<div class="open-card" onclick="closeOpenedPokemonCard()">
    <div class="big-card" onclick="doNotCloseWhenClickedInsightContainer()">
     <div class="name-section">
     ${loadUpperSectionFromOpenedCard(clickedPokemon)}
     </div>
     <div>
     ${loadTagsInLowerSectionOpenedCard()}
     <div class="about" id="about">
    ${showAboutThePokemon(detailsPokemon, clickedPokemon, evo)}
     </div>
     ${showStatsOpenCard()}

       <div class="skills d-none" id="skills"></div>

    
       <div class="containerWithPokemonInfos">
       <p class="about" id="aboutText">${detailsPokemon['flavor_text_entries']['9']['flavor_text']}</p>
       
     </div></div>
    </div>
   </div>`;
}

function loadUpperSectionFromOpenedCard(clickedPokemon){
    return ` <div class="big-card-name-img">
    <img src="${clickedPokemon['sprites']['other']['official-artwork']['front_default']}">
     <h1>${capitalizeFirstLetterOpenCard()}</h1> </div>
    `
}
function loadTagsInLowerSectionOpenedCard(){
    return ` <div class="tags">
    <p onclick="showAbout()">About</p>
    <p onclick="showStats()">Stats</p>
    <p onclick="showSkills()">Skills</p>
   </div>`
}
function showStatsOpenCard(){
return `<div class="d-none stats" id="stats">
<canvas id="chart"></canvas>
</div>`
}

function showAboutThePokemon(detailsPokemon, clickedPokemon, evo, id) {
    return `<p>Genera: ${detailsPokemon['genera']['7']['genus']} </p>
    <p>Weight: ${clickedPokemon['weight'] / 10} kg</p>
    <p>Height: ${clickedPokemon['height'] / 10} m</p>
    <p id="evolution">${evo} </p>`
}


function searchFunctionTemplate(results, id){
    return `<div class="pokemon-card " id="pokemon-card${id}" onclick="openPokemonCard(${id}+1)">
    <h2 id="pokemonName" class="pokemon-name"> ${results['name'].charAt(0).toUpperCase() + results['name'].slice(1)}</h2>
    <p id="number">${pokemonIdNumberShow(results)}</p>    
    <img id="pokemonAvatar" src="${results['sprites']['other']['official-artwork']['front_default']}">
    <div id="pokemon-type">${pokemonTypesSearchfield(results)}</div>
  </div>`;
}

