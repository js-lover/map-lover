import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AvatarComponent } from './';
import { useEffect } from 'react';

const UserInfoComponent = ({ username, memberDate }) => {
  return (
    <View style={styles.card1}>
      <AvatarComponent />
      <View>
        <Text style={{ fontWeight: 900, fontSize: 20 }}>{username}</Text>
        <Text style={{ fontWeight: 300, fontSize: 12, color: '#0E7AFE' }}>
          Member since {memberDate}
        </Text>
        <Text style={{ fontWeight: 300, fontSize: 12, color: '#0E7AFE' }}>Manisa</Text>
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
