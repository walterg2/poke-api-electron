const pokemonList = document.querySelector('.list');

let getResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`Status code of ${response.status} was returned with message ${response.statusText}`);
};

let createAnchor = (item) => {
  let anchor = document.createElement('a');
  anchor.href = item.href;
  anchor.innerHTML = item.name;

  return anchor;
};

let processJson = (jsonObject) => {
  let results = jsonObject['results'];

  if (!results.length) {
    throw new Error('No results were returned');
  }

  results.forEach((item) => {
    let listItem = document.createElement('li');

    listItem.appendChild(createAnchor(item));
    pokemonList.appendChild(listItem);
  });
};

let handleError = (error) => {
  alert(`Something went wrong.\n${error.message}`);
};

fetch('http://pokeapi.co/api/v2/pokemon/?limit=1000')
  .then(getResponse)
  .then(processJson)
  .catch(handleError);

