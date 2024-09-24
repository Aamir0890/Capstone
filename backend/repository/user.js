const {models:{User}}=require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt=require('bcrypt');
const { Op } = require('sequelize');


exports.createUser=async(userData)=>{
    return await User.create(userData)
}

exports.authenticate=async(email,password)=>{
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Authentication failed. User not found.');
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  throw new Error('Authentication failed. Wrong password.');
}

const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
return token;

}

exports.updateUser = async (id, updatedData) => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.update(updatedData);
  }
  throw new Error('User not found');
};


exports.getUserById = async (id) => {
    const user=await User.findByPk(id);;
if(user){
  return user;
}
else {throw new Error("User not found")}
  };


exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  throw new Error('User not found');
};

exports.getUserByEmail=async(email)=>{
 
  const user= await User.findOne({ where: { email } });
return user
}


exports.findUsersByEmails = async (emails) => {
  return User.findAll({
      where: {
          email: {
              [Op.in]: emails
          }
      }
  });
};