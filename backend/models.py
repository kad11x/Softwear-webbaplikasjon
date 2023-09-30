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
    name: str
    age: int
    email: str
    place_of_birth: str


class Guide(BaseModel):
    name: str
    age: int
    email: str
    bio: str
    tours: List["Tour"]  # Liste over turer guiden tilbyr


class Tour(BaseModel):
    name: str
    description: str
    price: float
    date_available: datetime


class ShoppingCart(BaseModel):
    user: "User"  # Legg til en referanse til User-modellen
    items: List[Tour]
