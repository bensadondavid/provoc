const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const pool = require('../db')


const logIn = async(req, res)=>{

    const secret = process.env.JWT_SECRET
    try{
        const {usernameOrEmail, password} = req.body
        const result = await pool.query(
            `SELECT * FROM users WHERE LOWER(username) = LOWER($1) or LOWER(email) = LOWER($1)`,
            [usernameOrEmail]
        )
        if(result.rows.length === 0){
        return res.status(400).json({message : 'Unknown Email or Username'})
        }
        const user = result.rows[0]
        const verifyPassword = await bcrypt.compare(password, user.hashed_password)
        if(!verifyPassword){
            return res.status(400).json({message : 'Invalid credentials'})
        }
        const accessToken = jwt.sign({'userId' : String(user.id)}, secret, {expiresIn : '1h'})
        res.cookie('access-token', accessToken,{
            httpOnly : true, 
            sameSite : 'lax',
            secure : false,
            maxAge : 30 * 24 * 60 * 60 * 1000,
            path : '/'
        }
        )
        const safeUser = {
            id: user.id,
            username: user.username,
            email: user.email,
        }
        console.log('connected')
        res.status(200).json({message : 'Authentication successful', user : safeUser})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Error'})
    }
}

module.exports = logIn