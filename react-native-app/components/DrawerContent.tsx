import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function DrawerContent({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
        <Text style={styles.item}>Recordings</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.item}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.item}>Sign In/Out</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.item}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    paddingVertical: 16,
    fontWeight: '600',
    fontSize: 16,
  },
});
