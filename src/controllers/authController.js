import { sql } from "../config/db.js";
import crypto from "crypto";

export async function signUp(req, res) {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: "Valid email is required" });
        }

        // Check if user already exists
        const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const userId = crypto.randomUUID();

        // Create user with verification code
        const newUser = await sql`
            INSERT INTO users (id, email, verification_code, is_verified)
            VALUES (${userId}, ${email}, ${verificationCode}, false)
            RETURNING id, email, verification_code
        `;

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser[0].id,
                email: newUser[0].email,
                verificationCode: newUser[0].verification_code
            }
        });

    } catch (error) {
        console.log("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function verifyEmail(req, res) {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ message: "Email and verification code are required" });
        }

        // Verify the code
        const user = await sql`
            SELECT * FROM users 
            WHERE email = ${email} AND verification_code = ${verificationCode}
        `;

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        // Mark user as verified
        await sql`
            UPDATE users 
            SET is_verified = true, verification_code = NULL
            WHERE email = ${email}
        `;

        res.status(200).json({
            message: "Email verified successfully",
            user: {
                id: user[0].id,
                email: user[0].email
            }
        });

    } catch (error) {
        console.log("Error in email verification:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function login(req, res) {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: "Valid email is required" });
        }

        // Check if user exists and is verified
        const user = await sql`
            SELECT * FROM users 
            WHERE email = ${email} AND is_verified = true
        `;

        if (user.length === 0) {
            return res.status(400).json({ message: "User not found or not verified" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user[0].id,
                email: user[0].email
            }
        });

    } catch (error) {
        console.log("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function resendVerificationCode(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if user exists
        const user = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate new verification code
        const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Update verification code
        await sql`
            UPDATE users 
            SET verification_code = ${newVerificationCode}
            WHERE email = ${email}
        `;

        res.status(200).json({
            message: "New verification code sent",
            verificationCode: newVerificationCode
        });

    } catch (error) {
        console.log("Error in resending verification code:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
