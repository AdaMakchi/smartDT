import CulturalAttractionCard from '@/components/culturalAttractionCard';
import { CulturalAttractionsAPI } from '@/src/api';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';



interface CulturalAttraction {
  id: number;
  name: string;
  description: string;
  ratings: Array<{ value: number }>;
  images: Array<{ link: string }>;
  isFreeAccess: boolean;
  accessAmount: number;
  isKidsAllowed: boolean;
}

const CulturalAttractionsScreen = () => {
  const router = useRouter();
  const [attractions, setAttractions] = useState<CulturalAttraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const data = await CulturalAttractionsAPI.getAll();
        setAttractions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cultural attractions');
        console.error('Error fetching attractions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!attractions || attractions.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No cultural attractions found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cultural Attractions</Text>
      {attractions.map((attraction) => {
        // Calculate average rating
        const avgRating = attraction.ratings.length > 0 
          ? attraction.ratings.reduce((sum, rating) => sum + rating.value, 0) / attraction.ratings.length
          : undefined;

        return (
          <CulturalAttractionCard
            key={attraction.id}
            id={attraction.id}
            name={attraction.name}
            description={attraction.description}
            rating={avgRating}
            images={attraction.images[0]?.link}
            isFreeAccess={attraction.isFreeAccess}
            accessAmount={attraction.accessAmount}
            isKidsAllowed={attraction.isKidsAllowed}
            onPress={() => router.push(`/(hotel)/cultural/${attraction.id}`)}
              // Navigation or other action when card is pressed
             
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CulturalAttractionsScreen;