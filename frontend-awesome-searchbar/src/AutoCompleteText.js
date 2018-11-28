import React from 'react';
import './AutoCompleteText.css';

class AutoCompleteText extends React.Component {
    
    constructor(props) {
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.suggestionSelected = this.suggestionSelected.bind(this);
    }

    onTextChanged = (e) => {
        this.props.onTextChanged(e.target.value);
    }

    async suggestionSelected (value) {
        this.props.suggestionSelected(value);
    }

    renderSuggestions() {
        return this.props.renderSuggestions();
    }

    render() {
        return (
            <div className='AutoCompleteText'>
                <input value={this.props.text} onChange={this.onTextChanged} type="text" />
                <ul>
                    {this.renderSuggestions()}
                </ul>
            </div>
      )
    }

};

export default AutoCompleteText;