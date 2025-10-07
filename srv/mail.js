//Start of Option 1

// const { sendMail } = require('@sap-cloud-sdk/mail-client');
// module.exports = srv =>
//   srv.on("sendmail", async (req) => {
//     const mailConfig = {
//       to: 'saket.amraotkar@gmail.com',
//       subject: 'Test On Premise Destination',
//       text: 'If you receive this e-mail, you are successful.'
//     };
//     sendMail({ destinationName: 'mail_destination' }, [mailConfig]);
//   });
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

// option 2 with html
const cds = require('@sap/cds');
const SapCfMailer = require("sap-cf-mailer").default;
module.exports = cds.service.impl(function () {

this.on('sendMail', async () => {

        try {

            const transporter = new SapCfMailer("mail_destination"); //enter destination name
            const htmlContent = `<!DOCTYPE html>
                        <html>
                        <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;">
                            <tr>
                                <td align="center" style="padding:24px;">
                                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;padding:24px;">
                                    <tr>
                                    <td>
                                        <h2 style="margin:0 0 12px;font-size:20px;color:#111;">Hello SAP Developer 👋</h2>
                                        <p style="margin:0 0 16px;color:#333;line-height:1.5;">
                                        This is a quick test email from your SAP BTP CAP app. If you can read this, your mail setup works!
                                        </p>
                                        <p style="margin:0 0 24px;">
                                        <a href="https://cap.cloud.sap/docs/" style="display:inline-block;text-decoration:none;padding:10px 16px;border-radius:8px;background:#2563eb;color:#fff;">
                                            View Details
                                        </a>
                                        </p>
                                        <p style="margin:0;color:#666;font-size:12px;">
                                        — CAP Mailer • <span style="color:#999;">Do not reply</span>
                                        </p>
                                    </td>
                                    </tr>
                                </table>
                                <p style="color:#999;font-size:12px;margin:12px 0 0;">© 2025 Your Company</p>
                                </td>
                            </tr>
                            </table>
                        </body>
                        </html> 
`;

            const result = await transporter.sendMail({
                to: "saket.amraotkar@gmail.com",
                cc: "",
                subject: "Test Mail from BTP System",
                html: htmlContent,
                attachments: []
            });

            return `Email sent successfully w`;

        } catch (error) {
            console.error('Error sending email:', error);
            return `Error sending email: ${error.message}`;
        }
    });
});