import React, { Component } from "react";
import { connect } from "react-redux";
import { searchVideogame } from "../../actions";
import { Loader } from "../loader";
import "./detail.css";

const Maps = (props) => {
  if (props.local) {
    return (
      <>
        <li>{props.game}</li>
      </>
    );
  }
  return (
    <>
      <li>{props.game.name}</li>
    </>
  );
};

export class DetailGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petition: {
        loading: false,
        error: null,
      },
      released: undefined,
      isLoaded: false,
      local: false,
    };
  }

  changeBackground() {
    const page__leader = document.getElementById("page__leader");
    page__leader.style = `background-size:100%;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7455357142857143) 100%), url("${this.props.detail.image}") no-repeat center center fixed;
    height: 100%;
    `;
  }

  componentDidMount() {
    const { name } = this.props.match.params;
    const search = this.props.location.search;
    var local = new URLSearchParams(search).get("local");
    var boolLocal = local === "true" ? true : false;
    this.setState({ local: boolLocal });

    this.setState({
      petition: { loading: true, error: null },
    });
    if (local) {
      this.props.getVideogame({ id: name, local }).then(() => {
        this.setState({
          petition: { loading: false, error: null },
          isLoaded: true,
        });
      });
      return;
    }
    this.props.getVideogame({ id: name }).then(() => {
      this.setState({
        petition: { loading: false, error: null },
        isLoaded: true,
      });
    });
  }

  list(opt) {
    if (opt === "genres") {
      return this.props.detail.genres.map((game) => {
        return <Maps game={game} key={game.id} />;
      });
    } else {
      return this.props.detail.platforms.map((platform) => {
        if (this.state.local) {
          return (
            <Maps
              game={platform}
              local={true}
              key={Math.floor(Math.random() * 100 + 1)}
            />
          );
        }
        return <Maps game={platform.platform} key={platform.platform.id} />;
      });
    }
  }

  render() {
    return (
      <div id="page__leader" className="container">
        {this.state.petition.loading && (
          <div>
            <Loader />
          </div>
        )}
        {this.state.isLoaded && (
          <>
            {this.changeBackground()}
            <div className="page__head">
              <div className="page__head-meta">
                <div className="page__head-date">
                  {this.props.detail.releaseDate}
                </div>
                <div className="page__head-rating">
                  {this.props.detail.rating} ⭐
                </div>
              </div>
              <h1 className="heading title">{this.props.detail.name}</h1>
              <div className="page__about">
                <h2 className="page__about-header">About</h2>
                <p className="page__about-text">
                  {this.props.detail.description}
                </p>
              </div>
            </div>
            <div className="page__detailts">
              <div className="page__screenshot">
                <img
                  className="page__screenshot-image"
                  src={this.props.detail.image}
                  alt="ni idea"
                />
              </div>
              <div className="page__details">
                <div className="page__details-content">
                  <div className="page__details-list">
                    <h3 className="page__details-header">Genres List:</h3>
                    <ul className="page__details-list-ul">
                      {this.state.local === false && this.list("genres")}
                    </ul>
                  </div>
                  <div className="page__details-list">
                    <h3 className="page__details-header">Platforms List:</h3>
                    <ul className="page__details-list-ul">{this.list()}</ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    id,
    genres,
    background_image,
    description_raw,
    description,
    released,
    releaseDate,
    rating,
    name,
    platforms,
  } = state.videogames;
  var stringToDate = new Date(released).toLocaleDateString("en-se");

  console.log(stringToDate);
  return {
    detail: {
      id,
      genres,
      image: background_image || "https://picsum.photos/id/237/1280/720",
      description: description_raw || description,
      releaseDate: released || releaseDate,
      rating,
      name,
      platforms,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVideogame: (name) => dispatch(searchVideogame(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailGame);
