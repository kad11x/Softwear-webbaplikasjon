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


def check_user_type(firstName, password):
    conn = get_database_connection()
    user_info = None
    if conn:
        try:
            # Check if the user is a tourist
            cursor = conn.cursor()
            cursor.execute(
                "SELECT touristsID, password FROM tourists WHERE firstName = ?",
                (firstName,),
            )
            tourist = cursor.fetchone()

            if tourist and tourist[1] == password:
                user_info = (
                    "tourist",
                    tourist[0],
                )  # Return 'tourist' and the tourist ID

            # Check if the user is a guid
            else:
                cursor.execute(
                    "SELECT guidsID, password FROM guids WHERE firstName = ?",
                    (firstName,),
                )
                guid = cursor.fetchone()

                if guid and guid[1] == password:
                    user_info = ("guid", guid[0])  # Return 'guid' and the guid ID

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            conn.close()

    return user_info


def get_one_tourist(userID):
    conn = get_database_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * from Tourists WHERE touristsID = ?", (userID,))
    tourist = cursor.fetchone()

    conn.commit()
    conn.close()
    return tourist


def get_all_citys():
    conn = get_database_connection()
    cursor = conn.cursor()
    query = """
    SELECT 
        t.description,
        t.price,
        t.maxPeople,
        g.firstName || ' ' || g.lastName AS guide_name,
        c.country AS country_name
    FROM 
        tour t
    INNER JOIN 
        guids g ON t.guids_guidsID = g.guidsID
    INNER JOIN 
        city ci ON t.city_cityID = ci.cityID
    INNER JOIN 
        country c ON ci.country_countryID = c.countryID;
    """
    cursor.execute(query)
    tours = cursor.fetchall()
    conn.close()

    return tours
