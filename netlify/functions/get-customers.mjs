import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const result = await pool.query(
      `SELECT cust_id, cust_name, cust_mobile, cust_address
       FROM "FurniLedger".customer
       ORDER BY cust_id DESC`
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching customers:", error);

    return {
      statusCode: 500,
      body: "Failed to fetch customers",
    };
  }
}

