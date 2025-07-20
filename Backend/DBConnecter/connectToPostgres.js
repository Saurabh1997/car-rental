import { PrismaClient } from "@prisma/client";
export const prismaClient = new PrismaClient();

export const connectPostgresDB = async () => {
  try {
    const client = new Client({
      connectionString:
        "postgresql://postgres://avnadmin:AVNS_ntcX8_Zuk7k2dERJFSc@pg-377e36b8-activity-tracker.c.aivencloud.com:26005/defaultdb?sslmode=require",
    });
    await client.connect();
    console.log(" client is conencted ");
    const result = await client.query(`CREATE TABLE dev_users (
    pk_user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) `);
    //   THIS DIRECT QUERIES CAN CAUSE SQL INJECTIONS AS WE ARE DIRECTLY INSERTING.
    //   const result = await client.query(`INSERT INTO dev_users (
    //       username,
    //       name ,
    //       email
    //     ) VALUES ('saurabh123', 'Saurabh Patil', 'patil@gmail.com')`);
    //   Instead use parameterized queries.. -
    //   const insertQuery = `INSERT INTO dev_users (
    //         username,
    //         name ,
    //         email
    //       ) VALUES ($1, $2, $4)`;
    //   const Values = ["gauravgap123", "gaurav patil", "gap123@gmail.com"];
    //   const result = await client.query(insertQuery, Values);
  } catch (error) {
    console.log(" error is there", error);
  }
};
