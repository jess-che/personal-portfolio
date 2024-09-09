import sqlite3

# Connect to the SQLite database (this will create the database if it doesn't exist)
connection = sqlite3.connect('database.db')

# Open the schema.sql file and execute its contents as SQL commands
with open('schema.sql') as f:
    connection.executescript(f.read())

# Commit the changes and close the connection
connection.commit()
connection.close()
