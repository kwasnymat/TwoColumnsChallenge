import React from "react";
import ReactDOM from "react-dom";
import paginate from "./paginate.js";
import SecondColumn from "./secondcolumn.jsx";
import FirstColumn from "./firstcolumn.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        totalItems: 0,
        currentPage: 1,
        pageSize: 12,
        numberOfPages: 0,
        startPage: 0,
        endPage: 0,
        startIndex: 0,
        endIndex: 12,
        pages: [],
        photos: []
      },
      showCircle: false,
      link: ""
    };
  }

  handlePagination = e => {
    const paginationData = paginate(
      this.state.pagination.totalItems,
      Number(e.target.text),
      12,
      10,
      this.state.pagination.photos
    );
    this.setState({ pagination: paginationData });
  };

  handlePicture = e => {
    e.preventDefault();
    this.setState({
      showCircle: true,
      link: e.target.href
    });
  };

  componentDidMount() {
    const apiURL = "https://jsonplaceholder.typicode.com/photos";
    fetch(apiURL)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("API error");
        }
      })
      .then(data => {
        const paginationData = paginate(
          data.length,
          this.state.pagination.currentPage,
          this.state.pagination.pageSize,
          10,
          data
        );
        this.setState({ pagination: paginationData });
      })
      .catch(err => {
        console.log("API error", err);
      });
  }

  render() {
    return (
      <div className="container">
        <FirstColumn
          {...this.state}
          handlePagination={this.handlePagination}
          handlePicture={this.handlePicture}
        />
        <SecondColumn {...this.state} />
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<App />, document.getElementById("app"));
});
