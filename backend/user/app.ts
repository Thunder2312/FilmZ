const express = require('express');
const { pool } = require('../src/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const { authenticateToken } = require('../authentication/authentication'); // Correct import
const {checkRole} = require('../authentication/checkRole')
require('dotenv').config();
router.get('/', async (req:any, res:any) => {
  try {
    const result = await pool.query('SELECT * from users');
    res.json(result.rows)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /register — register a new user
router.post('/register', async (req:any, res:any) => {
  try {
    const requestTime = new Date();
    const istDateTime = requestTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const { username, full_name, email, phone, password, role} = req.body;

    if (!username || !full_name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const result = await pool.query(
      `INSERT INTO users (username, full_name, email, phone, hash, role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING user_id, username, full_name, email, phone, created_at`,
      [username, full_name, email, phone, hashedPassword, role, istDateTime]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /login — login a user
router.post('/login', async(req:any, res:any)=>{
  try{
    const {username, password} = req.body;
    if(!username || !password){
      return res.status(400).json({ error: 'Missing required fields' });
    }
    //pull password
    const result = await pool.query(`SELECT * from users where username=$1`,[username])
    const user = result.rows[0];
    //compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if(!isMatch){
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({
      user_id: user.user_id,
      username: user.username
      },
    process.env.SECRET_TOKEN,{
      expiresIn: '15m'
      }
    );
    
    res.status(200).json({message: 'Login Succesfull', token: accessToken})

  }catch(error){
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/addMovie', authenticateToken, checkRole, async(req:any,res:any,next:any)=>{
  try{
    const {title, description, duration, genre, language, rating, release_date} = req.body;
    if(!title || !description || !duration || !genre || !language || !rating || !release_date){
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO movies (title, description, duration_minutes, genre, language, rating, release_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING title, description, duration_minutes, genre, language, rating, release_date`,
      [title, description, duration, genre, language, rating, release_date]
    );
    res.status(200).json({message: "Movie Added"})
  }
  catch(error){
    console.error('Error adding screen:', error);
  }
})
module.exports = router;
