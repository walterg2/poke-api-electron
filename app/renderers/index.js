const pokemonList = document.querySelector('.list');

let getResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`Status code of ${response.status} was returned with message ${response.statusText}`);
};

let createAnchor = (item) => {
  let anchor = document.createElement('a');
  anchor.href = item.url;
  anchor.innerHTML = item.name;

  return anchor;
};

let sortResults = (jsonObject) => {
  let results = jsonObject['results'];

  return results.sort((a, b) => {
    let first = a.name.toLowerCase();
    let second = b.name.toLowerCase();
    if (first < second) {
      return -1;
    } else if (first > second) {
      return 1;
    } else {
      return 0;
    }
  });
};

let processJson = (results) => {
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
  .then(sortResults)
  .then(processJson)
  .catch(handleError);

