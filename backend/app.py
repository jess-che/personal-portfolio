from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM my_table').fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])  # This should always return a list


@app.route('/api/data', methods=['POST'])
def add_data():
    new_data = request.json
    conn = get_db_connection()
    conn.execute('INSERT INTO my_table (column1, column2) VALUES (?, ?)',
                 (new_data['column1'], new_data['column2']))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'}), 201  # Ensure this is a valid JSON response


if __name__ == '__main__':
    app.run(debug=True)
