const pool = require('../db')


const getLastSession = async(req, res)=>{
    try{
        const results = await pool.query(
            `SELECT id, name FROM lists`
        )
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}


module.exports = getLastSession