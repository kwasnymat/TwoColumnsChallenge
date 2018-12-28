import React from "react";

export default class Picture extends React.Component {
    render() {
        return (
            <div
                className="container__circle"
                style={{ backgroundImage: `url(${this.props.image})` }}
            />
        );
    }
}