const nodemailer = require("nodemailer");

function sendEmail(message){
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    transporter.sendMail(message, function(err, info) {
      if(err) {
        rej(err)
      }else{
        res(info)
      }
    })
  });
}

exports.sendConfirmationEmail = function ({ toUser, hash }) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    // to: process.env.GOOGLE_USER,
    subject: 'DULCIE - Active account',
    html: `
      <h3>Hello ${toUser.username} </h3>
      <p>Thank you for registering into our application. Just one more step...</p>
      <p>To active your account please follow this link: <a target="_" href="${process.env.DOMAIN}/activate/user/${hash}">Activate Link</a></p>
      <p>Cheers,</p>
      <p>DATN-DULCIE</p>    
    `
  }

  return sendEmail(message);
};
  
exports.sendResetPassword = function ({ toUser, hash }) {
  
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    // to: process.env.GOOGLE_USER,
    subject: 'DULCIE - Reset Password',
    html: `
      <h3>Hello ${toUser.username} </h3>
      <p>To reset your password please follow this link: <a target="_" href="${process.env.DOMAIN}/reset-password/${hash}">Reset Password Link</a></p>
      <p>Cheers,</p>
      <p>DATN-DULCIE</p>    
    `
  }

  return sendEmail(message);
};