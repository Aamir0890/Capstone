const ErrorHandler=require('../utils/errors/errorHandler')
const jwt=require('jsonwebtoken')
require('dotenv').config();
const {models:{User}}=require('../models')

const authenticate=async (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
   if(!token){
    return res.status(401).json({message:"toekn not provided"})
   }try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findByPk(decoded.id);
    
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    next();
   } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });

   }

}

module.exports=authenticate
