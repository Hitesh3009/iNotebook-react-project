const jwt = require('jsonwebtoken');
const secretKey = 'HiteshBho$@le';
const fetchuser=(req,res,next)=>{
    // Get the user info from the jwt token and add it to req object
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate with the valid token"});
    }
    try {     
        const data=jwt.verify(token,secretKey);
        req.info=data.userinfo;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate with the valid token"});
    }
}


module.exports=fetchuser;