import sqlite3


DATABASE_NAME = "mydatabase.db"


def get_database_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn
