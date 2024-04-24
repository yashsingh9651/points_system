import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId, name }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        // add senders gmail to the .env file as NODE_USER
        user: process.env.NODE_USER,
        // Create an app on your gmail and add generated pass to the .env file as NODE_PASS
        pass: process.env.NODE_PASS,
      },
    });
    const mailOptions = {
      from: { name: "Akanksha Enterprises", address: process.env.NODE_USER },
      to: email,
      subject: `${
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password"
      }`,
      // add your domain to .env file as DOMAIN
      html: `<div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; margin-bottom: 10px;">
      </div>
      <img src="https://res.cloudinary.com/dbiavtnwu/image/upload/kesnpod4krlould2r7uk.jpg" alt="Akanksha Enterprises Logo" style="display: block; margin: 0 auto; max-width: 100px; margin-bottom: 20px;">
      <p style="color: #666666; margin-bottom: 20px;">Hello ${name},</p>
      <p style="color: #666666; margin-bottom: 20px;">${
        emailType === "VERIFY"
          ? "Thank you for signing up with us! Your new account has been setup Verify to login"
          : "No Worries Change your Password Easily"
      }</p>
      <p style="color: #666666; margin-bottom: 20px;">Click <a href="${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verifyemail" : "resetPass/verify"
      }?token=${hashedToken}" style="color: #007bff;">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link to your browser.</p>
      <p style="color: #666666; margin-bottom: 20px;">${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetPass/verify"
      }?token=${hashedToken}</p>
      <p style="color: #666666; margin-bottom: 20px;">Yours Truly,</p>
      <p style="color: #666666; margin-bottom: 20px;">Akanksha Enterprises</p>
      </div>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
