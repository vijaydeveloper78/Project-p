 import nodemailer from 'nodemailer';

class Mailer {
  constructor(emailConfig) { 
    this.transporter = nodemailer.createTransport(emailConfig);
    this.from = emailConfig.auth.user;  
  }

  async sendEmail(to, subject, messageData) { 
    const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 6px; overflow: hidden;">
        <div style="background-color: #007BFF; color: #fff; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">${subject}</h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; line-height: 1.5;">
            ${messageData.body}
          </p>
          ${
            messageData.ctaUrl
              ? `<div style="text-align:center;margin-top:20px;">
                <a href="${messageData.ctaUrl}" 
                  style="display:inline-block;background-color:#007BFF;color:#fff;padding:10px 20px;text-decoration:none;border-radius:4px;">
                  ${messageData.ctaText || 'View Details'}
                </a>
              </div>`
              : ''
          }
        </div>
        <div style="background-color:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#888;">
          This is an automated email from your website contact form.
        </div>
      </div>
    </div>
    `;

    const mailOptions = {
      from: this.from,
      to,
      subject,
      text: messageData.body, 
      html: htmlTemplate, // here i add the email Tamplate of the contact.
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error('Error sending email: ' + error.message);
    }
  }
}

export default Mailer;