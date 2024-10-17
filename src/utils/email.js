import nodemailer from "nodemailer";
export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "peteremad132oo5@gmail.com",
      pass: "hypyabwomuigartq",
    },
  });
  const info = await transporter.sendMail({
    from: "'<e-commerce-hti-g1>peteremad132oo5@gmail.com'",
    to,
    subject,
    html,
  });
  console.log("Message sent: %s", info.messageId);
};
