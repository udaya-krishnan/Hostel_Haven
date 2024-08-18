import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

const EMAIL=process.env.EMAIL!
const PASS=process.env.PASS!


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // or the appropriate port for your SMTP server
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL,
      pass: PASS
    }
  });

const sendMail=async(email:string,otp:string,name:string)=>{
    try {
        console.log(`EMAIL: ${process.env.EMAIL}`);
console.log(`PASS: ${process.env.PASS}`);



        const date=new Date().toString()
        let message:any={
            from:EMAIL,
            to:email,
            subject:"HOSTEL HAVEN Verification",
            text:"Hello, thank you for registering",
            html:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Hostel Booking Confirmation</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #EEEDEB;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #E0CCBE;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
                <h1 style="color: #3C3633; font-size: 24px; font-weight: 600;">Hostel Haven</h1>
              </td>
              <td style="text-align: right;">
                <span style="font-size: 16px; line-height: 30px; color: #747264;">
                  ${date}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h2
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #3C3633;
              "
            >
              Your OTP Code
            </h2>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
                color: #3C3633;
              "
            >
              Hello ${name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
                color: #747264;
              "
            >
              Thank you for choosing Hostel Haven. Use the following OTP to confirm your booking. The OTP is valid for <span style="font-weight: 600; color: #3C3633;">5 minutes</span>. Please do not share this code with anyone.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #BA3D4F;
              "
            >
              ${otp}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Contact us at
          <a
            href="mailto:support@hostelhaven.com"
            style="color: #499fb6; text-decoration: none;"
            >support@hostelhaven.com</a
          >
          or visit our
          <a
            href=""
            target="_blank"
            style="color: #499fb6; text-decoration: none;"
            >Help Center</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #E0CCBE;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          Hostel Haven
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Address 540, City, State.
        </p>
        <div style="margin: 0; margin-top: 16px;">
          <a href="" target="_blank" style="display: inline-block;">
            <img
              width="36px"
              alt="Facebook"
              src="https://example.com/facebook-icon"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://example.com/instagram-icon"
          /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://example.com/twitter-icon"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://example.com/youtube-icon"
          /></a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2024 Hostel Haven. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>

`
        }


       await transporter.verify((error, success) => {
            if (error) {
                console.error('Error in SMTP configuration:', error);
            } else {
                console.log('SMTP configuration is correct.');
            }
        });

        const mailed=await transporter.sendMail(message,(error)=>{
            if(error){
                console.error(error)
            }else{
                console.log('message sent successfully');
                
            }
        })
        
    } catch (error) {
        
    }
}



export default sendMail