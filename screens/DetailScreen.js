// src/screens/DetailScreen.jsx
import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { getImageForId } from '../utils/imageMapper';
import { styles, getMetaScoreColor } from './DetailScreen.styles';

const DetailScreen = ({ route }) => {
  const { game } = route.params;
  const metaColor = getMetaScoreColor(game.metacritic);

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={getImageForId(game.id)} 
        style={styles.coverImage} 
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={[styles.metaScore, { backgroundColor: metaColor }]}>
            <Text style={styles.metaScoreText}>{game.metacritic}</Text>
          </View>
          <Text style={styles.rating}>★ {game.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Fecha de lanzamiento</Text>
        <Text style={styles.sectionText}>{game.released}</Text>

        <Text style={styles.sectionTitle}>Géneros</Text>
        <View style={styles.tagsContainer}>
          {game.genres.map((genre, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{genre}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Plataformas</Text>
        <View style={styles.tagsContainer}>
          {game.platforms.map((platform, i) => (
            <View key={i} style={styles.platformTag}>
              <Text style={styles.tagText}>{platform}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
