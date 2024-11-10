DROP TABLE IF EXISTS task;

DROP TABLE IF EXISTS account;

CREATE TABLE
    account (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    task (
        id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL
    );

INSERT INTO
    task (description)
VALUES
    ('Learn React');

INSERT INTO
    task (description)
VALUES
    ('Learn Node');

INSERT INTO
    task (description)
VALUES
    ('Learn Express');

INSERT INTO
    task (description)
VALUES
    ('Learn MongoDB');