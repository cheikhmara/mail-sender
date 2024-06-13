const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilisez le service email de votre choix
  auth: {
    user: 'pothrek@gmail.com',
    pass: 'Dokokhamsaysay1$' // Pour des raisons de sécurité, utilisez des variables d'environnement
  }
});

// Route pour envoyer un email
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'pothrek@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Email sent: ' + info.response });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://192.168.1.15:${port}`);
});
