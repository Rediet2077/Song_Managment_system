const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {

        const {name, email, password} = req.body;


        // Check existing user
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );


        if(existingUser.rows.length > 0){
            return res.status(400).json({
                message:"Email already exists"
            });
        }


        // Encrypt password
        const hashedPassword = await bcrypt.hash(password,10);


        // Save user
        const result = await pool.query(
            `INSERT INTO users(name,email,password)
             VALUES($1,$2,$3)
             RETURNING *`,
            [
                name,
                email,
                hashedPassword
            ]
        );


        res.status(201).json({
            message:"User created successfully",
            user:result.rows[0]
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};
const loginUser = async (req,res)=>{

    try{

        const {email,password}=req.body;


        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );


        if(result.rows.length === 0){
            return res.status(400).json({
                message:"User not found"
            });
        }


        const user = result.rows[0];


        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if(!passwordMatch){
            return res.status(400).json({
                message:"Wrong password"
            });
        }


        const token = jwt.sign(
            {
                id:user.id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );


        res.json({
            message:"Login successful",
            token:token,
            user:{
                id:user.id,
                name:user.name,
                role:user.role
            }
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};