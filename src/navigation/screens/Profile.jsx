import { Text } from '@react-navigation/elements';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { closeIcon } from './../../assets';

export function Profile() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity
        style={{ margin: 15, alignSelf: 'flex-end' }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={closeIcon}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
