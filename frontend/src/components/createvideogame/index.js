import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "./videogame.css";
import { getGenres, addVideogame } from "../../actions";

var tmpPlatforms = ["PC", "PS5", "PS4", "XBOXONE"];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      releaseDate: new Date(),
      rating: "",
      genres: [],
      customGenre: {
        enabled: false,
        value: "",
      },
      platforms: [],
      customPlatform: {
        enabled: false,
        value: "",
      },
      petition: {
        loading: false,
        error: null,
      },
      isLoaded: false,
      isSubmitted: false,
    };
  }

  handleNewChange(e) {
    this.setState({
      [e.target.id]: {
        ...this.state[e.target.id],
        value: e.target.value,
      },
    });
  }

  submitNewChange(e) {
    if (e.target.name === "genreAdd") {
      var newArray = this.state.genres;
      var tmp = true;
      for (var i = 0; i < newArray.length; i++) {
        if (newArray[i] === this.state.customGenre.value) {
          newArray.splice(i, 1);
          tmp = false;
        }
      }
      if (tmp === true) {
        this.setState({
          genres: [...this.state.genres, this.state.customGenre.value],
        });
        return;
      } else {
        this.setState({
          genres: newArray,
        });
      }
    } else if (e.target.name === "platformAdd") {
      newArray = this.state.platforms;
      tmp = true;
      for (i = 0; i < newArray.length; i++) {
        if (newArray[i] === this.state.customPlatform.value) {
          newArray.splice(i, 1);
          tmp = false;
        }
      }
      if (tmp === true) {
        this.setState({
          platforms: [...this.state.platforms, this.state.customPlatform.value],
        });
        return;
      } else {
        this.setState({
          platforms: newArray,
        });
      }
    }
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

  addNewPlatform() {
    if (this.state.customPlatform.enabled) {
      return (
        <div id="addNewPlatform">
          <input
            placeholder="New Platform"
            type="text"
            id="customPlatform"
            className="page__form-input__vg"
            value={this.state.customPlatform.value}
            onChange={(e) => this.handleNewChange(e)}
          ></input>
          <button
            type="button"
            name="platformAdd"
            onClick={(e) => this.submitNewChange(e)}
          >
            ADD
          </button>
        </div>
      );
    }
  }
  addNewGenre() {
    if (this.state.customGenre.enabled) {
      return (
        <div id="addNewGenre">
          <input
            placeholder="New Genre"
            type="text"
            id="customGenre"
            className="page__form-input__vg"
            value={this.state.customGenre.value}
            onChange={(e) => this.handleNewChange(e)}
          ></input>
          <button
            type="button"
            name="genreAdd"
            onClick={(e) => this.submitNewChange(e)}
          >
            ADD
          </button>
        </div>
      );
    }
  }
  // -*-*-*-*-*-*-*-*-*-*-*-* RENDER FUNCTION -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  render() {
    const {
      name,
      description,
      releaseDate,
      rating,
      genres,
      platforms,
    } = this.state;
    try {
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
              <form
                className="page__form"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <div className="page__form-div">
                  <h3 className="input__header">Name</h3>
                  <input
                    type="text"
                    id="name"
                    className="page__form-input__vg"
                    autoComplete="off"
                    value={name}
                    placeholder="Name"
                    required
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
                    required
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="page__form-div">
                  <h3 className="input__header">Release Date</h3>
                  <DatePicker
                    className="page__form-input__vg"
                    selected={releaseDate}
                    onChange={(date) => this.setState({ releaseDate: date })}
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
                {/* -*-*-*-*-*-*-*-*-*- GENRES -*-*-*-*-*-*-*-*-*- */}
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
                  <div className="page__form-check">
                    <input
                      type="checkbox"
                      value={this.state.customGenre.enabled}
                      className="page__form-check-input"
                      onClick={(e) =>
                        this.setState({
                          customGenre: {
                            ...this.state.customGenre,
                            enabled: !this.state.customGenre.enabled,
                          },
                        })
                      }
                    ></input>
                    <p className="page__form-check-p">Add new genre</p>
                  </div>
                  <div className="page__form-check">
                    {this.state.customGenre.enabled && this.addNewGenre()}
                  </div>
                </div>
                {/* -*-*-*-*-*-*-*-*-*- PLATFORMS -*-*-*-*-*-*-*-*-*- */}
                <div className="page__form-div">
                  <h3 className="input__header">Platforms</h3>
                  <select
                    name="platforms"
                    id="platforms"
                    required
                    className="page__form-select page__form-input__vg"
                    multiple={true}
                    value={platforms}
                    onChange={(e) => this.addPlatform(e)}
                    size="5"
                  >
                    {this.platformsList()}
                  </select>
                  <div className="page__form-check">
                    <input
                      type="checkbox"
                      value={this.state.customPlatform.enabled}
                      className="page__form-check-input"
                      onClick={(e) =>
                        this.setState({
                          customPlatform: {
                            ...this.state.customPlatform,
                            enabled: !this.state.customPlatform.enabled,
                          },
                        })
                      }
                    ></input>
                    <p className="page__form-check-p">Add new Platform</p>
                  </div>
                  <div className="page__form-check">
                    {this.state.customPlatform.enabled && this.addNewPlatform()}
                  </div>
                </div>

                <div className="page__form-btn">
                  <button className="page__form-submit2" type="submit">
                    UPLOAD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      return (
        <div>
          <h1>Error loading Genres.</h1>
          <p>Please reload the page</p>
        </div>
      );
    }
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
