const pool = require('../db')


const getLastSession = async(req, res)=>{
    try{
        const userId = req.user.userId

        const result = await pool.query(
          `SELECT lists.name,stats.id, stats.score, stats.total, stats.accuracy, stats.completed_at FROM stats
          JOIN lists on stats.list_id = lists.id
          WHERE stats.user_id = $1
          ORDER BY stats.completed_at DESC
          LIMIT 5`,
          [userId]
        )
        if(result.rows.length === 0){
            return res.status(400).json({message : 'No last session'})
        }
        const lastsSessions = result.rows
        const newLastSessions = lastsSessions.map((last=>({
            name : last.name,
            id : last.id,
            score : last.score,
            total : last.total, 
            accuracy : last.accuracy, 
            completedAt : last.completed_at 
            }
        )))
        res.status(200).json({message : 'Last sessions found', newLastSessions})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}


module.exports = getLastSession