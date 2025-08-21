const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bagussender@gmail.com',
        pass: 'xgqdblqzarqvtioh'
    }
});

app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    

    const mailOptions = {
        from: `"Code Good" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email berhasil dikirim!" });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengirim email", error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server berjalan di port ${PORT}`));
