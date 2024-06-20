import pg from 'pg';
const db = new pg.Pool({
    connectionString: "postgres://default:no1RIb8TrGeW@ep-quiet-night-a4e7kuyq-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

export default db;