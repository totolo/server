const keys = require("../config/keys");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendGridKey);

module.exports = ({subject, recipients}, content) => {
  sgMail.msg = {
    to: recipients[0].email,
    from: 'no-reply@emaily.com',
    subject: subject,
    content: [
      {
        type: 'text/html',
        value: content
      }
    ],
    trackingSettings: {
      clickTracking: {
        enable: true
      }
    },
  };
  return sgMail;
};

//
// class Mailer extends sgMail {
//   constructor({subject, recipients}, content) {
//     super();
//
//     this.setApiKey(keys.sendGridKey);
//     this.msg = {
//       to: recipients.map(({ email }) => email),
//       from: 'no-reply@emaily.com',
//       subject: subject,
//       content: [
//         {
//           type: 'text/html',
//           value: content
//         }
//       ],
//       trackingSettings: {
//         clickTracking: {
//           enable: true
//         }
//       },
//     };
//   }
// }
//
//
// module.exports = Mailer;