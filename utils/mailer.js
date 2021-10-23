const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const sendEmail = async (options) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN_EMAIL,
  })
  const accessToken = oauth2Client.getAccessToken()

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USERNAME,
      //pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN_EMAIL,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
    // Active in gmail "less secure app" option
  })
  // Define the email options
  const mailOptions = {
    from: `DTH SOFT <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html: options.message,
  }
  // Actually send the email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
