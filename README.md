# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## Steps
- Create xsuaa service instance plan application (Authorization & Authentication service with Service Key) e.g. 
    mail-xsuaa, mail-xsuaa-key
- create destination service instance with plan lite - mail-destination, mail-destination-key
- create connectivity service instance with plan lite - mail-connectivity, mail-connectivity-key
- get Application password for Gmail refer below blog
- create detintaion for gmail/email with below blog:
    property | Property Value
    --------|---------
    Name | mail_destination
    Type | MAIL
    proxy Type | Internet
    Authentication | BasicAuthentication
    user | emailid of gmail
    Password | <16 digit gmail App password key>

- additional properties:
    property | Property Value
    --------|---------
    mail.smtp.from | enter e-mail address to send email from here
    mail.smtp.ssl.checkserveridentity | true
    mail.smtp.starttls.enable | true
    mail.smtp.starttls.required | true
    mail.smtp.host | smtp.gmail.com
    mail.smtp.port | 587
    mail.transport.protocol | smtp
    mail.smtp.ssl.trust | *
    mail.smtp.ssl.enable | false

- expose function/action in srv/mail.cds file
- implement function/action in srv/mail.js file
- bind all 3 services by usning below command
- cds bind -2 serviceName:serviceName-key

--> e.g. cds bind -2  mail-xsuaa:mail-xsuaa-key

test locally from test.http file:
### // Check mail Option 1
POST http://localhost:4004/odata/v4/mail/sendmail

Content-Type: application/json

{}

### //send mail Option 2
GET http://localhost:4004/odata/v4/mail/sendMail 

Content-Type: application/json

{}

- reference: 
Mail Destination: https://help.sap.com/docs/intelligent-robotic-process-automation/factory-user-guide/configure-smtp-mail-destination

- CAPM Trigger Email Option 1:
https://community.sap.com/t5/technology-blog-posts-by-members/connecting-on-premise-mail-destination-and-sending-email-using-sap-cloud/ba-p/13560956

- CAPM Trigger Email Option 2:  
https://community.sap.com/t5/technology-blog-posts-by-members/sending-emails-from-sap-cap-applications-with-any-smtp-provider/ba-p/14179608

- SAP BTP MAIL Destination:
https://help.sap.com/docs/intelligent-robotic-process-automation/factory-user-guide/configure-smtp-mail-destination

- How to get Gmail App Password:
https://support.google.com/mail/thread/205453566/how-to-generate-an-app-password?hl=en

OR

https://itsupport.umd.edu/itsupport?id=kb_article_view&sysparm_article=KB0015112