from fastapi import HTTPException
from models import *
from database import get_database_connection


def register_new_user(tourists: Tourists):
    conn = get_database_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO Tourists (firstName, lastName, email,phoneNumber, password) VALUES (?,?,?,?,?)",
        (
            tourists.firstName,
            tourists.lastName,
            tourists.email,
            tourists.phoneNumber,
            tourists.password,
        ),
    )

    conn.commit()
    conn.close()
    return tourists


def verify_user(first_name: str, password: str) -> bool:
    conn = get_database_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM tourists WHERE firstName = ? ", (first_name,))
    stored_password = cursor.fetchone()
    conn.close()
    return stored_password is not None and stored_password[0] == password
