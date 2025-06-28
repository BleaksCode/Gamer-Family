import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Heart, Plus, CheckCircle } from 'lucide-react-native';
import { useCollection } from '../contexts/CollectionContext';
import { getImageForId } from '../utils/imageMapper';

const GameDetailScreen = ({ route, navigation }) => {
  const { game, fromPlatform, fromCollection } = route.params;
  const { 
    addToCollection, 
    isGameInCollection, 
    getCollectionItem, 
    getGamePrice 
  } = useCollection();

  const inCollection = isGameInCollection(game.id, game.platform);
  const collectionItem = getCollectionItem(game.id, game.platform);

  const handleAddToCollection = () => {
    if (inCollection) {
      Alert.alert(
        'Ya en la colección',
        `${game.nombre} para ${game.platform} ya está en tu colección`,
        [{ text: 'OK' }]
      );
      return;
    }

    const success = addToCollection(game, game.platform);
    if (success) {
      Alert.alert(
        'Agregado a la colección',
        `${game.nombre} para ${game.platform} ha sido agregado a tu colección`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Error',
        'No se pudo agregar el juego a la colección',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBackPress = () => {
    if (fromCollection) {
      // Si viene de la colección, volver ahí
      navigation.navigate('Collection');
    } else if (fromPlatform && game.platform) {
      // Si viene de una pantalla de plataforma, volver ahí
      navigation.navigate('PlatformGames', { platform: game.platform });
    } else {
      // Si viene del catálogo o home, ir al catálogo
      navigation.navigate('Catalog');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <ArrowLeft size={24} color="#00ff88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del Juego</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Image 
          source={getImageForId(game.id)} 
          style={styles.coverImage} 
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{game.nombre}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>${getGamePrice(game.platform)}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>LANZAMIENTO</Text>
              <Text style={styles.infoValue}>{game.fecha_lanzamiento || 'N/A'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>METACRITIC</Text>
              <View style={[
                styles.metaScore, 
                { backgroundColor: game.puntuacion_metacritic >= 90 ? '#00ff88' : 
                                   game.puntuacion_metacritic >= 75 ? '#ffff00' : 
                                   game.puntuacion_metacritic > 0 ? '#ff5555' : '#666' }
              ]}>
                <Text style={[
                  styles.metaScoreText,
                  { color: game.puntuacion_metacritic >= 75 ? '#000' : '#fff' }
                ]}>
                  {game.puntuacion_metacritic || '--'}
                </Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>RATING</Text>
              <Text style={styles.ratingText}>
                ★ {game.rating ? game.rating.toFixed(1) : 'N/A'}
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PLATAFORMA ACTUAL</Text>
            <View style={styles.currentPlatformContainer}>
              <View style={styles.platformTag}>
                <Text style={styles.tagText}>{game.platform}</Text>
                <Text style={styles.storageText}>
                  {game.storage || '--'}
                </Text>
              </View>
            </View>
          </View>

          {game.plataformas && game.plataformas.length > 1 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>OTRAS PLATAFORMAS</Text>
              <View style={styles.tagsContainer}>
                {game.plataformas
                  .filter(platform => platform.nombre !== game.platform)
                  .map((platform, index) => (
                    <View key={index} style={styles.otherPlatformTag}>
                      <Text style={styles.otherTagText}>{platform.nombre}</Text>
                      <Text style={styles.otherStorageText}>
                        {platform.almacenamiento_gb ? `${platform.almacenamiento_gb}GB` : '--'}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          ) : null}

          {game.genero ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>GÉNERO</Text>
              <View style={styles.genreTag}>
                <Text style={styles.genreText}>{game.genero}</Text>
              </View>
            </View>
          ) : null}

          {game.descripcion ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>DESCRIPCIÓN</Text>
              <Text style={styles.descriptionText}>{game.descripcion}</Text>
            </View>
          ) : null}

          <View style={styles.actionContainer}>
            {inCollection ? (
              <View style={styles.inCollectionContainer}>
                <CheckCircle size={24} color="#00ff88" />
                <Text style={styles.inCollectionText}>
                  Ya en tu colección ({collectionItem?.quantity || 0})
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddToCollection}
              >
                <Plus size={24} color="#000" />
                <Text style={styles.addButtonText}>
                  Agregar a colección
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
    zIndex: 1,
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
  scrollContainer: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 16,
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  priceTag: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  metaScore: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  metaScoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 16,
    color: '#ffff00',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 12,
    letterSpacing: 1,
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  currentPlatformContainer: {
    alignItems: 'flex-start',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  platformTag: {
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#00ff88',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tagText: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  storageText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  otherPlatformTag: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  otherTagText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  otherStorageText: {
    fontSize: 12,
    color: '#666',
    opacity: 0.8,
  },
  genreTag: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#ffff00',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  genreText: {
    fontSize: 16,
    color: '#ffff00',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  actionContainer: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#00ff88',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  inCollectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#111',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00ff88',
  },
  inCollectionText: {
    fontSize: 18,
    color: '#00ff88',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default GameDetailScreen;