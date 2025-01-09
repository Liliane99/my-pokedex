import React, { useState } from 'react';
import './PokemonCard.css'; 

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Evolution {
  level: number;
  pokemon_name: string;
}

interface Type {
  id: number;
  name: string;
}

interface PokemonProps {
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: Stats;
  types: Type[];
  evolutions: Evolution[];
}

const PokemonCard: React.FC<PokemonProps> = ({
  pokedexId,
  name,
  image,
  sprite,
  stats,
  types,
  evolutions,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="card"
        style={{ cursor: 'pointer' }}
        onClick={handleCardClick} 
      >
        <img src={image} alt={name} className="pokemon-image" />
        <div className="pokemon-details">
          <h2>{name} #{pokedexId}</h2>
          <div className="types">
            {types.map((type) => (
              <span key={type.id} className={`type ${type.name.toLowerCase()}`}>
                {type.name}
              </span>
            ))}
          </div>
          <h3>Click sur moi</h3>
        </div>
      </div>

      {}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
            <h2>{name} (# {pokedexId})</h2>
            <img src={image} alt={name} className="pokemon-modal-image" />
            <div className="stats">
              <h3>Statistique :</h3>
              <ul>
                <li>HP: {stats.hp}</li>
                <li>Attack: {stats.attack}</li>
                <li>Defense: {stats.defense}</li>
                <li>Special Attack: {stats.special_attack}</li>
                <li>Special Defense: {stats.special_defense}</li>
                <li>Speed: {stats.speed}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
