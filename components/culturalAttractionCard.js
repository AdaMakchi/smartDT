import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

type CulturalAttractionCardProps = {
  id: number;
  name: string;
  description?: string;
  rating?: number; // Average rating
  images?: string; // First image link
  isFreeAccess: boolean;
  accessAmount?: number;
  isKidsAllowed: boolean;
  onPress?: () => void;
};

const CulturalAttractionCard = ({
  id,
  name,
  description,
  rating,
  images,
  isFreeAccess,
  accessAmount,
  isKidsAllowed,
  onPress
}: CulturalAttractionCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image
          source={{ uri: images || 'https://via.placeholder.com/300x200' }}
          style={styles.image}
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />

        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            {rating !== undefined && (
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{rating.toFixed(1)}</Text>
              </View>
            )}
          </View>

          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}

          <Text style={styles.type}>Cultural Attraction</Text>

          <View style={styles.priceAndKids}>
            <Text style={styles.price}>
              {isFreeAccess ? 'Free' : `$${accessAmount?.toFixed(2) || '0.00'}`}
            </Text>
            <Text style={styles.kidsInfo}>
              {isKidsAllowed ? '👶 Kids allowed' : '🚫 Not for kids'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  details: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    backgroundColor: '#FFA500',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  rating: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceAndKids: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  kidsInfo: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default CulturalAttractionCard;