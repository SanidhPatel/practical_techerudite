import mysql from 'mysql2/promise'; // Use mysql2/promise for promises
import dotenv from 'dotenv';

dotenv.config();

// Create a pool with promise-based API
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Error while connecting to the database:', error);
    }
}

// Run the test function
testConnection();

export default pool;
