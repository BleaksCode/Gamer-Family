// src/hooks/useHomeLogic.js
import { useState, useMemo } from 'react';
import gamesData from '../assets/games.json';
import { getImageForId } from '../utils/imageMapper';
import { getMetaScoreColor } from '../screens/DetailScreen.styles';

export function useHomeLogic(navigation) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);

  const allGenres = useMemo(
    () => [...new Set(gamesData.flatMap((g) => g.genres))],
    []
  );

  const enrichedGames = useMemo(
    () =>
      gamesData.map((game) => ({
        ...game,
        coverImage: getImageForId(game.id),
        formattedRating: game.rating.toFixed(1),
        metaColor: getMetaScoreColor(game.metacritic),
      })),
    []
  );

  const filteredGames = useMemo(
    () =>
      enrichedGames.filter((game) => {
        const matchesSearch = game.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre
          ? game.genres.includes(selectedGenre)
          : true;
        return matchesSearch && matchesGenre;
      }),
    [searchQuery, selectedGenre, enrichedGames]
  );

  const handleSelectGame = (game) =>
    navigation.navigate('Detail', { game });

  return {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    allGenres,
    filteredGames,
    handleSelectGame,
  };
}
