const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../public/database/config.db');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users/'

        this.connectionDB();

        this.middleware();

        this.routes();
    };

    async connectionDB(){
        await dbConnection();
    }

    middleware(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    };

    routes(){
        this.app.use(this.usersPath, require('../public/routes/users.routes'));
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log(`El puerto abiero es ${this.port}`);
        });
    };
};

module.exports = Server;