// src/screens/DetailScreen.styles.js
import { StyleSheet } from 'react-native';

// Función para lógica de color
export function getMetaScoreColor(score) {
  if (score >= 90) return '#6c3';
  if (score >= 75) return '#fc3';
  return '#f55';
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaScore: {
    borderRadius: 4,
    padding: 8,
    marginRight: 12,
  },
  metaScoreText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  rating: {
    color: '#fc3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#e63946',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  platformTag: {
    backgroundColor: '#4361ee',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
});
