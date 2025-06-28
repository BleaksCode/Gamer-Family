// src/screens/HomeScreen.styles.js
import { StyleSheet } from 'react-native';

// Define una paleta de colores para mejor mantenibilidad
const colors = {
  backgroundPrimary: '#121212',   // Fondo principal
  backgroundSecondary: '#1a1a1a', // Fondo de secciones (búsqueda, géneros)
  backgroundTertiary: '#1e1e1e',  // Fondo de tarjetas (gameCard)
  backgroundInput: '#333',       // Fondo de input y tags no seleccionados
  textPrimary: '#fff',           // Texto principal (blanco)
  textSecondary: '#aaa',         // Texto secundario (gris claro, como fecha)
  textTertiary: '#999',         // Texto terciario (gris más oscuro, como emptyText)
  textDark: '#000',             // Texto oscuro (para fondos claros como metaScore)
  accentPrimary: '#e63946',      // Color de acento (género seleccionado)
  accentSecondary: '#fc3',       // Color de acento secundario (rating amarillo)
  metascoreGood: '#6c3',         // Metascore Verde (ejemplo > 75)
  metascoreAverage: '#fc3',      // Metascore Amarillo (ejemplo 50-74)
  metascoreBad: '#f00',          // Metascore Rojo (ejemplo < 50)
  shadow: '#000',                // Color de sombra
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  searchContainer: {
    padding: 12,
    backgroundColor: colors.backgroundSecondary,
  },
  searchInput: {
    backgroundColor: colors.backgroundInput,
    color: colors.textPrimary,
    paddingHorizontal: 15, // Un poco más de padding horizontal
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  genreContainer: {
    paddingVertical: 12, // Padding vertical para el contenedor
    paddingLeft: 12,     // Padding izquierdo para el inicio de la lista horizontal
    backgroundColor: colors.backgroundSecondary,
    height: 32,
    // alignItems: 'center', // Descomentar si la altura del contenedor es fija y quieres centrar la fila de tags verticalmente
  },
  genreTag: {
    backgroundColor: colors.backgroundInput,
    borderRadius: 20,
    marginRight: 8,
    paddingVertical: 6,   // Puedes mantener o ajustar/eliminar si usas height
    paddingHorizontal: 14,
    height: 32, // <--- AÑADE ESTO (ajusta el valor según tu diseño)
    justifyContent: 'center', // Ya estaba, bueno para centrar verticalmente con height fijo
    alignItems: 'center',     // Ya estaba, bueno para centrar horizontalmente
  },
  selectedGenre: {
    backgroundColor: colors.accentPrimary, // Usa el color de acento
  },
  genreText: {
    color: colors.textPrimary,
    fontWeight: '500',
    fontSize: 14, // Tamaño más típico para tags
    // textAlign: 'center', // Puedes usar esto o alignItems/justifyContent en genreTag
  },
  listContainer: {
    padding: 12,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    overflow: 'hidden', // Mantiene la imagen dentro de los bordes redondeados
    marginBottom: 16,
    // Sombras (buenas prácticas incluir ambos)
    elevation: 3,        // Android
    shadowColor: colors.shadow, // iOS
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowOpacity: 0.2, // iOS - Reducida un poco para ser más sutil
    shadowRadius: 4,    // iOS
  },
  gameCover: {
    width: 100, // Ligeramente más pequeño, ajustar según diseño
    height: 140, // Manteniendo proporción ~3:4
  },
  gameInfo: {
    flex: 1, // Ocupa el espacio restante
    padding: 12,
    justifyContent: 'space-between', // Empuja el contenido hacia arriba y abajo
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  // Estilo base para el contenedor de Metascore
  metaScoreContainer: {
    borderRadius: 4,
    paddingVertical: 3,    // Padding ajustado
    paddingHorizontal: 6, // Padding ajustado
    marginRight: 8,
    minWidth: 30, // Asegura un ancho mínimo para que se vea bien con 1 o 3 dígitos
    alignItems: 'center', // Centra el texto dentro
    justifyContent: 'center', // Centra el texto dentro
  },
  // EJEMPLO: Estilos dinámicos para Metascore (deberías aplicarlos condicionalmente en tu componente)
  metaScoreGood: {
    backgroundColor: colors.metascoreGood,
  },
  metaScoreAverage: {
    backgroundColor: colors.metascoreAverage,
  },
  metaScoreBad: {
    backgroundColor: colors.metascoreBad,
  },
  metaScoreText: {
    color: colors.textDark, // Texto oscuro para fondos claros/coloridos
    fontWeight: 'bold',
    fontSize: 14,
  },
  ratingText: {
    color: colors.accentSecondary, // Usando color de acento amarillo/dorado
    fontSize: 14,
    fontWeight: 'bold', // Añadido para consistencia con metascore
  },
  releaseDate: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  // Contenedor para cuando no hay resultados o datos
  emptyContainer: {
    flex: 1,                 // Ocupa el espacio disponible en su contenedor padre (ej. FlatList)
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',     // Centra horizontalmente
    padding: 20,
  },
  emptyText: {
    color: colors.textTertiary,
    fontSize: 16,
    textAlign: 'center', // Buen hábito para textos multilínea
  },
});