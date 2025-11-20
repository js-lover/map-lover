import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, Text } from '@ui-kitten/components';
import  { SvgUri } from 'react-native-svg';
import { Image } from 'expo-image';
import { EvilIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
const RouteHistoryComponent = () => {
  return (
    <>
      <Card style={styles.card}  >
        <View style={styles.viewStyle}>
          <View style={{ height: 100, width: 100, borderRadius: 20, overflow: 'hidden'}}>
            <Image
              style={styles.image}
              contentFit="cover"
              source="https://placehold.co/600x400"
            />
          </View>

          <View style={{ display: 'flex', width:"40%", height:"100%" ,flexDirection: 'column', gap: 5}}>
            <Text category="h6" >
              Route Name
            </Text>
           
            <Text category='s1'>
                3,7 km
            </Text>
           
            <Text category='c2'>
                25.06.2025
            </Text>
            <Text category='c1'>
                Adana,Türkiye
            </Text>

          </View>

            <View style={{display:"flex", width:"20%", height:"100%",  justifyContent:"center", alignItems:"center"}}>

           <EvilIcons name="chevron-right" size={32} color="#0E7AFE"  />
            </View>



        </View>
      </Card>
    </>
  );
};

export default RouteHistoryComponent;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    
  },
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap:20
  },

  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
