#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE users (
        id SERIAL,
        age INT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email TEXT
    );

    CREATE TABLE IF NOT EXISTS feedBack(
        id INT NOT NULL AUTO_INCREMENT,
        userId INT NOT NULL,
        title VARCHAR(50),
        content VARCHAR(400),
        game varchar(50),
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    );


EOSQL