import React from 'react';

class MyButton extends React.Component {

    constructor(props) {
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    onButtonClicked() {
        this.props.onButtonClicked();
    }

    render() {
        const isVisible = this.props.isVisible;

        return(
            <div className="My-Button">
                {
                    isVisible === true ?
                    <button onClick={this.onButtonClicked}>{this.props.text}</button>
                    :
                    <span></span>
                }
            </div>
        )
    }
};

export default MyButton;