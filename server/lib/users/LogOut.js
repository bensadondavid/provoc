
const logOut = (req, res)=>{
    try{
        res.clearCookie('access-token', {
            httpOnly: true,
            sameSite: 'lax', // none en prod
            secure: false, //true en prod
            path : '/'
        })
    res.status(200).json({message : 'Log out successfull'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Try again'})
    }
}

module.exports = logOut