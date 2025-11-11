const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { pool } = require('../src/db');
require('dotenv').config();

async function checkRole(req:any, res:any, next:any){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
      }
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); 
        //use it to provide token data to other middleware
        req.user = decodedToken;
        const result = await pool.query(`SELECT * from users where username=$1`,[req.user.username])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = result.rows[0];
        //check role
        if (user.role_approval !== true) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    }catch (error:any) {
        console.error('Error in checkRole:', error.name, error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      
}

module.exports = {checkRole};