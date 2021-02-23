import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchVideogame } from "../../actions";
import { Loader } from "../loader";
import { randEmoji } from "../../idk/random-emoji";
import "./home.css";

const GamesMap = (props) => {
  var stringGenres = "";

  props.videogame.genres.forEach((element) => {
    stringGenres += element.name + " ";
  });

  function onMouseLeave() {
    var target = document.querySelector(`#genre_${props.videogame.id}`);
    target.classList.add("hidden");
  }

  function onMouseEnter() {
    var target = document.querySelector(`#genre_${props.videogame.id}`);
    target.classList.remove("hidden");
  }

  return (
    <NavLink
      to={`/videogame/${props.videogame.id}`}
      className="page__list__cards-card"
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <div className="page__list__card-img">
        <img
          className="card__image"
          src={props.videogame.image}
          alt={`${props.videogame.name} background`}
        />
      </div>
      <div className="page__list__card-title">
        <div className="card__title card__link">
          {props.videogame.name + randEmoji()}
        </div>
        <div
          id={`genre_${props.videogame.id}`}
          className="page__list__card-genres hidden"
        >
          <div className="genres__title">Genres:</div>
          <div className="genres__string">{stringGenres}</div>
        </div>
      </div>
    </NavLink>
  );
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      ordering: "up",
      isSubmitted: false,
      petition: {
        loading: false,
        msg: null,
      },
    };
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      petition: {
        loading: true,
        error: null,
      },
      isSubmitted: false,
    });

    this.props
      .getVideogame(this.state.title)
      .then(() => {
        this.setState({
          petition: {
            loading: false,
            error: null,
          },
          isSubmitted: true,
        });
      })
      .catch((err) => console.error("GAME NOT FOUND!!!", err.message));
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };

  pagination(e) {
    const { id } = e.target;
    if (id === "next") {
      this.setState({
        petition: {
          loading: true,
          error: null,
        },
        isSubmitted: false,
      });

      this.props
        .getVideogame({
          name: this.state.title,
          page: this.props.videogames.next,
        })
        .then(() => {
          this.setState({
            petition: {
              loading: false,
              error: null,
            },
            isSubmitted: true,
          });
        });
    }
    if (id === "previous") {
      this.setState({
        petition: {
          loading: true,
          error: null,
        },
        isSubmitted: false,
      });

      this.props
        .getVideogame({
          name: this.state.title,
          page: this.props.videogames.previous,
        })
        .then(() => {
          this.setState({
            petition: {
              loading: false,
              error: null,
            },
            isSubmitted: true,
          });
        });
    }
  }

  // EXTENSIVE CODE AHEAD FOR THIS FUNCTION !!NEEDS RECODE!!
  videogamesMap() {
    if (
      this.props.videogames.hasOwnProperty("results") &&
      !this.state.petition.loading
    ) {
      switch (this.state.ordering) {
        // CASE NAME DOWN
        case "name-down":
          var tmp1 = this.props.videogames.results;
          tmp1.sort((a, b) => {
            let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
          tmp1.reverse();
          return tmp1.map((game) => {
            return <GamesMap videogame={game} key={game.tmpid} />;
          });
        // CASE NAME UP
        case "name-up":
          var tmp = this.props.videogames.results;
          tmp.sort((a, b) => {
            let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
          return tmp.map((game) => {
            return <GamesMap videogame={game} key={game.tmpid} />;
          });
        // CASE DEFAULT
        case "rating-up":
          var tmpratingUp = this.props.videogames.results;
          tmpratingUp.sort((a, b) => {
            return a.rating - b.rating;
          });
          return tmpratingUp.map((game) => {
            return <GamesMap videogame={game} key={game.tmpid} />;
          });
        case "rating-down":
          var tmpratingDown = this.props.videogames.results;
          tmpratingDown.sort((a, b) => {
            return a.rating - b.rating;
          });
          tmpratingDown.reverse();
          return tmpratingDown.map((game) => {
            return <GamesMap videogame={game} key={game.tmpid} />;
          });
        default:
          return this.props.videogames.results.map((game) => {
            return <GamesMap videogame={game} key={game.tmpid} />;
          });
      }
    }
  }
  // ----------!!END OF EXTENSIVE FUNCTION!!---------- //

  orderingFunction(event) {
    const { id } = event.target;

    switch (id) {
      case "name":
        if (event.target.value === "name-up") {
          event.target.value = "name-down";
          this.setState({
            ordering: "name-down",
          });
        } else {
          event.target.value = "name-up";
          this.setState({
            ordering: "name-up",
          });
        }
        break;
      case "rating":
        if (event.target.value === "rating-up") {
          event.target.value = "rating-down";
          this.setState({
            ordering: "rating-down",
          });
        } else {
          event.target.value = "rating-up";
          this.setState({
            ordering: "rating-up",
          });
        }
        break;
      default:
    }
  }

  render() {
    const { title } = this.state;
    return (
      <div id="page__leader">
        <div className="container-home">
          <div className="page__head">
            <div className="page__head-meta">
              <h1 className="heading title">Search any videogame</h1>
            </div>
          </div>
          <div className="page__form">
            <form
              className="page__search__form"
              onSubmit={(e) => this.handleSubmit(e)}
              role="search"
            >
              <div className="page__search__input__area">
                <input
                  type="text"
                  id="title"
                  className="page__form-input"
                  placeholder="Tomb Raider..."
                  autoFocus={true}
                  autoComplete="off"
                  value={title}
                  onChange={(e) => this.handleChange(e)}
                  onKeyPress={(e) => this.handleKeyPress(e)}
                />
              </div>
              <button className="page__form-submit" type="submit">
                search
              </button>
            </form>
          </div>
          <div className="page__list__games">
            {this.state.petition.loading && (
              <div>
                <Loader />
              </div>
            )}
            {this.state.isSubmitted && (
              <>
                <div className="page__divbar">
                  <div className="page__divbar-content head">
                    <h1>Order By</h1>
                    <div className="page__divbar-content">
                      <p
                        id="name"
                        value="name-down"
                        className="divbar__btn"
                        onClick={(e) => this.orderingFunction(e)}
                      >
                        📖Name
                      </p>
                    </div>
                    <div className="page__divbar-content">
                      <p
                        id="rating"
                        value="rating-down"
                        className="divbar__btn"
                        onClick={(e) => this.orderingFunction(e)}
                      >
                        ⭐Rating
                      </p>
                    </div>
                  </div>
                </div>
                <div className="page__list__cards">
                  {/* {this.props.searchMsg} */}
                  {this.videogamesMap()}
                </div>
                <div>
                  <div>
                    <p id="previous" onClick={(e) => this.pagination(e)}>
                      Previous
                    </p>
                  </div>
                  <div>
                    <p id="next" onClick={(e) => this.pagination(e)}>
                      Next
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    searchMsg: state.searchMsg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVideogame: (payload) => dispatch(searchVideogame(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
