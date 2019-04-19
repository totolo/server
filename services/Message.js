module.exports = ({subject, recipients}) => {
  return {
    to: recipients.map(({email}) => email),
    from: 'no-reply@emaily.com',
    subject: subject,
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    trackingSettings: {
      clickTracking: {
        enable: true
      }
    },
  };
};