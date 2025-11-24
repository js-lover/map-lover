import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, Text } from '@ui-kitten/components';
import { SvgUri } from 'react-native-svg';
import { Image } from 'expo-image';
import { EvilIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
const RouteHistoryComponent = ({ routeName, date, distance, location, onPress }) => {
  return (
    <>
      <Card style={styles.card} onPress={onPress}>
        <View style={styles.viewStyle}>
          <View style={{ height: 70, width: 70, borderRadius: 20, overflow: 'hidden' }}>
            <Image style={styles.image} contentFit="cover" source="https://placehold.co/600x400" />
          </View>

          <View
            style={{
              display: 'flex',
              width: '200',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              gap: 2,
              overflow: 'hidden',
            }}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14 }} category="s1">
              {routeName}
            </Text>

            <Text style={{ fontSize: 10 }} category="c2">
              {distance}
            </Text>

            <Text style={{ fontSize: 10 }} category="c1">
              {date} / {location}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EvilIcons name="chevron-right" size={32} color="#0E7AFE" />
          </View>
        </View>
      </Card>
    </>
  );
};

export default RouteHistoryComponent;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 120,
    borderRadius: 20,
  },
  viewStyle: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 20,
  },

  image: {
    display: 'flex',
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
