from fastapi import HTTPException
from models import *
from database import get_database_connection


def register_new_user(tourists: Tourists):
    conn = get_database_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO Tourists (firstName, lastName, email,phoneNummber, password) VALUES (?,?,?,?,?)",
        (
            tourists.first_name,
            tourists.last_name,
            tourists.email,
            tourists.phone_number,
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
