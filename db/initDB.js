require('dotenv').config();

const { getConnection } = require('./db');

//Creación la base de datos
async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query('ALTER TABLE ratings DROP FOREIGN KEY ratings_ibfk_2');
    await connection.query('ALTER TABLE ratings DROP FOREIGN KEY ratings_ibfk_1');
    await connection.query('DROP TABLE IF EXISTS links');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS ratings');


    console.log('Creando las tablas de la base de datos');

    await connection.query(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        image VARCHAR(200) NULL DEFAULT NULL,
        description TEXT NULL DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);
    await connection.query(`
    CREATE TABLE links (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        url VARCHAR(200) NOT NULL,
        titulo VARCHAR(200) NOT NULL,
        description VARCHAR(200) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `);
    await connection.query(`
    CREATE TABLE ratings (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        link_id INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (link_id) REFERENCES links(id)
    );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
