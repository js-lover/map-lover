import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { AvatarComponent } from './';

const UserInfoComponent = () => {
  return (
    <Card style={styles.card1}>
      <View style={styles.card1Container}>
        <AvatarComponent />
        <View>
          <Text category="h5" style={{}}>
            Kullanıcı Adı
          </Text>
          <Text category="s2" style={{ fontWeight: 'light', color: 'gray' }}>
            Member since 2022
          </Text>
          <Text category="s2" style={{ fontWeight: 'light', color: 'gray' }}>
            Manisa
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default UserInfoComponent;

const styles = StyleSheet.create({
  card1: {
    width: '90%',
    height: 140,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    background: ' #f12711' /* fallback for old browsers */,
  },
  card1Container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '12',
    alignItems: 'center',
  },
});
