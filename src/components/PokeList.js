import PokeCard from "./PokeCard";

import React, { Component } from "react";

class PokeList extends Component {
  state = {
    data: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://pokeapi.co/api/v2/pokemon?offset=100&limit=100")
      .then((res) => res.json())
      .then((data) => {
        const fetches = data.results.map((p) => {
          return fetch(p.url).then((res) => res.json());
        });
        Promise.all(fetches).then((res) => {
          console.log(res);
          this.setState({ data: res, isLoading: false });
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="cards">
        {this.state.data.map((p) => (
          <PokeCard
            name={p.name}
            key={p.name}
            image={
              p.sprites.versions["generation-v"]["black-white"].front_default
            }
          />
        ))}
      </div>
    );
  }
}

export default PokeList;
