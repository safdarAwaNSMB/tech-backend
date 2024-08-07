const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const pug = require("pug");
dotenv.config({ path: "./config.env" });

exports.showForm = (req, res) => {
  res.render("contact");
};

exports.submitForm = (req, res) => {
  const { email, firstname, lastname, phone, subject, message } = req.body;
  console.log(req.body);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailBody = pug.renderFile(`${__dirname}/../views/emailTemplate.pug`, {
    firstname,
    lastname,
    email,
    phone,
    subject,
    message,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission: ${subject}`,
    html: emailBody,
  };
  console.log(email);

  const mailOptionsForUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thanks For Contacting Us",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Thank You for Getting in Touch!</h2>
        <p>Hi ${firstname} ${lastname},</p>
        <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
        <p>If you have any urgent queries, please feel free to reach out to us directly at ${process.env.EMAIL_USER}.</p>
        <p>Best regards,</p>
        <p>The InnovaTechStar Team</p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <p style="font-size: 0.9em; color: #888;">InnovaTechStar</p>
        <p style="font-size: 0.9em; color: #888;">+923431451403</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      return res.status(500).send("Error sending email.");
    }
  });
  transporter.sendMail(mailOptionsForUser, (error, info) => {
    if (error) {
      console.log("Error:", error);
      return res.status(500).send("Error sending email.");
    }
    res.status(200).json({ message: "Mail sent" });
  });
};
