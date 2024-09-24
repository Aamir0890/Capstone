const userRepository=require('../repository/user')
const bcrypt=require('bcrypt')

exports.createUser=async(data)=>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password=hashedPassword
    return await userRepository.createUser(data)
}

exports.loginUser=async(email,password)=>{
    
    return await userRepository.authenticate(email,password)
}

exports.updateUser=async(id,data)=>{
    return await userRepository.updateUser(id,data)
}

exports.getUserById=async(id)=>{
    return await userRepository.getUserById(id)
}
exports.deleteUser=async(id)=>{
    return await userRepository.deleteUser(id);
}

