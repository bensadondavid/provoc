const pool = require('../db')


const addList = async(req, res)=>{
    try{
        const user_id = req.user.userId
        const {name, firstLanguage, secondLanguage} = req.body
        const existing = await pool.query(
            `SELECT * FROM lists WHERE name = $1`,
            [name]
        )
        if(!existing.rows.length !== 0){
            return res.status(400).json({message : 'A list with this name already exists'})
        }
        await pool.query(
            `INSERT INTO lists (name, first_language, second_language, user_id) VALUES($1, $2, $3, $4)`,
            [name, firstLanguage, secondLanguage, user_id]
        )
        res.status(200).json({message : 'List created'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal server error'})
    }
}

module.exports = addList