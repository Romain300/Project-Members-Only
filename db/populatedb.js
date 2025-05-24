const { Client } = require("pg");
require("dotenv").config();

const SQL = `

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(30) NOT NULL,
surname VARCHAR(30) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
author_id INTEGER NOT NULL,
title VARCHAR (255) NOT NULL, 
content TEXT NOT NULL,
date TIMESTAMP WITH TIME ZONE,
FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS memberships (
id_user INT,
member BOOLEAN,
admin BOOLEAN,
FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
PRIMARY KEY (id_user)
);

`;

async function main() {
    console.log("seeding");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
};

main();