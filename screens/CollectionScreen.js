import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Trash2, Plus, Minus, RotateCcw } from 'lucide-react-native';
import { useCollection } from '../contexts/CollectionContext';
import { getImageForId } from '../utils/imageMapper';

const CollectionScreen = ({ navigation }) => {
  const {
    collection,
    removeFromCollection,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCollection,
    getCollectionStats,
  } = useCollection();

  const [showStats, setShowStats] = useState(false);
  const stats = getCollectionStats();

  const handleQuantityChange = (uniqueId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      Alert.alert(
        'Eliminar juego',
        '¿Estás seguro de que quieres eliminar este juego de tu colección?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => removeFromCollection(uniqueId) },
        ]
      );
    } else {
      updateQuantity(uniqueId, newQuantity);
    }
  };

  const handleClearCollection = () => {
    Alert.alert(
      'Limpiar colección',
      '¿Estás seguro de que quieres eliminar todos los juegos de tu colección?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpiar', onPress: clearCollection, style: 'destructive' },
      ]
    );
  };

  const renderCollectionItem = ({ item }) => (
    <View style={styles.gameCard}>
      <TouchableOpacity
        style={styles.gameContent}
        onPress={() => navigation.navigate('GameDetail', { 
          game: {
            id: item.gameId,
            nombre: item.name,
            platform: item.platform,
            genero: item.genre,
            fecha_lanzamiento: item.year,
            rating: item.rating,
            puntuacion_metacritic: item.metacritic,
            // descripcion: item.description,
          },
          fromCollection: true // Indicar que viene de la colección
        })}
      >
        <Image source={getImageForId(item.gameId)} style={styles.gameImage} />
        <View style={styles.gameInfo}>
          <Text style={styles.gameName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.gamePlatform}>{item.platform}</Text>
          <Text style={styles.gamePrice}>${item.price}</Text>
          {item.genre ? (
            <Text style={styles.gameGenre}>{item.genre}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCollection(item.uniqueId)}
      >
        <Trash2 size={20} color="#ff5555" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyCollection = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Tu colección está vacía</Text>
      <Text style={styles.emptySubtitle}>
        Explora el catálogo y agrega juegos a tu colección
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('CatalogStack')}
      >
        <Text style={styles.exploreButtonText}>Explorar Catálogo</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Colección</Text>
        <View style={styles.headerActions}>
        </View>
      </View>

      {collection.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total items:</Text>
            <Text style={styles.summaryValue}>{getTotalItems()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Precio total:</Text>
            <Text style={styles.summaryPrice}>${getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
      )}

      {collection.length === 0 ? (
        renderEmptyCollection()
      ) : (
        <FlatList
          data={collection}
          renderItem={renderCollectionItem}
          keyExtractor={(item) => item.uniqueId}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff88',
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryContainer: {
    backgroundColor: '#111',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: 'bold',
  },
  summaryPrice: {
    fontSize: 18,
    color: '#ffff00',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  gameContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  gameImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  gamePlatform: {
    fontSize: 14,
    color: '#00ff88',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  gamePrice: {
    fontSize: 14,
    color: '#ffff00',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  gameGenre: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CollectionScreen;