/*
CSCE 315
Project 3
Team 14
11/08/22
 */

/* simple file to hold sql snippets */

CREATE DATABASE perntodo;

CREATE TABLE todo(
   todo_id SERIAL PRIMARY KEY,
   description VARCHAR(255)
);