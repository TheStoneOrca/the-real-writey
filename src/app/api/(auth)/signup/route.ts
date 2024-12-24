import { NextResponse } from "next/server";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      database: "writing-site",
      port: 5432,
    });

    await db.connect();
    const data = await request.json();

    if (!data.username || !data.password || !data.email) {
      return NextResponse.json({ status: 404 });
    }

    const checkUsername = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [data.username]
    );
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      data.email,
    ]);

    if (checkUsername.rows.length > 0 || checkEmail.rows.length > 0) {
      return NextResponse.json({ status: 409 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = await db.query(
      "INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING userid, username, email",
      [data.username, hashedPassword, data.email]
    );

    await db.end();

    const userToken = jwt.sign(
      userData.rows[0],
      process.env.jsonWebTokenSecret as string
    );

    return NextResponse.json({ status: 200, userToken: userToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
