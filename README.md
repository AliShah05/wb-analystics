# WB Analytics

Простой сервис аналитики товаров Wildberries с парсером, фильтрами и визуализацией данных.

## Описание

- **Backend:** FastAPI (Python), SQLite, парсер Wildberries по поисковому запросу.
- **Frontend:** React, Material UI, Recharts.
- **Возможности:**
  - Парсинг товаров по ключевому слову с Wildberries.
  - Сохранение данных в базу.
  - Фильтрация и сортировка по цене, рейтингу, количеству отзывов.
  - Визуализация: гистограмма цен, график скидка vs рейтинг.

---

## Как запустить проект

### 1. Клонируй репозиторий

```bash
git clone https://github.com/AliShah05/wb-analystics.git
cd wb-analystics
```

### 2. Запусти backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend будет доступен по адресу: http://localhost:8000

### 3. Запусти frontend

В новом терминале:
```bash
cd frontend
npm install
npm start
```
Frontend будет доступен по адресу: http://localhost:3000

---

## Как пользоваться

1. Введите поисковый запрос (например, "чехол", "ноутбук") и нажмите **Парсить**.
2. После парсинга появятся товары в таблице.
3. Используйте фильтры и сортировку.
4. Смотрите графики: гистограмма цен и график скидка vs рейтинг.

---

## Скриншоты

_Добавьте сюда скриншоты интерфейса, если хотите._

---

## Стек технологий

- Python, FastAPI, SQLAlchemy, BeautifulSoup, requests
- React, Material UI, Recharts, Axios

---

## Автор

- [AliShah05](https://github.com/AliShah05)

