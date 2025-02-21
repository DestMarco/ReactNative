import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Funzione per recuperare dati dinamicamente
  const fetchData = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    try {
      const response = await axios.get(`http://localhost:4999/${category}`);
      setDataList(response.data);
      setError(null);
    } catch (err) {
      setError("⚠️ Errore nel caricamento dei dati.");
      setDataList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>📚 Gestione Accademica</Text>

        {/* Pulsanti per caricare diverse categorie */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => fetchData('studenti')}>
            <Text style={styles.buttonText}>👩‍🎓 Studenti</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => fetchData('assenze')}>
            <Text style={styles.buttonText}>📆 Assenze</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => fetchData('corsi')}>
            <Text style={styles.buttonText}>📖 Corsi</Text>
          </TouchableOpacity>
        </View>

        {/* Messaggio di errore */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Spinner di caricamento */}
        {loading && <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />}

        {/* Lista di dati caricati */}
        <FlatList
          data={dataList}
          keyExtractor={(item) => item.id?.toString() || item.id_persona?.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {Object.entries(item).map(([key, value]) => (
                <Text key={key} style={styles.cardText}>
                  <Text style={styles.boldText}>{key}:</Text> {Array.isArray(value) ? value.join(', ') : value}
                </Text>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// 🎨 Stile migliorato
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    display:'grid',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    margin:'10px',
    width:'85%',
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 3, // Ombra per Android
    shadowColor: '#000', // Ombra per iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  body:{
    backgroundColor: '#F5F7FA',
  },
  root:{
    display:'grid',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
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
  boldText: {
    fontWeight: 'bold',
  },
});

export default App;
