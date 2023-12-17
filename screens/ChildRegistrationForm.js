import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button,Alert } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { insertChild } from '../dbConfig/database';

const ChildRegistrationForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [immunizations, setImmunizations] = useState({
    BCG: false,
    MMR: false,
    RV: false,
    DTaP: false,
  });

  const handleCheckboxChange = (key) => {
    setImmunizations((prevImmunizations) => ({
      ...prevImmunizations,
      [key]: !prevImmunizations[key],
    }));
  };

  const handleSubmit = () => {
    // Validate inputs
    if (!firstName || !lastName || !age || !gender || immunizations.length === 0) {
      setError('All fields are required');
      return;
    }

    // Additional validation logic can be added here

    // Clear any previous errors
    setError('');
// Save to SQLite
    saveToDatabase({ firstName, lastName, age, gender, immunizations });
   
    // // Submit the form
    // onSubmit({ firstName, lastName, age, gender, immunizations });

      // Show success message alert
      Alert.alert('Success', 'Child added successfully', [
        {
          text: 'OK',
          onPress: () => {
            // Reset the form after pressing OK
            setFirstName('');
            setLastName('');
            setAge('');
            setGender('');
            setImmunizations({
              BCG: false,
              MMR: false,
              RV: false,
              DTaP: false,
            });
          },
        },
      ]);
  };

    const saveToDatabase = (childData) => {
    insertChild(
      childData,
      (insertId) => {
        console.log('Child inserted with ID: ', insertId);
      },
      (error) => {
        console.error('Error inserting child: ', error);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        placeholder="Enter age"
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Select gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <Text style={styles.label}>Immunizations:</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={immunizations.BCG}
          onValueChange={() => handleCheckboxChange('BCG')}
        />
        <Text style={styles.checkboxLabel}>BCG</Text>

        <Checkbox
          style={styles.checkbox}
          value={immunizations.MMR}
          onValueChange={() => handleCheckboxChange('MMR')}
        />
        <Text style={styles.checkboxLabel}>MMR</Text>

        <Checkbox
          style={styles.checkbox}
          value={immunizations.RV}
          onValueChange={() => handleCheckboxChange('RV')}
        />
        <Text style={styles.checkboxLabel}>RV</Text>

        <Checkbox
          style={styles.checkbox}
          value={immunizations.DTaP}
          onValueChange={() => handleCheckboxChange('DTaP')}
        />
        <Text style={styles.checkboxLabel}>DTaP</Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    margin: 8,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 15,
  },
});

export default ChildRegistrationForm;
