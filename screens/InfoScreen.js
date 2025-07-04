import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Linking,
  Image,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { MapPin, Phone, Clock } from 'lucide-react-native';

const InfoScreen = () => {
  const consolesPrices = [
    { name: 'Nintendo DS', price: '25' },
    { name: 'Nintendo 3DS', price: '100' },
    { name: 'Nintendo Wii', price: '100' },
    { name: 'Nintendo WiiU', price: '150' },
    { name: 'Nintendo Switch', price: '200' },
    { name: 'XBOX 360', price: '150' },
    { name: 'PSP', price: '70' },
    { name: 'PS Vita', price: '100' },
    { name: 'Play Station 2', price: '100' },
    { name: 'Play Station 3', price: '150' },
    { name: 'Play Station 4', price: '200' },
  ];

  const pirateriaData = [
    { console: 'Nintendo DS', games: '700' },
    { console: 'Nintendo 3DS', games: '1500' },
    { console: 'Nintendo Wii', games: '1000' },
    { console: 'Nintendo WiiU', games: '1500' },
    { console: 'Nintendo Switch', games: '2000' },
    { console: 'XBOX 360', games: '5000' },
    { console: 'PSP', games: '700' },
    { console: 'PS Vita', games: '1500' },
    { console: 'Play Station 2', games: '1000' },
    { console: 'Play Station 3', games: '1500' },
    { console: 'Play Station 4', games: '2000' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gamer Family</Text>
        <Text style={styles.headerSubtitle}>Tu tienda de videojuegos</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN DE CONTACTO</Text>
          
          <View style={styles.infoItem}>
            <MapPin size={24} color="#00ff88" />
            <Text style={styles.infoText}>Industria 131A % San José y San Martín</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Phone size={24} color="#00ff88" />
            <View style={styles.phoneContainer}>
              <TouchableOpacity onPress={() => Linking.openURL('tel:+5356750186')}>
                <Text style={[styles.infoText, styles.linkText]}>+53 56750186</Text> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('tel:+5355446261')}>
                <Text style={[styles.infoText, styles.linkText]}>+53 55446261</Text> 
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={24} color="#00ff88" />
            <Text style={styles.infoText}>Lun-Sáb: 10:00 AM - 20:00 PM, Dom: Cerrado</Text>
          </View>
        </View>

        {/* Sección de Promoción 5+1 */}
        <View style={styles.promoSection}>
          <View style={styles.promoContainer}>
            <Text style={styles.promoTitle}>PROMO</Text>
            <Text style={styles.promoSubtitle}>5 + 1</Text>
          </View>
        </View>

        {/* Sección de Precios de Consolas */}
        <View style={styles.pricesSection}>
          <Text style={styles.juegosTitle}>PRECIOS DE JUEGOS</Text>
          <View style={styles.pricesContainer}>
            {consolesPrices.map((item, index) => (
              <View key={index} style={styles.priceRow}>
                <Text style={styles.consoleName}>{item.name}</Text>
                <Text style={styles.consolePrice}>${item.price}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sección de Mensaje de Piratería */}
        <View style={styles.pirateriaPromoSection}>
          <Text style={styles.pirateriaPromoText}>
            La Piratería se da con 3 Juegos Gratis!
          </Text>
        </View>

        {/* Sección de Datos de Piratería */}
        <View style={styles.pirateriaSection}>
          <Text style={styles.pirateriaTitle}>PRECIOS DE PIRATERIAS</Text>
          <View style={styles.pirateriaContainer}>
            <View style={styles.pirateriaColumn}>
              {pirateriaData.map((item, index) => (
                <View key={index} style={styles.pirateriaRow}>
                  <Text style={styles.consoleName}>{item.console}</Text>
                </View>
              ))}
            </View>

            <View style={styles.pirateriaColumn}>
              {pirateriaData.map((item, index) => (
                <View key={index} style={styles.pirateriaRow}>
                  <Text style={styles.pirateriaPrice}>${item.games}</Text>
                </View>
              ))}
            </View>
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
    justifyContent: 'center',
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
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    margin: 16,
    backgroundColor: '#111',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  juegosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  pirateriaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff00',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#ffff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#00ff88',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
  phoneContainer: {
    marginLeft: 12,
    flex: 1,
  },
  linkText: {
    color: '#00ffff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    marginBottom: 4,
  },
  promoSection: {
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 20,
    backgroundColor: '#111',
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
  promoContainer: {
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 8,
  },
  promoSubtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ffff',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  pricesSection: {
    margin: 16,
    backgroundColor: '#111',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff88',
    padding: 16,
  },
  pricesContainer: {
    paddingHorizontal: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
    borderRadius: 6,
  },
  consoleName: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  consolePrice: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: 'bold',
  },
  pirateriaPromoSection: {
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 20,
    backgroundColor: '#111',
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
  pirateriaPromoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ffff',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    textAlign: 'center'
  },
  pirateriaSection: {
    margin: 16,
    backgroundColor: '#111',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffff00',
    padding: 16,
  },
  pirateriaContainer: {
    flexDirection: 'row',
  },
  pirateriaColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  pirateriaRow: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 2,
    borderRadius: 4,
    minHeight: 32,
    justifyContent: 'center',
  },
  pirateriaPrice: {
    fontSize: 16,
    color: '#ffff00',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 3,
  },
});

export default InfoScreen;