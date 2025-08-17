const pool = require('../db')

const setStats = async(req, res)=>{
    try{
        const {listId, score, total} = req.body
        const userId = req.user.userId
        const accuracy = total === 0 ? 0 : (score / total) * 100
        const completedAt = new Date().toISOString()
        const result = await pool.query(
            `INSERT INTO stats (user_id, list_id, score, total, accuracy, completed_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userId, listId, score, total, accuracy, completedAt]
        )
        if(result.rows.length === 0){
            return res.status(400).json({message : 'Stats not saved'})
        }
        const newStats = result.rows[0]
        res.status(200).json({message : 'Stats add', newStats})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

module.exports = setStats