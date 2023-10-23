from pydantic import BaseModel, Field

from datetime import datetime
from typing import List


# bare for innloging:
# legger in deafaul verdier sånn at ejg slipper å lage database
class AdministrerendeBrukere(BaseModel):
    username: str
    password: str


# opprinelig database:
class User(BaseModel):
    firstName: str
    lastName: str
    eMail: str
    phoneNummber: int

class Guids(BaseModel):
    firstName: str
    lastName: str
    company: str
    eMail: str
    phoneNummber: int
    bio: str
    pictureURL: str


class Tours(BaseModel):
    name: str
    description: str
    price: float
    date_available: datetime
    location: str


class ShoppingCart(BaseModel):
    user: "User"  # Legg til en referanse til User-modellen
