import React, { Component } from "react";
import { connect } from "react-redux";
import "./videogame.css";
import { getGenres, addVideogame } from "../../actions";

var tmpPlatforms = ["PC", "PS5", "PS4", "XBOXONE"];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      genres: [],
      platforms: [],
      petition: {
        loading: false,
        error: null,
      },
      isLoaded: false,
      isSubmitted: false,
    };
  }

  componentDidMount() {
    this.setState({
      petition: {
        loading: true,
        error: null,
      },
    });
    this.props.getGenres().then(() => {
      this.setState({
        petition: {
          loading: false,
          error: null,
        },
        isLoaded: true,
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("SUBMIT");
    this.props
      .uploadVideogame({
        name: this.state.name,
        description: this.state.description,
        releaseDate: this.state.releaseDate,
        rating: this.state.rating,
        genres: this.state.genres,
        platforms: this.state.platforms,
      })
      .then(this.setState({ isSubmitted: true }));
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };

  genresList() {
    if (this.state.isLoaded) {
      return this.props.genres.response.map((element, i) => {
        return (
          <option key={i} value={element.name}>
            {element.name}
          </option>
        );
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  platformsList() {
    if (this.state.isLoaded) {
      return tmpPlatforms.map((element, i) => {
        return (
          <option key={i} value={element}>
            {element}
          </option>
        );
      });
    }
  }

  addGenres(e) {
    var newArray = this.state.genres;
    var tmp = true;
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i] === e.target.value) {
        newArray.splice(i, 1);
        tmp = false;
      }
    }
    if (tmp === true) {
      this.setState({
        genres: [...this.state.genres, e.target.value],
      });
      return;
    } else {
      this.setState({
        genres: newArray,
      });
    }
  }

  addPlatform(e) {
    var newArray = this.state.platforms;
    var tmp = true;
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i] === e.target.value) {
        newArray.splice(i, 1);
        tmp = false;
      }
    }
    if (tmp === true) {
      this.setState({
        platforms: [...this.state.platforms, e.target.value],
      });
      return;
    } else {
      this.setState({
        platforms: newArray,
      });
    }
  }

  render() {
    const {
      name,
      description,
      releaseDate,
      rating,
      genres,
      platforms,
    } = this.state;
    return (
      <div id="page__leader">
        <div className="container">
          <div className="page__head">
            {this.state.isSubmitted && (
              <div className="page__head-message">
                <h1>Game uploaded succesfully!</h1>
              </div>
            )}
          </div>
          <div className="page__content">
            <form className="page__form" onSubmit={(e) => this.handleSubmit(e)}>
              <div className="page__form-div">
                <h3 className="input__header">Name</h3>
                <input
                  type="text"
                  id="name"
                  className="page__form-input__vg"
                  autoComplete="off"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="page__form-div">
                <h3 className="input__header">Description</h3>
                <input
                  type="text"
                  id="description"
                  autoComplete="off"
                  className="page__form-input__vg"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="page__form-div">
                <h3 className="input__header">Release Date</h3>
                <input
                  type="text"
                  className="page__form-input__vg"
                  id="releaseDate"
                  placeholder="Release Date"
                  autoComplete="off"
                  value={releaseDate}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="page__form-div">
                <h3 className="input__header">Rating</h3>
                <input
                  type="number"
                  id="rating"
                  autoComplete="off"
                  placeholder="Rating"
                  className="page__form-input__vg"
                  value={rating}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="page__form-div">
                <h3 className="input__header">Genres</h3>
                <select
                  name="genres"
                  id="genres"
                  className="page__form-input__vg page__form-select"
                  multiple={true}
                  value={genres}
                  onChange={(e) => this.addGenres(e)}
                >
                  {this.state.isLoaded &&
                    !this.state.petition.error &&
                    this.genresList()}
                </select>
              </div>
              <div className="page__form-div">
                <h3 className="input__header">Platforms</h3>
                <select
                  name="platforms"
                  id="platforms"
                  className="page__form-select page__form-input__vg"
                  multiple={true}
                  value={platforms}
                  onChange={(e) => this.addPlatform(e)}
                  size="5"
                >
                  {this.platformsList()}
                </select>
              </div>
              <div className="page__form-div">
                <button className="page__form-submit" type="submit">UPLOAD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    genres: state.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGenres: () => dispatch(getGenres()),
    uploadVideogame: (payload) => dispatch(addVideogame(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
