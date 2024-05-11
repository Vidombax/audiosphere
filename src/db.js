import pg from 'pg';
const db = new pg.Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    database: 'audiosphere',
})

export default db;