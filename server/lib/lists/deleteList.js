const pool = require('../db')


const deleteList = async(req, res)=>{
    try{
        const {id} = req.body
        const deleteList = await pool.query(
            `DELETE FROM lists WHERE id = $1`, 
            [id]
        )
        if(deleteList.rowCount === 0){
            return res.status(400).json({message : 'List not deleted, try again'})
        }
        res.status(200).json({message : 'List deleted'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal server error'})
    }
}

module.exports = deleteList