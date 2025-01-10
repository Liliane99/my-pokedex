"use client";

import React, { use, useEffect, useState } from "react";
import { getPokemons, getPokemonsCorrection, getTypes } from "../utils/api";
import PokemonCard from "../components/PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(undefined); // mettre les valeurs à undefined permet à axios de les ignorer
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(undefined);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [pokemonsData, typesData] = await Promise.all([
  //         getPokemons({}),
  //         getTypes(),
  //       ]);
  //       setPokemons(pokemonsData);
  //       setFilteredPokemons(pokemonsData.slice(0, limit));
  //       setTypes(typesData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [limit]);

  const fetchPokemons = async () => {
    const data = await getPokemonsCorrection({
      name: searchTerm,
      typeId: selectedType,
      limit,
      page,
    });
    setPokemons([...pokemons, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, [searchTerm, selectedType, limit, page]);

  /**
   * Pourquoi faire des handle différent pour ensuite appeler la même fonction filterPokemons ?
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    filterPokemons(searchValue, selectedType);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setSelectedType(type);
    filterPokemons(searchTerm, type);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
  };

  // utiliser l'API
  const filterPokemons = (search: string, type: string) => {
    let filtered = pokemons;

    if (search) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search)
      );
    }

    if (type) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((t: { name: string }) => t.name === type)
      );
    }

    setFilteredPokemons(filtered.slice(0, limit));
  };

  const loadMorePokemons = () => {
    // setLimit(limit + 10);
    setPage(page + 1);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="logo">
        <h1>Pokedex</h1>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Tape le petit nom de ton pokemon ici"
          value={searchTerm ?? ""}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={selectedType ?? ""}
          onChange={handleTypeChange}
          className="type-select"
        >
          <option value="">Tous les Types</option>
          {types.map((type: { id: number; name: string }) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          value={limit}
          onChange={handleLimitChange}
          className="limit-select"
        >
          <option value={10}>Afficher 10 Pokémon</option>
          <option value={20}>Afficher 20 Pokémon</option>
          <option value={50}>Afficher 50 Pokémon</option>
        </select>
      </div>

      <div className="pokemon-list">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            /**
             * pas forcément une bonne idée ici le spread operator, comme tu ne type pas ton component de l'autre côté,
             * tu ne maitrise pas vraiment ce qui arrive dans les props
             * j'aurais donnée une props pokemon, que j'aurais déconstructuré dans le component en typant la prop
             */
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))
        ) : (
          <div>Aucun Pokémon trouvé.</div>
        )}
      </div>

      <div className="load-more">
        <button onClick={loadMorePokemons}>Charger plus</button>
      </div>
    </div>
  );
};

export default PokemonList;
