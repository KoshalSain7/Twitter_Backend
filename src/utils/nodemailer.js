import nodemailer from 'nodemailer';


export const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const info = await transporter.sendMail({
            from: '"Koshal S." KS Enterprises', // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line 
            html: `${body}`, // html body
        });
    } catch (error) {
        console.log("error in sending email via mailsender", error);
    }
}

