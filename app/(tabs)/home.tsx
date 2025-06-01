import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import HotelCard from '@/components/HotelCard';
import { HotelsAPI } from '@/src/api';
import { useNavigation } from '@react-navigation/native';

interface Hotel {
  id: number;
  name: string;
  ratings: { value: number }[];
  images: { link: string }[];
  nbBeds: number;
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await HotelsAPI.getAll();
        setHotels(hotelsData.slice(0, 10));
      } catch (err) {
        setError('Failed to fetch hotels');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {hotels.map(hotel => {
          const rating = hotel.ratings?.length > 0
            ? hotel.ratings.reduce((sum, r) => sum + r.value, 0) / hotel.ratings.length
            : 0;

          return (
            <HotelCard
              key={hotel.id}
              name={hotel.name}
              rating={rating}
              imageUrl={hotel.images?.[0]?.link}
              features={[`${hotel.nbBeds} beds`]}
              onPress={() => navigation.navigate('hotel', { id: hotel.id })}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

// ... rest of your styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default HomeScreen;