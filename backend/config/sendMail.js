import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail= async(to,otp)=>{
    try{
        console.log("Sending mail to:", to);

        const info = await transporter.sendMail({
        from: process.env.USER_EMAIL, // sender address
        to: to, // list of recipients
        subject: "Reset your password", // subject line
        html: `<p>Your OTP for password Reset is <b>${otp}</b>. It expires in 5 minutes.</p>`// HTML body
      });

      console.log("Mail sent:", info.messageId);
      }
    catch (err) {
        console.error("Error while sending mail:", err);
    }
}

export default sendMail