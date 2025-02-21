from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Permette richieste CORS dal client React Native

# Carica i dati dal file JSON
with open('database.json') as f:
    data = json.load(f)

# Endpoint per recuperare tutte le persone
@app.route('/studenti', methods=['GET'])
def get_studenti():
    return jsonify(data['persona'])

# Endpoint per recuperare una persona per ID
@app.route('/studenti/<int:id>', methods=['GET'])
def get_studente(id):
    studente = next((item for item in data['persona'] if item['id'] == id), None)
    if studente:
        return jsonify(studente)
    else:
        return jsonify({'message': 'Studente non trovato'}), 404

# Endpoint per recuperare tutte le assenze
@app.route('/assenze', methods=['GET'])
def get_assenze():
    return jsonify(data['assenze'])

# Endpoint per recuperare una assenza per ID
@app.route('/assenze/<int:id>', methods=['GET'])
def get_assenza(id):
    assenza = next((item for item in data['assenze'] if item['id_persona'] == id), None)
    if assenza:
        return jsonify(assenza)
    else:
        return jsonify({'message': 'Assenza non trovata'}), 404

# Endpoint per recuperare tutti i corsi (wp)
@app.route('/corsi', methods=['GET'])
def get_corsi():
    return jsonify(data['wp'])

# Endpoint per recuperare un corso per ID
@app.route('/corsi/<int:id>', methods=['GET'])
def get_corso(id):
    corso = next((item for item in data['wp'] if item['id'] == id), None)
    if corso:
        return jsonify(corso)
    else:
        return jsonify({'message': 'Corso non trovato'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4999)
