import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CollectionContext = createContext();

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};

export const CollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);

  // Cargar colección desde AsyncStorage al iniciar
  useEffect(() => {
    loadCollection();
  }, []);

  // Guardar colección en AsyncStorage cuando cambie
  useEffect(() => {
  saveCollection(); // Siempre guarda, incluso si está vacía
}, [collection]);


  const loadCollection = async () => {
    try {
      const savedCollection = await AsyncStorage.getItem('gameCollection');
      if (savedCollection) {
        setCollection(JSON.parse(savedCollection));
      }
    } catch (error) {
      console.error('Error loading collection:', error);
    }
  };

  const saveCollection = async () => {
    try {
      await AsyncStorage.setItem('gameCollection', JSON.stringify(collection));
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  // Generar ID único para juego + plataforma
  const generateUniqueId = (gameId, platform) => {
    return `${gameId}-${platform}`;
  };

  // Obtener precio según la plataforma (actualizado con precios correctos)
  const getGamePrice = (platform) => {
    const prices = {
      'Nintendo DS': 25.00,
      'Nintendo 3DS': 100.00,
      'Wii': 100.00,
      'Wii U': 150.00,
      'Nintendo Switch': 200.00,
      'Xbox 360': 150.00,
      'PSP': 70.00,
      'PS Vita': 100.00,
      'PlayStation 2': 100.00,
      'PlayStation 3': 150.00,
      'PlayStation 4': 200.00,
      'PC': 200.00,
    };
    return prices[platform] || 150.00; // Precio por defecto actualizado
  };

  // Verificar si un juego de una plataforma específica está en la colección
  const isGameInCollection = (gameId, platform) => {
    const uniqueId = generateUniqueId(gameId, platform);
    return collection.some(item => item.uniqueId === uniqueId);
  };

  // Agregar juego a la colección
  const addToCollection = (game, platform = null) => {
    try {
      // Si no se especifica plataforma, usar la del juego
      const targetPlatform = platform || game.platform;
      const uniqueId = generateUniqueId(game.id, targetPlatform);
      
      // Verificar si ya existe en la colección
      if (isGameInCollection(game.id, targetPlatform)) {
        console.log('Game already in collection for this platform');
        return false; // No se pudo agregar porque ya existe
      }

      const newItem = {
        uniqueId: uniqueId,
        gameId: game.id,
        platform: targetPlatform,
        name: game.nombre || game.name || 'Sin nombre',
        genre: game.genero || game.genre || '',
        year: game.fecha_lanzamiento || game.year || '',
        rating: game.rating || 0,
        metacritic: game.puntuacion_metacritic || 0,
        // description: game.descripcion || game.description || '',
        quantity: 1,
        price: getGamePrice(targetPlatform),
        dateAdded: new Date().toISOString(),
      };

      setCollection(prevCollection => [...prevCollection, newItem]);
      return true; // Se agregó exitosamente
    } catch (error) {
      console.error('Error adding to collection:', error);
      return false;
    }
  };

  // Actualizar cantidad de un juego en la colección
  const updateQuantity = (uniqueId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCollection(uniqueId);
      return;
    }

    setCollection(prevCollection =>
      prevCollection.map(item =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Incrementar cantidad de un juego en la colección
  const incrementQuantity = (uniqueId) => {
    setCollection(prevCollection =>
      prevCollection.map(item =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrementar cantidad de un juego en la colección
  const decrementQuantity = (uniqueId) => {
    setCollection(prevCollection =>
      prevCollection.map(item =>
        item.uniqueId === uniqueId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Remover juego de la colección
  const removeFromCollection = (uniqueId) => {
    setCollection(prevCollection =>
      prevCollection.filter(item => item.uniqueId !== uniqueId)
    );
  };

  // Obtener item específico de la colección
  const getCollectionItem = (gameId, platform) => {
    const uniqueId = generateUniqueId(gameId, platform);
    return collection.find(item => item.uniqueId === uniqueId);
  };

  // Obtener total de items en la colección
  const getTotalItems = () => {
    return collection.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener precio total de la colección
  const getTotalPrice = () => {
    return collection.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Limpiar toda la colección
  const clearCollection = async () => {
  setCollection([]);
  await AsyncStorage.removeItem('gameCollection'); // También borra el almacenamiento
};


  // Obtener estadísticas de la colección
  const getCollectionStats = () => {
    const totalGames = collection.length;
    const totalItems = getTotalItems();
    const totalValue = getTotalPrice();
    const platforms = [...new Set(collection.map(item => item.platform))];
    const genres = [...new Set(collection.map(item => item.genre).filter(Boolean))];

    return {
      totalGames,
      totalItems,
      totalValue,
      platforms: platforms.length,
      genres: genres.length,
      platformList: platforms,
      genreList: genres,
    };
  };

  const value = {
    collection,
    addToCollection,
    removeFromCollection,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
    isGameInCollection,
    getCollectionItem,
    getTotalItems,
    getTotalPrice,
    getGamePrice,
    clearCollection,
    getCollectionStats,
    generateUniqueId,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};