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
    "https://localhost:300"
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

# Definer de faste brukerdataene
users = {"bruker": "brukerpassord", "admin": "adminpassord", "selger": "selgerpassord"}


@app.post("/login")
async def login(brukere=AdministrerendeBrukere):
    username = brukere.username
    password = brukere.password

    # Valider brukernavn og passord
    if username in users and users[username] == password:
        return {"message": f"Du er logget inn som {username}."}
    else:
        raise HTTPException(status_code=401, detail="Ugyldig brukernavn eller passord")


@app.get("/")
def read_root():
    return "asdasdasd"


@app.get("/api/todo")
async def get_todo():
    return 1


@app.get("/api/todo{id}")
async def get_todo_by_id(id):
    return 1


@app.post("/api/todo")
async def post_todo(todo):
    return 1


@app.put("/api/todo/{id}")
async def put_todo(id, data):
    return 1


@app.delete("/api/todo")
async def delete_todo(id):
    return 1


# -------------------------------------------------------------------------------------------------
# **************************TESTER AT TABELLENE ER OPRETTET****************************************
# -------------------------------------------------------------------------------------------------
"""
conn = get_database_connection()
cursor = conn.cursor()

# Kjør en spørring for å hente informasjon om alle tabellene i databasen
cursor.execute("SELECT * FROM users;")

# Hent resultatene som en liste av tabellnavn
result = cursor.fetchall()

conn.close()

# Iterer gjennom radene og skriv ut data
for row in result:
    id = row["id"]
    name = row["name"]
    age = row["age"]
    email = row["email"]
    place_of_birth = row["place_of_birth"]

    print(
        f"ID: {id}, Name: {name}, Age: {age}, Email: {email}, Place of Birth: {place_of_birth}"
    )

conn = get_database_connection()
cursor = conn.cursor()
cursor.execute("DELETE FROM users")

conn.commit()
conn.close()
print("asddddddddddddddddddddddd")
print(result)"""
