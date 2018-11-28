import {RICKANDMORTYURL} from './urls';

async function fetchURL(url, silent=false) {
    let answer = [];

    try {
      const res = await fetch(url);
      answer = await res.json();
    } catch (e) {
      if(silent === false){
        console.log(e);
      }
    }
    return answer;
  };

async function fetchRickAndMorty(){
    const characters_rym = await fetchURL(RICKANDMORTYURL);
    console.log(process.env);

    return characters_rym.map(character => ({name: character.name, id: character.id}));
  };

  async function updateCharacterList(){
    return await fetchURL(RICKANDMORTYURL + 'updateCharacterDatabase');
  }

  async function fetchCharacterData(character) {
      return await fetchURL(RICKANDMORTYURL + character);
  }

  async function fetchEpisodesOfCharacter(character) {
      return await fetchURL(RICKANDMORTYURL + 'character/' + character);
  }

  export {fetchRickAndMorty, fetchCharacterData, fetchEpisodesOfCharacter, updateCharacterList};