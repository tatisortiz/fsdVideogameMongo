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

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: true,
                    message: 'email and password are required'
                }
            )
        }

        const user = await User.findOne(
            {
                email: email
            }
        )

        console.log(user)

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email or password are invalid'
                }
            )
        }

        const passwordVerified = bcrypt.compareSync(password, user.password)

        if (!passwordVerified) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email or password are invalid'
                }
            )
        }

        const token = jwt.sign(
            {
                _id: user._id,
                roles: user.roles,
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )

        res.status(200).json(
            {
                success: true,
                message: 'User logged',
                data: token
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error loggin user',
                error: error
            }
        )

    }
}