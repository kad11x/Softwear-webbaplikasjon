from random import randint
from faker import Faker
from database import get_database_connection

fake = Faker()

def insert_dummy_data():
    conn = get_database_connection()
    cursor = conn.cursor()

    # Generer og sett inn dummy-data for brukere
    for _ in range(10):
        name = fake.name()
        age = randint(18, 60)
        email = fake.email()
        place_of_birth = fake.city()
        cursor.execute(
            "INSERT INTO users (name, age, email, place_of_birth) VALUES (?, ?, ?, ?)",
            (name, age, email, place_of_birth),
        )

    # Generer og sett inn dummy-data for guider
    for _ in range(5):
        name = fake.name()
        age = randint(25, 60)
        bio = fake.text()
        cursor.execute(
            "INSERT INTO guide (name, age, bio) VALUES (?, ?, ?)",
            (name, age, bio),
        )

    # Generer og sett inn dummy-data for turer
    for _ in range(15):
        name = fake.bs()
        description = fake.text()
        price = randint(50, 500)
        date_available = fake.date_time_this_decade()
        guide_id = randint(1, 5)  # Anta at du har 5 guider
        cursor.execute(
            "INSERT INTO tours (name, description, price, date_available, guide_id) VALUES (?, ?, ?, ?, ?)",
            (name, description, price, date_available, guide_id),
        )

    conn.commit()
    conn.close()
    print("Dummy-data er satt inn i tabellene.")


if __name__ == "__main__":
    insert_dummy_data()
