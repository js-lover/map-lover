import { FlatList, StyleSheet, Text, View, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteHistoryComponent, SearchBar, LoadingComponent } from '../../../components';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { WorkoutHistoryService } from '@/services/workoutService';
import { useTheme } from '@/providers/ThemeProvider';


const history = () => {
  const { colors } = useTheme();
  const [filteredRoutes, setFilteredRoutes] = useState();
  const [allRoutes, setAllRoutes] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = (workoutId, workoutName) => {
    Alert.alert(
      'Yürüyüşü Sil',
      `"${workoutName}" kaydını silmek istediğinize emin misiniz?`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const result = await WorkoutHistoryService.deleteWorkout(workoutId);
              if (result.success) {
                // Listeyi güncelle
                await fetchUserWorkouts();
              } else {
                Alert.alert('Hata', 'Antrenman silinirken bir sorun oluştu.');
              }
            } catch (error) {
              console.error('Delete error:', error);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserWorkouts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchUserWorkouts();

  }, []);




  return (
    <SafeAreaView edges={['top']} style={[styles.viewContainer, { backgroundColor: colors.background }]}>
      <LoadingComponent visible={loading} />

      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: colors.text }]}>Yürüyüş Geçmişi</Text>
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
            tintColor={colors.primary}
            colors={[colors.primary]}

          />
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInLeft.duration(400).delay(index * 100)} style={styles.innerContainer}>
            <RouteHistoryComponent
              routeName={item.workout_name}
              date={item.created_at}
              distance={(item.distance / 1000).toFixed(2)}
              location={item.location}
              duration={item.duration}
              path={item.path}
              onDelete={() => handleDelete(item.id, item.workout_name)}
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
    letterSpacing: -0.5,
  },
});
