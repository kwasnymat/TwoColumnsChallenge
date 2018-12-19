import React from "react";
import ReactDOM from "react-dom";
import paginate from "./paginate.js";

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

const Header = ({ header }) => <h1 className="container__heading">{header}</h1>;

const FirstColumn = props => {
  return <List {...props} />;
};

class List extends React.Component {
  render() {
    const {
      photos,
      startIndex,
      endIndex,
      pages,
      currentPage
    } = this.props.pagination;
    return (
      <div className="container__col-1">
        <Header header="Open-E Poland" />
        <div className="container__list">
          <ul>
            {photos.slice(startIndex, endIndex).map((photo, index) => (
              <li key={index}>
                <a
                  className="container__link"
                  href={photo.thumbnailUrl}
                  onClick={e => this.props.handlePicture(e)}
                >
                  {photo.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="container__pagination">
          {pages.map((page, index) =>
            currentPage === page ? (
              <a key={index} href="#" className="container__page--active">
                {page}
              </a>
            ) : (
              <a
                key={index}
                href="#"
                className="container__page"
                onClick={e => this.props.handlePagination(e)}
              >
                {page}
              </a>
            )
          )}
        </div>
      </div>
    );
  }
}

class SecondColumn extends React.Component {
  render() {
    return (
      <div className="container__col-2">
        {this.props.showCircle ? <Picture image={this.props.link} /> : null}
      </div>
    );
  }
}

class Picture extends React.Component {
  render() {
    return (
      <div
        className="container__circle"
        style={{ backgroundImage: `url(${this.props.image})` }}
      />
    );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<App />, document.getElementById("app"));
});
