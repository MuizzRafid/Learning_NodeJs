# how to connect with mongoDB Database

# How `require("./db")` Works in Node.js

## What is `require()`?

`require()` imports another file or module. When you write:

```javascript
const db = require("./db");
```

Node.js does two things:

1. Executes the entire `db.js` file.
2. Returns whatever `db.js` exports with `module.exports`.

---

## Execution Flow

### `server.js`

```javascript
const express = require("express");
const app = express();

const db = require("./db");
```

### `db.js`

```javascript
const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL);

const db = mongoose.connection;

module.exports = db;
```

### What happens?

```text
server.js
    │
    ▼
require("./db")
    │
    ▼
Execute db.js
    │
    ├── Import mongoose
    ├── Connect to MongoDB
    ├── Create connection object
    └── Export db
    │
    ▼
Return db to server.js
```

---

## Why does MongoDB connect?

When `db.js` is executed, this line runs automatically:

```javascript
mongoose.connect(mongoURL);
```

So, even if you never use the `db` variable later, the database connection has already been established.

---

## Why use `module.exports`?

```javascript
module.exports = db;
```

This makes the database connection available to other files.

Example:

```javascript
const db = require("./db");

console.log(db.readyState);
```

---

## Meaning of `./`

```javascript
require("./db");
```

- `./` → Current folder ✅
- `/` → Root of the filesystem ❌

---

## Key Points

- `require()` executes the imported file.
- `module.exports` determines what `require()` returns.
- `mongoose.connect()` runs because `db.js` is executed.
- `const db = require("./db")` stores the exported database connection.
- A module is executed only once; afterward, Node.js uses the cached version.

---

## Simple Analogy

Think of `db.js` as a machine.

```text
require("./db")
      │
      ▼
Turn on the machine
Do the setup
Return the machine
```

Even if you don't use the returned machine, the setup has already been completed.
