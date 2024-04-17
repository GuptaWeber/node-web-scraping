# Github URL - https://github.com/GuptaWeber/node-web-scraping

# Web Scraping

- The file in web-scraping-backend/scrape/index.js is responsible for pulling the list of companies and their details and adding those details to the DB.

- Used sequelize as ORM.

- Used DB as MySQL, DATABASE_HOST and username details can be updated at `.env` file in `web-scraping-backend` folder

# Instructions to Scrape the Data

- cd web-scraping-backend
- npm install
- npm run dev - This starts the server
- npm run scrape - This scrapes the data and inserts the data to DB

<br />

# APIs Available

- GET - /clients - list out all clients
- POST - /clients - Create a new client
- GET - /clients/[id] - Show one client
- POST - /clients/[id] - Update a client
- DELETE - /clients/[id] - Delete a client
- GET - /clients?q=[term] - Search a client based on id, name or email

Implemented Pagination for the Get API

```
{
totalRecords: number,
companies: []
}
```

# Instructions to run Frontend

- cd frontend
- npm install
- npm run start
