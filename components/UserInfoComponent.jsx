import { StyleSheet, View, Text } from 'react-native';
import { AvatarComponent } from './';

const UserInfoComponent = () => {
  return (
    <View style={styles.card1}>
      <AvatarComponent />
      <View>
        <Text style={{ fontWeight: 900, fontSize: 22 }}>Username</Text>
        <Text style={{ fontWeight: 200, color: '#0E7AFE',fontSize: 10 }}>Member since 2022</Text>
        <Text style={{ fontWeight: 300, color: '#0E7AFE' ,fontSize: 10}}>Manisa</Text>
      </View>
    </View>
  );
};

export default UserInfoComponent;

const styles = StyleSheet.create({
  card1: {
    width: '90%',
    height: 140,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    gap: 20,
    backgroundColor: '#fbfbfb',
  },
});
