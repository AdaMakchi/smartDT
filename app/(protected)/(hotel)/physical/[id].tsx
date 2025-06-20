import { PhysicalAttractionsAPI } from '@/src/api';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';

let CulturalAttractionsAPI = PhysicalAttractionsAPI;

import {
    ActivityIndicator,
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Safe imports for optional native modules
let Share;
let Carousel;

try {
  Share = require('react-native-share').default;
} catch (e) {
  console.warn('Share module not available');
}

try {
  Carousel = require('react-native-snap-carousel').default;
} catch (e) {
  console.warn('Carousel module not available');
}

interface Rating {
  value: number;
}

interface AttractionImage {
  link: string;
  title?: string;
}

interface CulturalAttraction {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  ratings: Rating[];
  images: AttractionImage[];
  isFreeAccess: boolean;
  accessAmount: number;
  isKidsAllowed: boolean;
}

const MapSection = ({ latitude, longitude, name }: { latitude: number; longitude: number; name: string }) => {
  const handleOpenMaps = () => {
    const url = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <TouchableOpacity onPress={handleOpenMaps} accessibilityLabel="View location on map">
      <View style={styles.mapPlaceholder}>
        <Icon name="map" size={40} color="#3F51B5" />
        <Text style={styles.mapText}>View on OpenStreetMap</Text>
        <Text style={styles.coordinates}>
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CulturalAttractionDetail = () => {
  const { id } = useLocalSearchParams();
  const [attraction, setAttraction] = useState<CulturalAttraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        if (!id) {
          throw new Error('No attraction ID provided');
        }
        
        const numericId = Number(id);
        if (isNaN(numericId)) {
          throw new Error('Invalid attraction ID');
        }

        const data = await CulturalAttractionsAPI.getById(numericId);
        setAttraction(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch attraction details');
      } finally {
        setLoading(false);
      }
    };

    fetchAttraction();
  }, [id]);

  const avgRating = React.useMemo(() => {
    if (!attraction?.ratings.length) return 0;
    return attraction.ratings.reduce((sum, rating) => sum + rating.value, 0) / attraction.ratings.length;
  }, [attraction?.ratings]);

  const renderImageItem = ({ item }: { item: AttractionImage }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item.link || 'https://via.placeholder.com/300x200' }}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel={item.title || 'Attraction image'}
      />
      {item.title && <Text style={styles.imageTitle}>{item.title}</Text>}
    </View>
  );

  const handleShare = async () => {
    if (!Share || !attraction) return;
    
    try {
      await Share.open({
        title: `Check out ${attraction.name}`,
        message: `${attraction.name}: ${attraction.description.substring(0, 100)}...`,
        url: attraction.images[0]?.link || '',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error" size={40} color="#FF5722" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!attraction) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="warning" size={40} color="#FFC107" />
        <Text style={styles.errorText}>Attraction not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Image Carousel with fallback */}
      {Carousel ? (
        <View style={styles.carouselContainer}>
          <Carousel
            data={attraction.images}
            renderItem={renderImageItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={setActiveSlide}
          />
          {attraction.images.length > 1 && (
            <View style={styles.pagination}>
              <Text style={styles.paginationText}>
                {activeSlide + 1}/{attraction.images.length}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.carouselContainer}>
          {renderImageItem({ item: attraction.images[0] || { link: '' } })}
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{attraction.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>
              {avgRating.toFixed(1)} ({attraction.ratings.length} reviews)
            </Text>
          </View>
        </View>

        {/* Price & Kids Info */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Icon
              name={attraction.isFreeAccess ? "money-off" : "attach-money"}
              size={20}
              color={attraction.isFreeAccess ? "#4CAF50" : "#FF5722"}
            />
            <Text style={styles.metaText}>
              {attraction.isFreeAccess ? 'Free' : `$${attraction.accessAmount.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Icon
              name={attraction.isKidsAllowed ? "child-friendly" : "child-care"}
              size={20}
              color={attraction.isKidsAllowed ? "#4CAF50" : "#F44336"}
            />
            <Text style={styles.metaText}>
              {attraction.isKidsAllowed ? 'Kids Allowed' : 'Not for Kids'}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{attraction.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <MapSection 
            latitude={attraction.latitude} 
            longitude={attraction.longitude} 
            name={attraction.name} 
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => Linking.openURL(
              `https://www.openstreetmap.org/?mlat=${attraction.latitude}&mlon=${attraction.longitude}#map=15/${attraction.latitude}/${attraction.longitude}`
            )}
          >
            <Icon name="directions" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>View Map</Text>
          </TouchableOpacity>
          
          {Share && (
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Icon name="share" size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  carouselContainer: {
    position: 'relative',
  },
  slide: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  paginationText: {
    color: 'white',
    fontSize: 12,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 5,
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapPlaceholder: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mapText: {
    marginTop: 8,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  coordinates: {
    marginTop: 4,
    color: '#666',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default CulturalAttractionDetail;