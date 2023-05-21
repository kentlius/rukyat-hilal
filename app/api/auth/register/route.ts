import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const {
    name,
    email,
    password,
    yearOfBirth,
    gender,
    phoneNumber,
    institution,
  } = await request.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return new Response("User already exists");
  } else {
    const verificationCode = Math.floor(Math.random() * 900000) + 100000;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
        verificationCode: verificationCode.toString(),
        phoneNumber,
        institution,
        yearOfBirth: Number(yearOfBirth),
        gender,
      },
    });
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Confirm Your Email",
      text: "Rukyat Hilal",
      html: `<p>Please click the following link to confirm your email address: <a href="${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/confirm?email=${email}&code=${verificationCode}">${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/confirm?email=${email}&code=${verificationCode}</a></p>`,
    });
    return new Response(JSON.stringify(user));
  }
}
