import app from './app.js';
import pool from './src/config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const startServer = async () => {
  try {
    // Connect ke database 
    const connection = await pool.getConnection();
    console.log('Connection to Database succesfull');
    connection.release();

    // Jalankan express 
    app.listen(port, () => {
      console.log('Server is running')
    })
  }
  catch (error) {
    console.error('Server is stopping:', error)
    process.exit(1);
  }
}

startServer();
