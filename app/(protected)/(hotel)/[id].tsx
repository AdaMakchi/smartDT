import { HotelsAPI } from '@/src/api';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Hotel {
  id: string;
  name: string;
  description: string;
  nbBeds: number;
  ratings: {
    value: number;
  }[];
  images: {
    link: string;
    title: string;
  }[];
}

const { width: screenWidth } = Dimensions.get('window');

const HotelDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Customize header - simplified with just back button
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Empty title
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      ),
      headerRight: () => null, // No right button
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerShadowVisible: true,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        if (!id) {
          throw new Error('No hotel ID provided');
        }

        const hotelId = Array.isArray(id) ? id[0] : id;
        const hotelData = await HotelsAPI.getById(parseInt(hotelId));
        setHotel(hotelData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hotel details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.container}>
        <Text>No hotel data found</Text>
      </View>
    );
  }

  const averageRating = hotel.ratings.length > 0
    ? hotel.ratings.reduce((sum, rating) => sum + rating.value, 0) / hotel.ratings.length
    : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hotel Name */}
      {/* <Text style={styles.title}>{hotel.name}</Text> */}

      {/* Image Gallery */}
      {hotel.images?.length > 0 && (
        <View style={styles.imageContainer}>
          <FlatList
            data={hotel.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.link}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.link }}
                style={[styles.hotelImage, { width: screenWidth }]}
                resizeMode="cover"
              />
            )}
          />
        </View>
      )}

      {/* Hotel Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.detailText}>
            Rating: {averageRating.toFixed(1)}/5
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="bed" size={20} color="#007AFF" />
          <Text style={styles.detailText}>
            Beds: {hotel.nbBeds}
          </Text>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{hotel.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerButton: {
    marginLeft: 16,
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  imageContainer: {
    height: 250,
    marginBottom: 16,
  },
  hotelImage: {
    height: 250,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HotelDetailScreen;