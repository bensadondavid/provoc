const pool = require('../db')


const addWord = async(req, res)=>{
    try{
        const {firstLanguage, secondLanguage, listId} = req.body
        const first = firstLanguage.trim().toLowerCase()
        const second = secondLanguage.trim().toLowerCase()
        const exist = await pool.query(
            `SELECT * FROM words WHERE list_id = $1 AND (first_language = $2 OR second_language = $3)`,
            [listId, first, second]
        )
        if(exist.rows.length !== 0){
            return res.status(400).json({message : 'The word already exists in this list'})
        }

        const result = await pool.query(
            `INSERT INTO words (first_language, second_language, list_id) VALUES($1, $2, $3) RETURNING *`,
            [first, second, listId]
        )
        if(result.rowCount === 0){
            return res.status(400).json({message : 'An error has occured'})
        }
        const word = result.rows[0]
        const newWord = {
            id: word.id,
            firstLanguage: word.first_language,
            secondLanguage: word.second_language,
            createdAt: word.created_at
            }
        res.status(200).json({message : 'New word added', newWord : newWord})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal server error'})
    }
}


module.exports = addWord