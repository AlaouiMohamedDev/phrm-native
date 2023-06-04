import React, { useEffect, useState } from 'react';
import { View,ImageBackground ,Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const App = () => {
  const [pharmacies, setPharmacies] = useState([]);


  const fetchPharmacies = async () => {
    try {
      const response = await fetch('http://192.168.1.104:8080/api/pharmacies');
      const data = await response.json();
      setPharmacies(data);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    }
  };
  useEffect(() => {
    fetchPharmacies();
  }, []);

  const ListItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.nom}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon style={{paddingEnd:5}} name="place" size={12} color="gray" />
            <Text style={styles.address}>{item.adresse}</Text>
          </View>
          <Text></Text>
          <TouchableOpacity >
             <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/authP.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>
            Pharmacy <Text style={styles.titleHighlight}>Detector</Text>
          </Text>
          <Text style={styles.description}>
            Welcome to our Pharmacy Locator app! We are thrilled to offer you a user-friendly and convenient way to find pharmacies near you.
          </Text>
          {pharmacies.map((pharmacy, index) => (
            <ListItem key={index} item={pharmacy} />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 13,
    fontWeight:600,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: '#721E23',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
  titleHighlight: {
    color: '#FF5F5D',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    position:'relative'
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
  },
  name: {
    fontSize: 20,
  },
  address: {
    fontSize: 14,
    color:'gray',
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  buttonText: {
    color: 'white',
    backgroundColor:'#FF5F5D',
    padding:5,
    textAlign:'center',
    borderRadius:10,
  },
});

export default App;
