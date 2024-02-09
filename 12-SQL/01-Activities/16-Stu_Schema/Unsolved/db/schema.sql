DROP DATABASE IF EXISTS new_db;

CREATE DATABASE schema_db;

USE schema_db;

CREATE TABLE
    products (
        id INT NOT NULL AUTO_INCREMENT PRIMARY Key,
        product_name VARCHAR(30) NOT NULL,
        category_name VARCHAR(100) NOT NULL,
        price INT,
        in_stock BOOLEAN
    );