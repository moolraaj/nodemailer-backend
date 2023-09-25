const express = require('express')
require('./database/config.js')
const userSchema = require('./database/user.js')
const server = express()
const cors = require('cors')
server.use(cors());
server.use(express.json())
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
     service:'gmail',
    auth: {
      user: 'raaj889422@gmail.com',
      pass: 'qnjjiztshqcpzxii',
    },
  });
  
  server.post('/contact', async (req, res) => {
    let user = new userSchema(req.body);
    user=await user.save()
    let company='sparkweb solutions'

  
    const mailOptions = {
      from: 'raaj889422@gmail.com',
      to: `${user.email}`,
      subject: 'job regarding',
      text: `Thankyou your informations has been successfully sent to the ${company}`,
    };
    const adminMailOptions = {
        from: `${user.email}`,
        to: 'raaj889422@gmail.com', // Replace with the admin's email address
        subject: 'sms body',
        text:`\n
        Name : ${user.name}\n 
        Email : ${user.email}\n
        Phone : ${user.phone}\n
        Message : ${user.message}\n
        `
      };
  
    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email has been sent:', info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
    transport.sendMail(adminMailOptions, function (err, info) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Failed to send email' });
        } else {
          console.log('Admin email has been sent:', info.response);
          res.json({ message: 'Email sent successfully' });
        }
      });
  });

server.listen(7500)


 

 