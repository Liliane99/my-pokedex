import axios from "axios";

const api = axios.create({
  baseURL: "https://nestjs-pokedex-api.vercel.app",
});

export const getPokemons = async (params = { limit: 100 }) => {
  try {
    const response = await api.get("/pokemons", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemons:", error);
    throw error;
  }
};

export const getPokemonsCorrection = async (params: {
  name?: string;
  typeId?: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await api.get("/pokemons", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemons:", error);
    throw error;
  }
};

export const getPokemonByName = async (name: string) => {
  try {
    const response = await api.get(`/pokemons`, { params: { name } });
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching Pokemon by name "${name}":`, error);
    throw error;
  }
};

export const getTypes = async () => {
  try {
    const response = await api.get("/types");
    return response.data;
  } catch (error) {
    console.error("Error fetching Types:", error);
    throw error;
  }
};
