const pool = require('../db');


const globalStats = async(req, res)=>{
    try{
        const userId = req.user.userId
        const result = await pool.query(
            `SELECT * FROM stats WHERE user_id = $1`,
            [userId]
        )
        if(result.rows.length === 0){
            return res.status(200).json({
                message: 'No stats found',
                allStats: {
                totalSession: 0,
                totalScore: 0,
                totalWordsPlayed: 0,
                averageAccuracy: 0
    }
  });
        }
        const stats = result.rows
        const totalSession = stats.length
        const totalScore = stats.reduce((sum, stat)=>sum + stat.score, 0)
        const totalWordsPlayed = stats.reduce((sum, stat)=> sum + stat.total, 0)
        const sumAccuracy = stats.reduce((sum, stat) => sum + stat.accuracy, 0);
        const totalAccuracy = Number((sumAccuracy / totalSession).toFixed(2));

        const allStats = {
            totalSession,
            totalScore,
            totalWordsPlayed,
            totalAccuracy
        }
        res.status(200).json({message : 'Stats found', allStats})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

module.exports = globalStats