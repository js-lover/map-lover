import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteHistoryComponent, SearchBar } from '../../../components';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { router } from 'expo-router';
import routesData from '../../../data/routes';
import { useState } from 'react';

const history = () => {
  const [filteredRoutes, setFilteredRoutes] = useState(routesData);

  const handleSearch = (text) => {
    const lowerText = text.toLowerCase();
    const filtered = routesData.filter((route) => route.name.toLowerCase().includes(lowerText));
    setFilteredRoutes(filtered);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.viewContainer}>
      <View style={{ display: 'flex', width: '100%', marginBottom: 20 }}>
        <SearchBar onChangeText={handleSearch} />
      </View>

      <View style={{ display: 'flex', width: '100%', height: '100%' }}>
        <FlatList
          data={filteredRoutes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInLeft.duration(500)} style={styles.innerContainer}>
              <RouteHistoryComponent
                routeName={item.name}
                date={item.date}
                distance={item.distance}
                location={item.location}
                onPress={() => {
                  router.navigate({
                    pathname: 'private/history/[routeId]',
                    params: {
                      routeId: item.id,
                      name: item.name,
                      distance: item.distance,
                      location: item.location,
                      date: item.date,
                      steps: item.steps,
                      calories: item.calories,
                    },
                  });
                }}
              />
            </Animated.View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default history;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
  },
  innerContainer: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
