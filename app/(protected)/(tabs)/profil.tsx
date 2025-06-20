import CulturalAttractionCard from '@/components/culturalAttractionCard';
import { CulturalAttractionsAPI, PhysicalAttractionsAPI } from '@/src/api';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let PhysicalAttractionCard = CulturalAttractionCard;


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

interface PhysicalAttraction {
   id: number;
  name: string;
  description: string;
  ratings: Array<{ value: number }>;
  images: Array<{ link: string }>;
  isFreeAccess: boolean;
  accessAmount: number;
  isKidsAllowed: boolean;
}

const AttractionsScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cultural' | 'physical'>('cultural');
  const [culturalAttractions, setCulturalAttractions] = useState<CulturalAttraction[]>([]);
  const [physicalAttractions, setPhysicalAttractions] = useState<PhysicalAttraction[]>([]);
  const [loading, setLoading] = useState({
    cultural: true,
    physical: true
  });
  const [error, setError] = useState({
    cultural: null as string | null,
    physical: null as string | null
  });

  useEffect(() => {
    const fetchCulturalAttractions = async () => {
      try {
        const data = await CulturalAttractionsAPI.getAll();
        setCulturalAttractions(data);
      } catch (err) {
        setError(prev => ({
          ...prev,
          cultural: err instanceof Error ? err.message : 'Failed to fetch cultural attractions'
        }));
        console.error('Error fetching cultural attractions:', err);
      } finally {
        setLoading(prev => ({
          ...prev,
          cultural: false
        }));
      }
    };

    const fetchPhysicalAttractions = async () => {
      try {
        const data = await PhysicalAttractionsAPI.getAll();
        setPhysicalAttractions(data);
      } catch (err) {
        setError(prev => ({
          ...prev,
          physical: err instanceof Error ? err.message : 'Failed to fetch physical attractions'
        }));
        console.error('Error fetching physical attractions:', err);
      } finally {
        setLoading(prev => ({
          ...prev,
          physical: false
        }));
      }
    };

    fetchCulturalAttractions();
    fetchPhysicalAttractions();
  }, []);

  const renderContent = () => {
    if (activeTab === 'cultural') {
      if (loading.cultural) {
        return (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

      if (error.cultural) {
        return (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error.cultural}</Text>
          </View>
        );
      }

      if (!culturalAttractions || culturalAttractions.length === 0) {
        return (
          <View style={styles.center}>
            <Text>No cultural attractions found</Text>
          </View>
        );
      }

      return (
        <ScrollView>
          {culturalAttractions.map((attraction) => {
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
              />
            );
          })}
        </ScrollView>
      );
    } else {
      if (loading.physical) {
        return (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

      if (error.physical) {
        return (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error.physical}</Text>
          </View>
        );
      }

      if (!physicalAttractions || physicalAttractions.length === 0) {
        return (
          <View style={styles.center}>
            <Text>No physical attractions found</Text>
          </View>
        );
      }

      return (
        <ScrollView>
          {physicalAttractions.map((attraction) => {
            const avgRating = attraction.ratings.length > 0 
              ? attraction.ratings.reduce((sum, rating) => sum + rating.value, 0) / attraction.ratings.length
              : undefined;

            return (
              <PhysicalAttractionCard
                key={attraction.id}
                id={attraction.id}
                name={attraction.name}
                description={attraction.description}
                rating={avgRating}
                images={attraction.images[0]?.link}
                isFreeAccess={attraction.isFreeAccess}
                accessAmount={attraction.accessAmount}
                isKidsAllowed={attraction.isKidsAllowed}
                onPress={() => router.push(`/(hotel)/physical/${attraction.id}`)}
                // Add other physical attraction specific props as needed
              />
            );
          })}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cultural' && styles.activeTab]}
          onPress={() => setActiveTab('cultural')}
        >
          <Text style={[styles.tabText, activeTab === 'cultural' && styles.activeTabText]}>Cultural</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'physical' && styles.activeTab]}
          onPress={() => setActiveTab('physical')}
        >
          <Text style={[styles.tabText, activeTab === 'physical' && styles.activeTabText]}>Physical</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
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
});

export default AttractionsScreen;