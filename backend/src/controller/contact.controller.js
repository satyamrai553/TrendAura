
import { Request, Response } from 'express';
import nodemailer from 'nodemailer'; 
import { asyncHandler } from '../utils/asyncHandler.js';

export const sendContactMessage = asyncHandler(async(req,res)=>{ 
  const { name, email, message } = req.body;

  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'satyamrai553@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: email,
    to: 'satyamrai550@gmail.com',  
    subject: `New message from ${name}`,
    text: message,
  };


  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send the message. Please try again later.' });
  }
});
