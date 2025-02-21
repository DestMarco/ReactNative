from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Permette richieste CORS dal client React Native

# Carica i dati dal file JSON
DB_FILE = 'database.json'

def load_data():
    with open(DB_FILE, 'r') as f:
        return json.load(f)

def save_data(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=4)

data = load_data()

# ✅ Endpoint per ottenere tutti gli studenti
@app.route('/studenti', methods=['GET'])
def get_studenti():
    return jsonify(data.get('persona', []))

# ✅ Endpoint per ottenere un singolo studente tramite ID
@app.route('/studenti/<int:id>', methods=['GET'])
def get_studente(id):
    studente = next((item for item in data.get('persona', []) if item['id'] == id), None)
    return jsonify(studente) if studente else jsonify({'message': 'Studente non trovato'}), 404

# ✅ Endpoint per ottenere tutte le assenze
@app.route('/assenze', methods=['GET'])
def get_assenze():
    return jsonify(data.get('assenze', []))

# ✅ Endpoint per ottenere un'assenza per ID studente
@app.route('/assenze/<int:id>', methods=['GET'])
def get_assenza(id):
    assenza = next((item for item in data.get('assenze', []) if item['id_persona'] == id), None)
    return jsonify(assenza) if assenza else jsonify({'message': 'Assenza non trovata'}), 404

# ✅ Endpoint per ottenere tutti i corsi
@app.route('/corsi', methods=['GET'])
def get_corsi():
    return jsonify(data.get('wp', []))

# ✅ Endpoint per ottenere un singolo corso tramite ID
@app.route('/corsi/<int:id>', methods=['GET'])
def get_corso(id):
    corso = next((item for item in data.get('wp', []) if item['id'] == id), None)
    return jsonify(corso) if corso else jsonify({'message': 'Corso non trovato'}), 404

# 🔹 Endpoint per aggiungere un nuovo studente
@app.route('/studenti', methods=['POST'])
def add_studente():
    new_student = request.json
    if not all(k in new_student for k in ('id', 'nome', 'cognome', 'media_voti', 'matricola', 'assenze', 'wp')):
        return jsonify({'message': 'Dati mancanti'}), 400

    data['persona'].append(new_student)
    save_data(data)
    return jsonify({'message': 'Studente aggiunto con successo'}), 201

# 🔹 Endpoint per aggiornare le assenze di uno studente
@app.route('/assenze/<int:id>', methods=['PUT'])
def update_assenze(id):
    assenza = next((item for item in data['assenze'] if item['id_persona'] == id), None)
    if assenza:
        assenza['numero_assenze'] = request.json.get('numero_assenze', assenza['numero_assenze'])
        save_data(data)
        return jsonify({'message': 'Assenze aggiornate'}), 200
    return jsonify({'message': 'Studente non trovato'}), 404

# 🔹 Endpoint per eliminare uno studente
@app.route('/studenti/<int:id>', methods=['DELETE'])
def delete_studente(id):
    global data
    data['persona'] = [studente for studente in data['persona'] if studente['id'] != id]
    save_data(data)
    return jsonify({'message': 'Studente eliminato'}), 200

# 🔹 Avvio del server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4999)
