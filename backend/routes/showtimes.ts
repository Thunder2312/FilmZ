const express = require('express');
const { pool } = require('../src/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const { authenticateToken } = require('../authentication/authentication'); // Correct import
const {checkRole} = require('../authentication/checkRole')
require('dotenv').config();

router.post('addShowTimes', authenticateToken, checkRole, async(req:any, res:any)=>{
    try{
        const {movie_id, screen_id, start_time, end_time, price} = req.body;
        if(!movie_id || !screen_id || !start_time ||!end_time || !price){
            return res.status(400).json({ message: "Incomplete data sent from request" });
        }
        const result = await pool.query("INSERT INTO showtimes (movie_id, screen_id, start_time, end_time, ticket_price) VALUES($1, $2, $3, $4, $5)", [movie_id, screen_id, start_time, end_time, price]);
        return res.status(200).json({message: "Showtime added to theater"})
    }catch(error){
        return res.status(500).json({message: "Server Error"})
    }
})


module.exports = router;