import React, { useState } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Sostituisci l'URL con l'indirizzo del tuo server Flask
      const response = await axios.get('http://localhost:4999/studenti');
      setDataList(response.data);
      setError(null);
    } catch (err) {
      setError("⚠️ Impossibile recuperare i dati.");
      setDataList([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Gestione Accademica</Text>
        <Button title="🔍 Carica Studenti" onPress={fetchData} color="#4A90E2" />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <FlatList
          data={dataList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {Object.keys(item).map((key) => (
                <Text key={key} style={styles.cardText}>{key}: {item[key]}</Text>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
