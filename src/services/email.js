import nodemailer from 'nodemailer'
export async function sendEmail(dest, subject, message , attachments=[]) {
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodeMailerEmail, 
            pass: process.env.nodeMailerPassword,
        },
    });

    let info = await transporter.sendMail({
        from: `"Route" < ${process.env.nodeMailerEmail}>`, 
        to: dest, 
        subject, 
        html: message, 
        attachments
    });
    return info
}
