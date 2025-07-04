import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Search, Heart } from 'lucide-react-native';
import { useCollection } from '../contexts/CollectionContext';
import { getImageForId } from '../utils/imageMapper';
import gamesData from '../assets/test.json';

const PlatformGamesScreen = ({ route, navigation }) => {
  const { platform } = route.params;
  const { isGameInCollection } = useCollection();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    console.log('Platform received:', platform);
    console.log('Total games in JSON:', gamesData.juegos?.length || 0);
    
    // Filtrar juegos que tengan la plataforma específica
    const platformGames = gamesData.juegos?.filter(game => 
      game.plataformas?.some(p => p.nombre === platform)
    ) || [];
    
    console.log('Games found for platform:', platformGames.length);
    
    // Procesar los juegos para la plataforma específica
    const gamesWithPlatform = platformGames.map((game, index) => {
      // Encontrar la información específica de la plataforma
      const platformInfo = game.plataformas.find(p => p.nombre === platform);
      
      return {
        id: game.id || `${platform}-${index}`,
        nombre: game.nombre || 'Sin nombre',
        platform: platform,
        genero: game.genero || '',
        fecha_lanzamiento: game.fecha_lanzamiento || '',
        puntuacion_metacritic: game.puntuacion_metacritic || 0,
        rating: game.rating || 0,
        storage: platformInfo?.almacenamiento || '',
        // descripcion: game.descripcion || '',
        plataformas: game.plataformas || [],
        imageId: game.id // Usar el ID del juego para buscar la imagen
      };
    });

    if (searchQuery.trim() === '') {
      setFilteredGames(gamesWithPlatform);
    } else {
      const filtered = gamesWithPlatform.filter(game =>
        game.nombre && game.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [platform, searchQuery]);

  const renderGameCard = ({ item }) => {
    const inCollection = isGameInCollection(item.id, item.platform);
    
    return (
      <TouchableOpacity
        style={styles.gameCard}
        onPress={() => navigation.navigate('GameDetail', { 
          game: item,
          fromPlatform: true 
        })}
      >
        <View style={styles.cardImageContainer}>
          <Image source={getImageForId(item.imageId)} style={styles.cardImage} />
          <View style={styles.heartContainer}>
            <Heart 
              size={20} 
              color={inCollection ? '#ff5555' : '#fff'} 
              fill={inCollection ? '#ff5555' : 'transparent'}
            />
          </View>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.nombre}</Text>
          
          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>LANZAMIENTO</Text>
              <Text style={styles.infoValue}>{item.fecha_lanzamiento || 'N/A'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>METACRITIC</Text>
              <View style={[
                styles.metaScore, 
                { backgroundColor: item.puntuacion_metacritic >= 90 ? '#00ff88' : 
                                   item.puntuacion_metacritic >= 75 ? '#ffff00' : 
                                   item.puntuacion_metacritic > 0 ? '#ff5555' : '#666' }
              ]}>
                <Text style={[
                  styles.metaScoreText,
                  { color: item.puntuacion_metacritic >= 75 ? '#000' : '#fff' }
                ]}>
                  {item.puntuacion_metacritic || '--'}
                </Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>RATING</Text>
              <Text style={styles.ratingText}>
                ★ {item.rating ? item.rating.toFixed(1) : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Catalog')}
        >
          <ArrowLeft size={24} color="#00ff88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{platform}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar juegos..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {filteredGames.length} juego{filteredGames.length !== 1 ? 's' : ''} encontrado{filteredGames.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {filteredGames.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontraron juegos</Text>
          <Text style={styles.emptySubtext}>
            Intenta con una búsqueda diferente o verifica que la plataforma tenga juegos disponibles.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredGames}
          renderItem={renderGameCard}
          keyExtractor={(item) => `${item.id}-${item.platform}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#00ff88',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff88',
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  listContainer: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  gameCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
    width: '48%',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImageContainer: {
    position: 'relative',
    height: 120,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 6,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    minHeight: 40,
  },
  cardInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    color: '#00ff88',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  metaScore: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  metaScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 12,
    color: '#ffff00',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default PlatformGamesScreen;