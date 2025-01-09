"use client";

import React, { useEffect, useState } from "react";
import { getPokemons, getTypes } from "../utils/api";
import PokemonCard from "../components/PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokemonsData, typesData] = await Promise.all([
          getPokemons({}),
          getTypes(),
        ]);
        setPokemons(pokemonsData);
        setFilteredPokemons(pokemonsData.slice(0, limit));
        setTypes(typesData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

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
    setLimit(limit + 10); 
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
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={selectedType}
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
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
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
