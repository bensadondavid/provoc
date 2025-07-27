const pool = require('../db')
const bcrypt = require('bcryptjs')

const signUp = async(req, res)=>{

    const { username, email, password } = req.body

    try{
        // Look for an existing user
        const user = await pool.query(
            `SELECT * FROM users WHERE
             username = $1
             OR LOWER(email) = LOWER($2)`,
            [username, email]
        )
         if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' })
        }
        if(user.rows.length !== 0){
            return res.status(409).json({message : 'Username or email already taken'})
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        // Creating a new user
         await pool.query(
            `INSERT INTO users (username, email, hashed_password)
            VALUES($1, $2, $3) 
            RETURNING *`,
            [username, email, hashedPassword]
        )
        res.status(201).json({message : 'New user added'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal error'})
    }
}

module.exports = signUp