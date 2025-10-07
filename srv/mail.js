//Start of Option 1

const { sendMail } = require('@sap-cloud-sdk/mail-client');
module.exports = srv =>
  srv.on("sendmail", async (req) => {
    const mailConfig = {
      to: 'saket.amraotkar@gmail.com',
      subject: 'Test On Premise Destination',
      text: 'If you receive this e-mail, you are successful.'
    };
    sendMail({ destinationName: 'mail_destination' }, [mailConfig]);
  });
//end of option 1

//Start of Option 2
// const cds = require('@sap/cds');
// const SapCfMailer = require("sap-cf-mailer").default;
// module.exports = cds.service.impl(function () {

//     this.on('sendMail', async () => {
//         try {
//             const transporter = new SapCfMailer("mail_destination"); // Match your destination

//             const result = await transporter.sendMail({
//                 to: "saket.amraotkar@gmail.com", //to list separated by comma
//                 cc: "", //cc list separated by comma
//                 subject: "Test Mail from BTP System",
//                 html: "Hello from CAP!",
//                 attachments: []
//             });
//             return 'Email sent successfully';
//         } catch (error) {
//             console.error('Error sending email:', error);
//             return 'Error sending email: ${error.message}';
//         }

//     });
// });

//End of Option 2