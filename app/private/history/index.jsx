import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteHistoryComponent, SearchBar } from '../../../components';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { WorkoutHistoryService } from '@/services/workoutService';


const history = () => {
  const [filteredRoutes, setFilteredRoutes] = useState();
  const [allRoutes, setAllRoutes] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = (text) => {
    const lowerText = text.toLowerCase();
    if (!lowerText) {
      setFilteredRoutes(allRoutes);
      return;
    }
    const filtered = allRoutes?.filter((route) => route.workout_name.toLowerCase().includes(lowerText));
    setFilteredRoutes(filtered);
  };


  async function fetchUserWorkouts() {
    const result = await WorkoutHistoryService.getUserWorkouts();
    if (result.success) {
      setAllRoutes(result.data);
      setFilteredRoutes(result.data);
    } else {
      console.error("Error fetching user workouts:", result.error);
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserWorkouts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchUserWorkouts();
    
  }, []);




  return (
    <SafeAreaView edges={['top']} style={styles.viewContainer}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Yürüyüş Geçmişi</Text>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar onChangeText={handleSearch} />
      </View>

      <FlatList
        data={filteredRoutes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#22c55e"
            colors={['#22c55e']}
          />
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInLeft.duration(400).delay(index * 100)} style={styles.innerContainer}>
            <RouteHistoryComponent
              routeName={item.workout_name}
              date={item.created_at}
              distance={(item.distance/1000).toFixed(2)}
              location={item.location}
              duration={item.duration}
              onPress={() => {
                router.navigate({
                  pathname: 'private/history/[routeId]',
                  params: {
                    routeId: item.id,
                    name: item.workout_name,
                    distance: item.distance,
                    location: item.location,
                    date: item.created_at,
                    steps: item.steps,
                    calories: item.calories,
                    path: item.path,
                    pace: item.pace,
                  },
                });
              }}
            />
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
};

export default history;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0f172a',
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  listContent: {
    paddingBottom: 100,
    gap: 16,
  },
  innerContainer: {
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
});
