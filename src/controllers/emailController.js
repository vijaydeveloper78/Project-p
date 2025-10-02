// Controller to handle contact form submissions and send emails
import Mailer from '../services/mailer.js';
import emailConfig from '../config/email.js';

const mailer = new Mailer(emailConfig);

export const handleContactForm = async (req, res) => {
  const { name, email, company, message } = req.body;

  // Email to admin
  const adminMailData = {
    body: `
      <b>Name:</b> ${name}<br>
      <b>Email:</b> ${email}<br>
      <b>Company:</b> ${company || 'N/A'}<br>
      <b>Message:</b><br>${message}
    `
  };

  // Auto-reply to user
  const userMailData = {
    body: `
      Dear ${name || 'User'},<br><br>
      Thank you for contacting us! We have received your message and will get back to you soon.<br><br>
      <b>Your Message:</b><br>${message}<br><br>
      Regards,<br>
      ArthzoneTech Team
    `
  };

  try {
    // Send to admin (set CONTACT_RECEIVER in .env)
    await mailer.sendEmail(process.env.CONTACT_RECEIVER, 'New Contact Form Submission', adminMailData);

    // Auto-reply to user
    await mailer.sendEmail(email, 'Thank you for contacting ArthzoneTech', userMailData);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};