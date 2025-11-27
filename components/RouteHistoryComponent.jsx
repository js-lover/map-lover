import { StyleSheet, TouchableOpacity, View ,Text} from 'react-native';
import { Image } from 'expo-image';
import { EvilIcons } from '@expo/vector-icons';
const RouteHistoryComponent = ({ routeName, date, distance, location, onPress }) => {
  return (

      <View style={styles.card} >

        


        <TouchableOpacity onPress={onPress} style={styles.viewStyle}>
          <View style={{ height: 80, width: 80, borderRadius: 20, marginRight:10,overflow: 'hidden' , borderWidth:1}}>
            <Image style={styles.image} contentFit="cover" source="https://placehold.co/600x400" />
          </View>

          <View
            style={{
              display: 'flex',
              width: '230',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap:8,
              overflow: 'hidden',
            }}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, fontWeight:600 }} >
              {routeName}
            </Text>

            <Text style={{ fontSize: 12 , fontWeight:200}} >
              {distance}
            </Text>

            <Text style={{ fontSize: 12, fontWeight:200 }}>
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
        </TouchableOpacity>
      </View>

  );
};

export default RouteHistoryComponent;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '98%',
    height: 120,
    borderRadius: 20,
    borderWidth:0.5,
    borderColor:"#0E7AFE",
    paddingHorizontal:8
  },
  viewStyle: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
    
  },

  image: {
    display: 'flex',
    flex: 1,
    
    
  },
});
