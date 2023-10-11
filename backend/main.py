from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import *

# siden vi bruker java for frontend og python for backend så vil det være to seperate porter de kjører på. denne funksjonen tilater dem å kunne fungere sammen
from database import (
    create_tables,
    get_database_connection,
)  # Importer create_tables-funksjonen


# intansierer appen som en objekt:
app = FastAPI()

origins = [
    "https://localhost:3000"
]  # react sin port, om du ikke gjør det så vil den ikke tilate forbinnelse

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kjør create_tables-funksjonen ved oppstart av applikasjonen
create_tables()


# Opprett en bruker
@app.post("/api/selger/add-user", response_model=Guide)
async def add_guide(guide: Guide):
    try:
        conn = get_database_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO guide (name, age, email, bio) VALUES (?, ?, ?, ?)",
            (guide.name, guide.age, guide.email, guide.bio),
        )

        conn.commit()
        conn.close()

        return guide
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Feil under opprettelse av bruker: {str(e)}"
        )


# Opprett en bruker
@app.post("/api/selger/add-tours", response_model=Tours)
async def add_tours(tour: Tours):
    try:
        conn = get_database_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO tours (name, description, price, date_available, location) VALUES (?, ?, ?, ?, ?)",
            (
                tour.name,
                tour.description,
                tour.price,
                tour.date_available,
                tour.location,
            ),
        )

        conn.commit()
        conn.close()

        return tour
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Feil under opprettelse av bruker: {str(e)}"
        )


# -------------------------------------------------------------------------------------------------
# **************************TESTER AT TABELLENE ER OPRETTET****************************************
# -------------------------------------------------------------------------------------------------
""""
conn = get_database_connection()
cursor = conn.cursor()

# Kjør en spørring for å hente informasjon om alle tabellene i databasen
cursor.execute("SELECT * FROM guide;")

#Hent resultatene som en liste av tabellnavn
result = cursor.fetchall()

conn.close()

# Iterer gjennom radene og skriv ut data
for row in result:
    id = row["id"]
    name = row["name"]
    age = row["age"]
    email = row["email"]
    bio = row["bio"]

    print(f"ID: {id}, Name: {name}, Age: {age}, Email: {email}, bio: {bio}")

conn = get_database_connection()
cursor = conn.cursor()
cursor.execute("DELETE FROM guide")

conn.commit()
conn.close()

print(result)
"""
