const pool = require('../db')


const updateWord = async(req, res)=>{
    try{
        const {id, firstLanguage, secondLanguage} = req.body
        const result = await pool.query(
            `UPDATE words
            SET first_language = $1, second_language = $2 WHERE id = $3
            RETURNING *`,
            [firstLanguage, secondLanguage, id]
        )
        if(result.rowCount === 0){
            return res.status(400).json({message : 'Error in updating the word'})
        }
        const word = result.rows[0]
        const updatedWord = {
            id : word.id,
            firstLanguage : word.first_language,
            secondLanguage : word.second_language,
            createdAt : word.created_at
        }
        res.status(200).json({message : 'Word updated', updatedWord})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal server error'})
    }
}

module.exports = updateWord