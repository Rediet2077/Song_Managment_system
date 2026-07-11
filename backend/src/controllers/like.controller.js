const pool = require("../config/database");


const addLike = async(req,res)=>{

    try{

        const user_id = req.user.id;

        const {song_id} = req.body;


        const result = await pool.query(
            `
            INSERT INTO likes(user_id,song_id)
            VALUES($1,$2)
            RETURNING *
            `,
            [
                user_id,
                song_id
            ]
        );


        res.status(201).json({
            message:"Song liked successfully",
            like:result.rows[0]
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



module.exports = {
    addLike
};