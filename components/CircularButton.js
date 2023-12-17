import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CircularButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.circularButton} onPress={onPress}>
      <Ionicons name="ios-add" size={24} color="white" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circularButton: {
    backgroundColor: 'blue',
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
    elevation: 4, 
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
});

export default CircularButton;
