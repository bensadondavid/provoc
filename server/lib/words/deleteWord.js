const pool = require('../db')


const deleteWord = async(req, res)=>{
    try{
        const {id} = req.body
        const deleteWord = await pool.query(
            `DELETE FROM words WHERE id = $1`, 
            [id]
        )
        if(deleteWord.rowCount === 0){
            return res.status(400).json({message : 'Word not deleted, try again'})
        }
        res.status(200).json({message : 'Word deleted'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal server error'})
    }
}

module.exports = deleteWord