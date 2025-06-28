import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
// Importamos los colores desde el archivo de constantes
import { COLORS } from '../constants/colors';
import gamesData from '../assets/test.json';

const CatalogScreen = ({ navigation }) => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Precios fijos por plataforma
  const platformPrices = {
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

  // Función para obtener imagen de plataforma
  const getPlatformImage = (platformName) => {
    const imageMap = {
      'Nintendo Switch': require('../assets/nintendo-switch.jpg'),
      'PlayStation 4': require('../assets/ps4.jpg'),
      'Xbox 360': require('../assets/xbox360.jpg'),
      'Nintendo 3DS': require('../assets/3ds.png'),
      'Nintendo DS': require('../assets/ds.png'),
      'Wii': require('../assets/wii.jpg'),
      'Wii U': require('../assets/wiiu.png'),
      'PSP': require('../assets/psp.jpg'),
      'PS Vita': require('../assets/psvita.png'),
      'PlayStation 2': require('../assets/ps2.jpg'),
      'PlayStation 3': require('../assets/ps3.jpg'),
    };
    
    try {
      return imageMap[platformName] || require('../assets/default-console.jpg');
    } catch (error) {
      // Si no encuentra la imagen, usar un placeholder
      return { uri: 'https://via.placeholder.com/60x60/333/fff?text=?' };
    }
  };

  useEffect(() => {
    // Extraer todas las plataformas únicas de los juegos
    const allPlatforms = [];
    gamesData.juegos.forEach(game => {
      game.plataformas.forEach(platform => {
        if (!allPlatforms.includes(platform.nombre)) {
          allPlatforms.push(platform.nombre);
        }
      });
    });
    
    // Ordenar alfabéticamente
    allPlatforms.sort();
    
    // Crear un objeto con el recuento de juegos por plataforma y precios fijos
    const platformsWithCount = allPlatforms.map(platform => {
      const gamesCount = gamesData.juegos.filter(game => 
        game.plataformas.some(p => p.nombre === platform)
      ).length;
      
      // Obtener el precio de la plataforma o usar un precio por defecto
      const price = platformPrices[platform] || 150.00;
      
      return {
        name: platform,
        count: gamesCount,
        price: price,
        image: getPlatformImage(platform)
      };
    });
    
    setPlatforms(platformsWithCount);
    setLoading(false);
  }, []);

  const renderPlatformItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.platformCard}
      onPress={() => navigation.navigate('PlatformGames', { 
        platform: item.name,
        price: item.price
      })}
    >
      <Image source={item.image} style={styles.platformImage} />
      <View style={styles.platformInfo}>
        <Text style={styles.platformName}>{item.name}</Text>
        <Text style={styles.platformCount}>{item.count} juegos</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
        <Text style={styles.priceSubtext}>por juego</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ffff" />
        <Text style={styles.loadingText}>Cargando plataformas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <ArrowLeft size={24} color="#00ff88" />
        </TouchableOpacity>
        <Text style={styles.headerText}>SELECCIONA UNA PLATAFORMA</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        data={platforms}
        renderItem={renderPlatformItem}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.listContainer}
      />
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
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#00ffff',
    marginTop: 10,
    fontSize: 16,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  listContainer: {
    padding: 16,
  },
  platformCard: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  platformImage: {
    width: 50,
    height: 50,
    marginRight: 12,
    resizeMode: 'contain',
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  platformCount: {
    fontSize: 14,
    color: '#aaa',
  },
  priceContainer: {
    backgroundColor: '#00ff88',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  priceSubtext: {
    fontSize: 12,
    color: '#000',
  },
});

export default CatalogScreen;