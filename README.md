NodeJS Backend for Webix Query
==================

### How to start

- configure DB connection
- import DB dump (dump.sql)

```shell script
npm install
node index.js
```

#### Get all data from the tablesave

```
POST /api/data/{table}
```

Body can contain a filtering query

#### Get unique field values

```
GET /api/data/{table}/{field}/suggest
```