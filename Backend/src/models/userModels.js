import db from '../config/db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/mailer.js'

export const User = {
    async registerUser(bodyData) {
        try {
            // Check if email already exists
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [bodyData?.email]);

            if (rows.length > 0) {
                return { status: 409,data: { message: "Email already exists" }};
            } else {
                // Hash the password
                const hashPassword = await bcrypt.hash(bodyData?.password, 10);

                // Prepare user data
                const userData = {
                    role_id: bodyData?.role_id,
                    first_name: bodyData?.first_name,
                    last_name: bodyData?.last_name,
                    email: bodyData?.email,
                    password: hashPassword
                };

                // Insert new user
                await db.query(
                    'INSERT INTO users (role_id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
                    [userData.role_id, userData.first_name, userData.last_name, userData.email, userData.password]
                    
                );
                const token = jwt.sign({"email": bodyData?.email}, process.env.SECRET_KEY, { expiresIn: '1h' });
                sendVerificationEmail(bodyData?.email, token);
                return { status: 200, data: {message: "User registered successfully" }};
            }
        } catch (error) {
            throw error;
        }
    },

    async loginUser(bodyData) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [bodyData?.email]);

            if (rows.length == 0) {
                return { status: 404, data: { message: "Email not found." } };
            } else {
                const [rows] = await db.query('SELECT users.id, users.email, users.password, users.id, users.is_verified, roles.name FROM users JOIN roles ON users.role_id = roles.id WHERE users.email = ?', [bodyData?.email]);
                if (rows.length > 0 && rows[0]?.name == 'customer') {
                    return { status: 403, data: { message: "You are not allowed to login from here." } };
                }else if (rows.length > 0 && rows[0]?.is_verified == '0'){
                    return { status: 403, data: { message: "Your Email is not verified." } };
                } else {
                    const checkPassword = await bcrypt.compare(bodyData?.password, rows[0]?.password);
                    if (!checkPassword) {
                        return { status: 401, data: { message: "Incorrect password" } };
                    } else {
                        const payload = {
                            userId: rows[0].id,
                            email: rows[0].email
                        };

                        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
                        await db.query(
                            'INSERT INTO user_tokens (user_id, token) VALUES (?, ?)',
                            [rows[0].id, token]
                        );

                        let data = {
                            message: "Login successfully",
                            token: token
                        }
                        return { status: 200, data: data };
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    },

    async verifyUserEmail (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userEmail = decoded.email;
    
            await db.query(`UPDATE users SET is_verified = '1' WHERE email = ?`, [userEmail]);
    
            return { status: 200, data:"Email Verified successfully" };
    
        } catch (error) {
            throw error;
        }
    }
    
};