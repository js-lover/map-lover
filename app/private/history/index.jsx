import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteHistoryComponent } from '../../../components';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import routes from '../../../data/routes';

const history = () => {
  return (
      <View style={styles.viewContainer}>
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInLeft.duration(500)} style={styles.innerContainer}>
              <RouteHistoryComponent
                routeName={item.name}
                date={item.date}
                distance={item.distance}
                location={item.location}
                onPress={() => {
                  console.log('tıklandı: ', item.id);
                  router.navigate({
                    pathname:'private/history/[routeId]',
                    params: {
                      routeId: item.id , 
                      name: item.name,
                      distance: item.distance,
                      location: item.location,
                      date : item.date,
                      steps: item.steps,
                      calories: item.calories
                    }
                  })
                }}
              />
            </Animated.View>
          )}
        />
      </View>
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
    paddingTop: 0,
    borderWidth:2
  },
  innerContainer: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
