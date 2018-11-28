import React from 'react';
import './CharacterBio.css';

function CharacterBio (props) {
    
    const character = props.character;     
    
    return (
        <div>
        {
        character === null ?
            <span></span>
            :


        <div className='CharacterBio'>
            <table>
                <tbody>
                <tr>
                    <th colSpan="2">{character.name}</th>
                </tr>
                <tr>
                    <td colSpan="2">
                        <img src={character.image} alt={character.name}/>
                    </td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{character.status}</td>
                </tr>
                <tr>
                    <td>Species</td>
                    <td>{character.species}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{character.gender}</td>
                </tr>
                </tbody>
            </table>
        </div>
        }
    </div>
    )
        
};

export default CharacterBio;