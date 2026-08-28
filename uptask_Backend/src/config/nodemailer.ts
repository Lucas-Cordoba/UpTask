import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const config = () => {
    return {
        host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT, //se le pone mas para convertirlo a numero y que no sea string sino nos da error el config()
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
    }
}
export const transporter = nodemailer.createTransport(config());