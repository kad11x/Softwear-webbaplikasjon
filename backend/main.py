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


@app.post("/api/tourists/sign-up", response_model=Tourists)
def add_tourist(tourist: Tourists):
    try:
        new_tourist = register_new_user(tourist)
        return new_tourist
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Feil under opprettelse av tourist: {str(e)}"
        )


@app.post("/login")
def login(request: LoginRequest):
    user_info = check_user_type(request.firstName, request.password)
    if user_info:
        user_type, user_id = user_info
        return {"userType": user_type, "userId": user_id}

    else:
        raise HTTPException(status_code=401, detail="Incorrect login credentials")


@app.get("/tourist/{id}")
def read_tourist(id: int):
    tourist = get_one_tourist(id)
    if tourist:
        return tourist
    else:
        raise HTTPException(status_code=404, detail="Tourist not found")


@app.get("/all-Tours")
def read_all_tours():
    tour = get_all_tours()
    if tour:
        return tour
    else:
        raise HTTPException(status_code=404, detail="Tour not found")
