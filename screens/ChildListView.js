import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Swipeable } from "react-native-gesture-handler";
import { getAllChildren } from "../dbConfig/database";
import CircularButton from "../components/CircularButton";

const ChildListView = ({ navigation }) => {
  const [children, setChildren] = useState([]);
  const [originalChildren, setOriginalChildren] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const refreshData = () => {
      // Fetch the list of children from the database
      getAllChildren(
        (data) => {
          setChildren(data);
          setOriginalChildren(data); // Store the original list
        },
        (error) => {
          console.error("Error fetching children: ", error);
        }
      );
    };
    // Add a listener for navigation state changes
    const unsubscribe = navigation.addListener("focus", () => {
      // Refresh data when the screen comes into focus
      refreshData();
    });
    // Initial data fetch
    refreshData();
    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]); 

  const handleSort = (property) => {
    const sortedChildren = [...children];

    // Sort the array based on the selected property
    sortedChildren.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });

    // Toggle sorting order on consecutive clicks
    if (sortBy === property) {
      sortedChildren.reverse();
    }

    setChildren(sortedChildren);
    setSortBy(property);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);

    if (text === "") {
      // If the search query is empty, show the original list
      setChildren(originalChildren);
    } else {
      // If the search query is not empty, filter the list based on the query
      const filteredChildren = originalChildren.filter(
        (child) =>
          child.firstName.toLowerCase().includes(text.toLowerCase()) ||
          child.lastName.toLowerCase().includes(text.toLowerCase())
      );

      setChildren(filteredChildren);
    }
  };

  const handleAddRequest = () => {
    navigation.navigate("Registration");
  };

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Profile", { child: item })}
      >
        <View style={styles.cardContent}>
          <Text style={styles.fullName}>
            {item.firstName} {item.lastName}
          </Text>
          <Text>{item.age} years old</Text>
          <Text>{item.gender}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      />
      </View>

      <View style={styles.sortButtonsContainer}>
        <Text style={styles.sortTitle}>Sort by:</Text>
        <Button title="Age" onPress={() => handleSort("age")} />
        <Button title="Name" onPress={() => handleSort("firstName")} />
      </View>

      <FlatList
        data={children}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <CircularButton style={styles.addButton} onPress={handleAddRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sortButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  sortTitle: {
    marginRight: 8,
    fontWeight: "bold",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default ChildListView;
