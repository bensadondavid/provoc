const pool = require('../db')

const getAllLists = async(req, res)=>{
    try {
        const userId = req.user.userId
        const result = await pool.query(
            `SELECT * FROM lists WHERE user_id = $1`,
            [userId]
        )
        if(result.rowCount === 0){
            return res.status(400).json({message : 'No list found'})
        }
         const newLists = result.rows.map(list => ({
            id: list.id,
            name: list.name,
            firstLanguage: list.first_language,
            secondLanguage: list.second_language,
            lastReviewed: list.last_reviewed,
            wordsNumber: list.words_number,
            createdAt: list.created_at
        }));
        res.status(200).json({message : 'Fetch Successfull', lists : newLists})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

module.exports = getAllLists