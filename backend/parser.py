import requests
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session
from models import Product
from database import SessionLocal

# Функция парсинга Wildberries по поисковому запросу
# (пример для первой страницы, можно доработать для пагинации)
def parse_wildberries(query: str):
    url = "https://search.wb.ru/exactmatch/ru/common/v5/search"
    params = {
        "query": query,
        "page": 1,
        "limit": 50,
        "resultset": "catalog",
        "dest": "-1257786",
        "spp": "0",
        "sort": "popular"
    }
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, params=params, headers=headers)
    data = response.json()
    print(data)
    products = []
    for item in data.get("data", {}).get("products", []):
        name = item.get("name", "")
        price = item.get("priceU", 0) / 100
        sale_price = item.get("salePriceU", 0) / 100
        rating = item.get("reviewRating", 0)
        reviews = item.get("feedbacks", 0)
        print(name, price, sale_price, rating, reviews)
        product = Product(
            name=name,
            price=price,
            sale_price=sale_price,
            rating=rating,
            reviews=reviews
        )
        products.append(product)
    print(f"Найдено товаров: {len(products)}")
    db = SessionLocal()
    # Удаляем все старые товары
    db.query(Product).delete()
    db.commit()
    # Добавляем новые товары
    for product in products:
        db.add(product)
    db.commit()
    db.close()
    return len(products) 