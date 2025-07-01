import React, { useLayoutEffect } from 'react';
import { Button, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Select Group`,
    });
  }, [navigation]);

  return (

    <View style={styles.container}>
      <Text style={styles.titleText}>Do you want to join an existing group or create a new one?</Text>
      <View style={styles.tileContainer} >
        <TouchableOpacity style={styles.tile} onPress={() => router.push('/existingGroup')}>
          <Text style={styles.tileText}> Join Existing Group</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} onPress={() => router.push('/newGroup')}>
          <Text style={styles.tileText}>New Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  tileContainer: {
    flexDirection: 'column',
    gap: 20, // Abstand zwischen Kacheln (React Native 0.71+)
    width: '100%',
    alignItems: 'center', // Horizontal zentrieren
  },
  tile: {
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  tileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  titleText:{
    fontSize: 28,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 40,
    justifyContent: 'center', 
    textAlign: 'left',
  }
});