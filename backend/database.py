from models import User
import sqlite3
from hashlib import sha256


DATABASE_NAME = "mydatabase.db"


def get_database_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    try:
        conn = get_database_connection()
        cursor = conn.cursor()
        cursor.execute
        # Tourists
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS tourists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fierstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            age INTEGER NOT NULL,
            eMail TEXT NOT NULL,
            phoneNumber INTEGER NOT NULL,)"""
        )
        # booked
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS guide (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            email TEXT NOT NULL,
            bio TEXT)"""
        )
        # Tours
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS tours (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            date_available TIMESTAMP,
            location VARCHAR(255) NOT NULL
            )"""
        )
        # Shopping_cart
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS shopping_carts (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            tour_ids TEXT)"""
        )

        conn.commit()
        conn.close()
        print("Tabeller er opprettet suksessfullt.")
    except Exception as e:
        print(f"Feil under opprettelse av tabeller: {str(e)}")
