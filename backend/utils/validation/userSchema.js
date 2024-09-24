const {z}=require('zod')

 const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  name: z.string().min(1, { message: "Username is required" })
});
 

module.exports=userSchema