const pool = require('../db')


const getList = async(req, res)=>{
    try{
        const {name} = req.params
        const searchList = await pool.query(
            `SELECT * FROM lists WHERE name = $1 `,
            [name]
        )
        if(searchList.rows.length === 0){
            return res.status(400).json({message : 'No list found'})
        }
        const list = searchList.rows[0]
        const newList = {
            name : list.name,
            firstLanguage : list.first_language,
            secondLanguage : list.second_language
        }

        const result = await pool.query(
            `SELECT * FROM words WHERE list_id = $1`,
            [list.id]
        )
        const words = result.rows
        const newWords = words.map((word) => ({
            id: word.id,
            name: word.name,
            firstLanguage: word.first_language,
            secondLanguage: word.second_language,
            createdAt: word.created_at
        }));
        res.status(200).json({message : 'Words found', list : newList, words : newWords})
    }
    catch(error){
        console.log(error)
        res.status(400).json({message : 'Internal server error'})
    }
}

module.exports = getList