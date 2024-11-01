CREATE DATABASE ng_bebidas_db;

USE ng_bebidas_db;

CREATE TABLE bebidas(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(180),
    clase VARCHAR(180),
    cepa VARCHAR(255),
    bodega VARCHAR(255),
    image VARCHAR(500),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

