import React from 'react';
import './EpisodeTable.css';

function EpisodeTable(props) {

    const episodes = props.episodes;     

    return (
    <div>
        {
        episodes === null ?
            <span></span>
            :

        <div className='EpisodeTable'>
            <table>
                <tbody>
                <tr>
                    <th>Episode</th>
                    <th>Name</th>
                </tr>
                {episodes.map((episode, index) => (
                    <tr id={index}>
                        <td>
                            {episode.episode}
                        </td>
                        <td>
                            {episode.name}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        }
    </div>
    )

};

export default EpisodeTable;