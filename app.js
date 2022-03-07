const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");
let db=null;

const initializeDbAndServer= async()=>{
    try{
        db=await open({
            filename=dbPath,
            driver:sqlite3.Database,
        });
        app.listen(3000, () => 
            console.log("server Running at http://localhost:3000/");

        );
    }catch (e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};
initializeDBAndServer();
const convertDbobjtoResponse =(obj)=>{
    return{
        player_id : obj.player_id,
        player_name:obj.player_name,
        jersey_number:obj.jersey_number,
        role:obj.role,
    };
};

app.get('/players/', async (request,player) => {
    const getCricketQuery=`
    SELECT * FROM
    cricket_team;`;
    const cricketTeam = await db.all(getCricketQuery);
    response.send(
        cricketTeam.map((eachPlayer) => 
        convertDbobjtoResponse(eachPlayer)
        )
    );
});
app.get('/players/:playerId/', async (request,player) => {
    const {playerId}=request.params;
    const getCricketQuery=`
    SELECT * FROM
    cricket_team
    WHERE 
    player_id=${playerId};`;

    const player = await db.get(getCricketQuery);
    response.send(convertDbobjtoResponse(player));
});

module.exports =app;

