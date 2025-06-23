from fastapi import FastAPI, Query, Depends
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import Product as ProductModel
from database import SessionLocal
from parser import parse_wildberries
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модель товара
class Product(BaseModel):
    id: int
    name: str
    price: float
    sale_price: float
    rating: float
    reviews: int
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/products/", response_model=List[Product])
def get_products(
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    min_rating: Optional[float] = Query(None),
    min_reviews: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(ProductModel)
    if min_price is not None:
        query = query.filter(ProductModel.price >= min_price)
    if max_price is not None:
        query = query.filter(ProductModel.price <= max_price)
    if min_rating is not None:
        query = query.filter(ProductModel.rating >= min_rating)
    if min_reviews is not None:
        query = query.filter(ProductModel.reviews >= min_reviews)
    return query.all()

# Заглушка для парсера Wildberries
@app.post("/api/parse/")
def parse_products(query: str):
    count = parse_wildberries(query)
    return {"status": f"Добавлено товаров: {count}"} 