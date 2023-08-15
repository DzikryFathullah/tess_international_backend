import {Sequelize} from 'sequelize';

const db = new Sequelize(
    'tess_db', 
    'root', 
    '',
    { 
        host: 'localhost', 
        dialect:'mysql'
    }
);

export default db;
