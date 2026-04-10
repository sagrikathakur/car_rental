import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });


const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Neon Postgres connected successfully");
    client.release();
  } catch (error) {
    console.log("Neon Postgres connection failed:", error.message);
  }
};

export { pool };
export default connectDB;