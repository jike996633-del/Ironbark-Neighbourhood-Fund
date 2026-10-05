# Ironbark Neighbourhood Fund

PROG2002 Assessment 2. A timetable of public charity nights in Adelaide.

- `service` — Express + MySQL, GET only
- `pages` — static site

## Setup

Import `service/sql/charityevents_db.sql` in MySQL Workbench.

Edit `service/event_db.js` so the user and password match your MySQL login.

```bash
cd service
npm install
npm start
```

API: http://localhost:3012

```bash
cd pages
npm install
npm start
```

Website: http://localhost:3013

## Endpoints

- `GET /open/nights` — upcoming public rows
- `GET /open/nights/filter?date=&location=&category=` — optional filters; past rows allowed
- `GET /open/nights/:id` — one row; withdrawn nights return 404
- `GET /labels` — category labels
