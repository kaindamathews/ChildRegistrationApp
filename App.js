import React,{ useEffect }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChildRegistrationForm from './screens/ChildRegistrationForm';
import ChildListView from './screens/ChildListView';
import ChildProfile from './screens/ChildProfile';
import { createTable } from './dbConfig/database';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
      createTable();
    }, []);
    
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListView">
        <Stack.Screen name="Registration" component={ChildRegistrationForm} />
        <Stack.Screen name="ListView" component={ChildListView} />
        <Stack.Screen name="Profile" component={ChildProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;