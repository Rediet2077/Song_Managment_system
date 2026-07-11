const pool = require("../config/database");


// CREATE SONG
const createSong = async(req,res)=>{

    try{

        const {
            title,
            artist,
            genre,
            album,
            lyrics,
            audio_url,
            image_url
        } = req.body;


        const result = await pool.query(
            `INSERT INTO songs
            (title,artist,genre,album,lyrics,audio_url,image_url)
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                title,
                artist,
                genre,
                album,
                lyrics,
                audio_url,
                image_url
            ]
        );


        res.status(201).json({
            message:"Song created successfully",
            song:result.rows[0]
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

const getSongs = async (req,res)=>{

    try{

        const result = await pool.query(
            "SELECT * FROM songs ORDER BY id DESC"
        );


        res.json(result.rows);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }


    
};

module.exports={
    createSong,
    getSongs
};