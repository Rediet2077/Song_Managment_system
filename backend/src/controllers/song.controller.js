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
const updateSong = async (req,res)=>{

    try{

        const {id} = req.params;

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
            `
            UPDATE songs
            SET 
            title=$1,
            artist=$2,
            genre=$3,
            album=$4,
            lyrics=$5,
            audio_url=$6,
            image_url=$7

            WHERE id=$8

            RETURNING *
            `,
            [
                title,
                artist,
                genre,
                album,
                lyrics,
                audio_url,
                image_url,
                id
            ]
        );


        if(result.rows.length===0){

            return res.status(404).json({
                message:"Song not found"
            });

        }


        res.json({
            message:"Song updated successfully",
            song:result.rows[0]
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

module.exports={
    createSong,
    getSongs,
    updateSong
};