from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# Defining Pydantic models for the database tables


class LoginRequest(BaseModel):
    firstName: str
    password: str


class Tourists(BaseModel):
    firstName: str
    lastName: str
    email: str
    phoneNumber: int
    password: str


class Language(BaseModel):
    language_id: Optional[int] = Field(None, alias="languageID")
    language: str


class Country(BaseModel):
    country_id: Optional[int] = Field(None, alias="countryID")
    country: str


class Review(BaseModel):
    review_id: Optional[int] = Field(None, alias="reviewID")
    review: str
    rating: int


class BookedTour(BaseModel):
    booked_tour_id: Optional[int] = Field(None, alias="bookedTourID")
    time: str


class City(BaseModel):
    city_id: Optional[int] = Field(None, alias="cityID")
    country_country_id: int = Field(..., alias="country_countryID")
    city_name: str = Field(..., alias="cityName")


class Guide(BaseModel):
    firstName: str
    lastName: str
    company: str
    email: str
    password: str
    phoneNumber: int
    pictureURL: str


class Tour(BaseModel):
    tour_id: Optional[int] = Field(None, alias="tourID")
    guids_guids_id: int = Field(..., alias="guids_guidsID")
    description: str
    city_city_id: int = Field(..., alias="city_cityID")
    price: float
    max_people: int = Field(..., alias="maxPeople")


class Shopping_cart(BaseModel):
    tour_tourID: int
    tourists_touristsID: int
    time: str
    amount_of_people: str
