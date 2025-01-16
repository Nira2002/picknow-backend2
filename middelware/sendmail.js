import { createTransport } from "nodemailer";

const sendMail = async (email, subject, text) => {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.GMAIL, // Ensure this environment variable is set
            pass: process.env.PASSWORD, // Ensure this environment variable is set
        },
    });

    await transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject,
        text,
    });
};

export default sendMail;
