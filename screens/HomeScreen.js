import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Search, Heart } from 'lucide-react-native';
import { useCollection } from '../contexts/CollectionContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { getTotalItems } = useCollection();

  const featuredPlatforms = [
    {
      id: 1,
      name: 'Nintendo Switch',
      image: require('../assets/nintendo-switch.jpg'),
      color: '#e60012',
    },
    {
      id: 2,
      name: 'PlayStation 4',
      image: require('../assets/ps4.jpg'),
      color: '#003087',
    },
    {
      id: 3,
      name: 'Xbox 360',
      image: require('../assets/xbox360.jpg'),
      color: '#107c10',
    },
    {
      id: 4,
      name: 'PlayStation3',
      image: require('../assets/ps3.jpg'),
      color: '#003087',
    },
  ];

  const handlePlatformPress = (platformName) => {
    // Navegar directamente a PlatformGames con reset del stack
    navigation.navigate('CatalogStack', {
      screen: 'PlatformGames',
      params: { platform: platformName },
      initial: false
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.placeholder} />
        <Text style={styles.headerTitle}>Gamer Family</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bienvenido a tu tienda de videojuegos</Text>
          <Text style={styles.welcomeSubtitle}>
            Descubre los mejores juegos para todas las plataformas
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plataformas Destacadas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                style={[styles.platformCard, { borderColor: platform.color }]}
                onPress={() => handlePlatformPress(platform.name)}
              >
                <Image source={platform.image} style={styles.platformImage} />
                <Text style={styles.platformName}>{platform.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('CatalogStack')}
            >
              <Search size={32} color="#00ff88" />
              <Text style={styles.actionText}>Explorar Catálogo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('CollectionStack')}
            >
              <Heart size={32} color="#00ff88" />
              <Text style={styles.actionText}>Mi Colección</Text>
              {getTotalItems() > 0 && (
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>{getTotalItems()}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.promoSection}>
          <View style={styles.promoCard}>
            <Text style={styles.promoTitle}>PROMO ESPECIAL</Text>
            <Text style={styles.promoText}>5 + 1</Text>
            <Text style={styles.promoSubtext}>¡Cada 5 juegos lleva 1 Gratis!</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#00ff88',
  },
  placeholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff88',
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff5555',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#111',
    margin: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 16,
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  platformCard: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
    borderWidth: 2,
  },
  platformImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  platformName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  actionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff5555',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  promoSection: {
    padding: 16,
    alignItems: 'center',
  },
  promoCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00ffff',
    width: '100%',
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  promoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  promoSubtext: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;