import React from "react";
import Picture from './picture.jsx';

export default class SecondColumn extends React.Component {
    render() {
        return (
            <div className="container__col-2">
                {this.props.showCircle ? <Picture image={this.props.link} /> : null}
            </div>
        );
    }
}