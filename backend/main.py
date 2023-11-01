from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import *
from service import *

# siden vi bruker java for frontend og python for backend så vil det være to seperate porter de kjører på. denne funksjonen tilater dem å kunne fungere sammen
from database import get_database_connection  # Importer create_tables-funksjonen


# intansierer appen som en objekt:
app = FastAPI()

origins = [
    "http://localhost:3000",
]  # react sin port, om du ikke gjør det så vil den ikke tilate forbinnelse

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kjør create_tables-funksjonen ved oppstart av applikasjonen
# create_tables()


# Opprett en tourist


@app.post("/api/selger/sign-up", response_model=Tourists)
async def add_tourist(tourist: Tourists):
    try:
        new_tourist = register_new_user(tourist)
        return new_tourist
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Feil under opprettelse av tourist: {str(e)}"
        )


@app.post("/login")
def login(request: LoginRequest):
    is_valid_user = verify_user(request.first_name, request.password)
    if is_valid_user:
        return {"message": "Login successful"}
    else:
        raise HTTPException(
            status_code=401,
            detail="Incorrect login credentials",
        )
