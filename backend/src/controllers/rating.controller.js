const pool = require("../config/database");


const addRating = async(req,res)=>{

    try{

        const user_id = req.user.id;

        const {
            song_id,
            rating
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO ratings(user_id,song_id,rating)
            VALUES($1,$2,$3)
            RETURNING *
            `,
            [
                user_id,
                song_id,
                rating
            ]
        );


        res.status(201).json({
            message:"Rating added successfully",
            rating:result.rows[0]
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};


module.exports={
    addRating
};