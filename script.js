async function init() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await(url);
    let responseAsJson = await response.json();

    console.log('loaded pokemon', init);
}