import bcrypt from "bcrypt"
import User from "./user.models.js";
import jwt from "jsonwebtoken"

export const register=  async (req, res) => {
try {
    const {email, password} = req.body

 const hashedPassword=  bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))

 const newUser= await User.create(
    {
        email: email,
        password: hashedPassword
    }
 )

 res.status(200).json(
    {
        success: true,
        message: "User registeres",
        data: newUser
    }
 )
    
} catch (error) {
    res.status(500).json(
        {
            success: false,
            message: "Error registering user",
            error : error.message
        }
    )
    
}
}

export const login= async (req,res) => {
    try {
        //recuperamos
        const { email, password } = req.body;

    // validamos
    // if (!email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email and password are needed",
    //   });
    // }

 
    const user = await User.findOne({
       email: email ,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user or password not valid",
      });
    }

    const token = jwt.sing(
        {
            id: user_id,
            role: user.role

        },

        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )

    res.status(200).json(
        {
            success: true,
            message: "user loggin",
            data: token
        }
    )




    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "user or password not valid",
      });
    }
    } catch (error) {
      res.status(500).json(
        {
           success: false,
           message: "Error loggin user"
        }
      )
        
    }
}