const express = require('express');
const { pool } = require('../src/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const { authenticateToken } = require('../authentication/authentication'); // Correct import
const {checkRole} = require('../authentication/checkRole')
require('dotenv').config();

router.get('/getShowTimes', authenticateToken, checkRole, async (req: any, res: any) => {
    try {
        const { startDate, endDate } = req.query;
//get movie title, theater name, screen name, start time of movie, end time of movie, order by date of the showtime
        const sql = `
            SELECT 
                st.showtime_id,
                m.title AS movie_title,
                t.name AS theater_name,
                s.name AS screen_name,
                st.start_time,
                st.end_time,
                st.ticket_price
            FROM showtimes st
            JOIN movies m ON st.movie_id = m.movie_id
            JOIN screens s ON st.screen_id = s.screen_id
            JOIN theaters t ON s.theater_id = t.theater_id
            WHERE ($1::date IS NULL OR st.start_time::date >= $1::date)
              AND ($2::date IS NULL OR st.start_time::date <= $2::date)
            ORDER BY st.start_time ASC;
        `;

        const params = [
            startDate || null,
            endDate || null
        ];

        const result = await pool.query(sql, params);

        res.json(result.rows);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/addShowTimes', authenticateToken, checkRole, async(req:any, res:any)=>{
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