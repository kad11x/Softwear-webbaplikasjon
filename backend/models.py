from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# Defining Pydantic models for the database tables


class LoginRequest(BaseModel):
    first_name: str
    password: str


class Tourists(BaseModel):
    tourists_id: Optional[int] = Field(None, alias="touristsID")
    first_name: str = Field(..., alias="firstName")
    last_name: str = Field(..., alias="lastName")
    email: EmailStr = Field(..., alias="eMail")
    phone_number: int = Field(..., alias="phoneNummber")
    password: str = Field(..., alias="password")


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
    guids_id: Optional[int] = Field(None, alias="guidsID")
    first_name: str = Field(..., alias="firstName")
    last_name: str = Field(..., alias="lastName")
    company: str
    email: EmailStr = Field(..., alias="eMail")
    phone_number: int = Field(..., alias="phoneNummber")
    picture_url: str = Field(..., alias="pictureUrl")


class Tour(BaseModel):
    tour_id: Optional[int] = Field(None, alias="tourID")
    guids_guids_id: int = Field(..., alias="guids_guidsID")
    description: str
    city_city_id: int = Field(..., alias="city_cityID")
    price: float
    max_people: int = Field(..., alias="maxPeople")


class ShoppingCart(BaseModel):
    tour_tour_id: int = Field(..., alias="tour_tourID")
    tourists_tourists_id: int = Field(..., alias="tourists_touristsID")
