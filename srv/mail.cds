service MailService {
//Option 1 entity    
    // action sendmail();
//Option 2 entity    
    // function sendMail() returns String; 
    // function sendMail(to: String) returns String;
     action sendMail(to: String) returns String;
}

