import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';

const ChildProfile = ({ route, navigation }) => {
  // Extract child data from the navigation route
  const { child } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Profile</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Name:</Text>
          <Text>{`${child.firstName} ${child.lastName}`}</Text>

          <Text style={styles.label}>Age:</Text>
          <Text>{child.age}</Text>

          <Text style={styles.label}>Gender:</Text>
          <Text>{child.gender}</Text>

              <Text style={styles.label}>Immunizations:</Text>
              <Text>{child.immunizations}</Text>
            

        </Card.Content>
      </Card>

      <Button
        title="Go Back to List"
        onPress={() => {
          // Navigate back to the child list
          // You may need to adjust this navigation based on your navigation setup
          navigation.navigate('ListView');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    padding: 20, // Add padding to the container
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: '100%', // Take up the full width
    elevation: 5, // Shadow depth
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ChildProfile;
