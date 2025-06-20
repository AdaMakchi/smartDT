


import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const HotelCard = ({ name, rating, imageUrl, features, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageUrl || 'https://via.placeholder.com/300x200' }}
          style={styles.hotelImage}
        />

        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{rating?.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.type}>Hôtel</Text>

          <View style={styles.features}>
            {features?.map((feature, index) => (
              <Text key={index} style={styles.feature}>{feature}</Text>
            ))}
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
  hotelImage: {
    width: '100%',
    height: 150,
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
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  feature: {
    fontSize: 12,
    color: '#555',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default HotelCard;