import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, SafeAreaView, Dimensions, Image, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const data = require('./database.json');

const App = () => {
  const [table, setTable] = useState("persona");
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    if (data[table]) {
      setDataList(data[table]);
      setError(null);
    } else {
      setError("⚠️ Tabella non trovata. Inserisci un nome valido.");
      setDataList([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('./assets/accademia1.jpg')} style={styles.logo} />
        <Text style={styles.header}>Gestione Accademica</Text>
        <Text style={styles.subHeader}>
          Consulta i dati degli studenti, i corsi e le assenze in pochi click.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>📌 Seleziona una tabella:</Text>
          <TextInput
            style={styles.input}
            value={table}
            onChangeText={setTable}
            placeholder="Es. persona, assenze, wp"
            placeholderTextColor="#aaa"
          />
          <Button title="🔍 Carica Dati" onPress={fetchData} color="#4A90E2" />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <FlatList
          data={dataList}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
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
  logo: {
    width: width * 0.5,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#4A90E2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
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
