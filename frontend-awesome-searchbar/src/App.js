import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AutoCompleteText from './AutoCompleteText';
import CharacterBio from './CharacterBio';
import EpisodeTable from './EpisodeTable';
import TopNav from './TopNav'
import {fetchRickAndMorty, fetchCharacterData, fetchEpisodesOfCharacter, updateCharacterList} from './functions';
import MyButton from './MyButton';

class App extends Component {
  constructor(props) {
    super(props)
    this.onTextChanged = this.onTextChanged.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.onButtonEpisodesClicked = this.onButtonEpisodesClicked.bind(this);
    this.onButtonRefresh = this.onButtonRefresh.bind(this);

    this.state = {
      characters_rym: [],
      text: "",
      suggestions: [],
      character: null,
      done: false,
      episodes: null,
      isButtonVisible: false,
      isRefreshButtonVisible: true,
    }
  }
  
  async componentDidMount() {
    console.log("Loading characters...")
    const characters_rym = await fetchRickAndMorty();
    this.setState(() => ({characters_rym, done: true}));
  }

  onTextChanged = (value) => {
    const items = this.state.characters_rym;

    if(value.length === 0) {
        this.setState(() => ({
            suggestions: [], text: ""
        }));
    }
    else {
        const regex = new RegExp(`${value}`, 'i');
        const suggestions = items.sort().filter(v => regex.test(v.name));
        this.setState(() => ({
            suggestions, text: value
        }));
    }
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
        return null;
    }
    else {
        return (
            <ul>
                {suggestions.map( (item) => <li key={item.id} onClick={() => this.suggestionSelected(item)}>{item.name}</li> )}
            </ul>
        )
    }
  }

  async suggestionSelected (value) {
    const data = await fetchCharacterData(value.id);
    
    this.setState(() => ({
        text: value.name,
        suggestions: [],
        character: data,
        isButtonVisible: true,
        episodes: null,
    }));
  }

  async onButtonEpisodesClicked() {
    const characterID = this.state.character.id;
    const episodeData = await fetchEpisodesOfCharacter(characterID);
    this.setState(() => ({episodes: episodeData, isButtonVisible: false}));
  }

  async onButtonRefresh() {
      this.setState(() => ({isRefreshButtonVisible: false}));
      await updateCharacterList();
      this.setState(() => ({isRefreshButtonVisible: true}));
      const characters_rym = await fetchRickAndMorty();
      this.setState(() => ({characters_rym, done: true}));  
  }


  render() {
    const characters_rym = this.state.characters_rym;
    const text = this.state.text;
    const character = this.state.character;
    const doneLoading = this.state.done;
    const episodes = this.state.episodes;
    const isVisible = this.state.isButtonVisible;
    const isRefreshButtonVisible = this.state.isRefreshButtonVisible;

    return (<div>
      {doneLoading === false ? 
      <header className='App-header'>
        <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Loading...
          </h1>
          </header>
        
        :
        
        <div className="App">
          <TopNav/>


          <div className="row">
            <div className="column">
              <MyButton onButtonClicked={this.onButtonRefresh} isVisible={isRefreshButtonVisible} text="Refresh Characters"/>

              {isRefreshButtonVisible ? <span></span> : <img src={logo} className="App-logo" alt="logo" />}
              
              <div className='App-Component'>
                <AutoCompleteText items={characters_rym} 
                                  onTextChanged={this.onTextChanged}
                                  text={text}
                                  renderSuggestions={this.renderSuggestions}
                                  suggestionSelected={this.suggestionSelected}/>
              </div>

            </div>
            <div className="column">
              <div className='App-Table'>
                <CharacterBio character={character}/>
              </div>
                <MyButton onButtonClicked={this.onButtonEpisodesClicked} isVisible={isVisible} text="View Episodes"/>
              <div className='App-Table'>
                <EpisodeTable episodes={episodes}/>
              </div>

            </div>
          </div>


    
        </div>
      }
    </div>
    );
  }
}

export default App;

