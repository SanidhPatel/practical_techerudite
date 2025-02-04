import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


export const sendVerificationEmail = (userEmail, token) => {
    const link = `http://localhost:${process.env.PORT}/user/verify-email?email_token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Email Verification',
        html: `<p>Please verify your email using the link:</p><a href="${link}">Verify Email</a>`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ', error);
        } else {
            console.log('Verification email sent: ', info.response);
        }
    });
};
