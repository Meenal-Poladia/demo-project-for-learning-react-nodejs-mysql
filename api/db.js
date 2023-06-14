import mysql from 'mysql';

export const db = mysql.connection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlroot',
    database: 'blog'
});