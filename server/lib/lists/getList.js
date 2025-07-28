const pool = require('../db')

const getList = async(req, res)=>{
    try {
        const userId = req.user.userId
        const result = await pool.query(
            `SELECT * FROM lists WHERE id = $1`,
            [userId]
        )
        if(result.rowCount === 0){
            return res.status(400).json({message : 'No list found'})
        }

        const wordsNumber = await Promise.all(result.rows.map(async list=>{
            const count = await pool.query(
                `SELECT COUNT(*) FROM words WHERE list_id = $1`,
                [list.id]
            )
                return parseInt(count.rows[0].count,10)
            }
        ))

         const newLists = result.rows.map((list, index) => ({
            id: list.id,
            name: list.name,
            firstLanguage: list.first_language,
            secondLanguage: list.second_language,
            wordsNumber : wordsNumber[index],
            lastReviewed: list.last_reviewed,
            createdAt: list.created_at
        }));
        res.status(200).json({message : 'Fetch Successfull', lists : newLists})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

module.exports = getList