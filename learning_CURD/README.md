# Project Workflow

This project follows a simple MVC-like structure using **Express.js**, **Mongoose**, and **MongoDB**.

## Project Structure

```
LEARNING_CURD/
│
├── models/
│   ├── MenuItem.js
│   └── Person.js
│
├── routes/
│   ├── menuRoutes.js
│   └── personRoutes.js
│
├── .env
├── db.js
├── server.js
├── package.json
└── node_modules/
```

---

# Application Workflow

## Step 1: Start the Server

Run the application using:

```bash
node server.js
```

or

```bash
nodemon server.js
```

Node.js starts executing `server.js`.

---

## Step 2: Load Environment Variables

`server.js` loads the variables from the `.env` file using `dotenv`.

Example:

```javascript
require("dotenv").config();
```

This allows sensitive information such as the MongoDB connection string and server port to remain outside the source code.

---

## Step 3: Connect to MongoDB

`server.js` imports `db.js`.

```javascript
require("./db");
```

Inside `db.js`, Mongoose connects to the MongoDB database.

```
server.js
      │
      ▼
    db.js
      │
      ▼
MongoDB Connected
```

The database connection is established once when the server starts.

---

## Step 4: Register Routes

`server.js` imports all route files.

```javascript
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
```

and registers them.

```javascript
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);
```

Now Express knows where to send incoming requests.

---

## Step 5: Load Models

Each route imports its corresponding model.

Example:

```javascript
const Person = require("../models/Person");
```

The model contains the Mongoose Schema, which defines the structure of the MongoDB documents.

```
Route
   │
   ▼
Model
   │
   ▼
Schema
```

---

## Step 6: Wait for Client Requests

After everything is loaded:

- Database is connected
- Models are ready
- Routes are registered

The Express server waits for incoming HTTP requests.

---

# CRUD Request Workflow

Suppose the client sends:

```
POST /person
```

with

```json
{
  "name": "John",
  "age": 25
}
```

The request follows this path:

```
Client (Postman / Frontend)
          │
          ▼
      server.js
          │
          ▼
 Express Router
          │
          ▼
 personRoutes.js
          │
          ▼
Person Model
          │
          ▼
 Mongoose
          │
          ▼
 MongoDB
          │
          ▼
Database Response
          │
          ▼
 Express Response
          │
          ▼
Client
```

---

## CREATE Operation

```javascript
const person = new Person(req.body);
await person.save();
```

Creates a new document in MongoDB.

---

## READ Operation

```javascript
const people = await Person.find();
```

Retrieves documents from MongoDB.

---

## UPDATE Operation

```javascript
await Person.findByIdAndUpdate(id, updatedData);
```

Updates an existing document.

---

## DELETE Operation

```javascript
await Person.findByIdAndDelete(id);
```

Deletes a document from MongoDB.

---

# Responsibility of Each File

| File/Folder    | Responsibility                                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `.env`         | Stores environment variables like PORT and MongoDB URI.                                                                                       |
| `server.js`    | Entry point of the application. Creates the Express app, loads middleware, connects to the database, registers routes, and starts the server. |
| `db.js`        | Establishes the connection between the application and MongoDB using Mongoose.                                                                |
| `models/`      | Defines the Mongoose Schemas and Models for each collection.                                                                                  |
| `routes/`      | Handles incoming HTTP requests and performs CRUD operations using the corresponding models.                                                   |
| `package.json` | Stores project metadata, dependencies, and scripts.                                                                                           |

---

# Overall Workflow Diagram

```
                node server.js
                      │
                      ▼
               Load .env
                      │
                      ▼
          Connect to MongoDB (db.js)
                      │
                      ▼
             Register Express Routes
                      │
                      ▼
              Load Mongoose Models
                      │
                      ▼
           Wait for Client Requests
                      │
                      ▼
      Client (Postman / Frontend)
                      │
                      ▼
                Express Router
                      │
                      ▼
                  Route Handler
                      │
                      ▼
               Mongoose Model
                      │
                      ▼
                  MongoDB
                      │
                      ▼
               Database Response
                      │
                      ▼
              Send HTTP Response
                      │
                      ▼
                    Client
```

## Summary

The application follows a simple request-response cycle:

1. The client sends an HTTP request.
2. Express receives the request.
3. The appropriate route is selected.
4. The route interacts with the Mongoose model.
5. Mongoose communicates with MongoDB.
6. MongoDB returns the result.
7. Express sends the response back to the client.

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
