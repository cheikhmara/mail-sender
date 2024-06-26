const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

// Configure AWS SDK
AWS.config.update({
  region: 'eu-west-3' // Remplacez par votre région (Paris)
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  // Vous pouvez ajuster cette partie en fonction de la structure de la charge utile de Directus
  const { email, subject, text, html } = req.body;

  const params = {
    Source: 'pothrek@gmail.com', // Remplacez par votre adresse email vérifiée
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8'
      },
      Body: {
        Text: {
          Data: text,
          Charset: 'UTF-8'
        },
        Html: {
          Data: html,
          Charset: 'UTF-8'
        }
      }
    }
  };

  try {
    const result = await ses.sendEmail(params).promise();
    res.status(200).send(`Email envoyé avec succès: ${result.MessageId}`);
  } catch (error) {
    res.status(500).send(`Erreur lors de l'envoi de l'email: ${error.message}`);
    console.log(`Données (Subject: ${params.Message.Subject.Data})`)
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
