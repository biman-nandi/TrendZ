// import { Pool } from "pg";

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// })

// pool.connect((error) => {
//     if (error) {
//         console.error('Connection error', error.stack)
        
//     } else {
//         console.log('Connected to PostgreSQL database')
//     }
// })

// export { pool }


import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("PostgreSQL Error:", err);
});

export { pool };