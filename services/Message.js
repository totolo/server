module.exports = ({subject, recipients}, content) => {
  return {
    to: recipients.map(({email}) => email),
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
};