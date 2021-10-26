function sendEmail() {
        Email.send({
        Host: "smtp.gmail.com",
        Username: "foodtrackerapplication@gmail.com",
        Password: "bootcampgroup1",
        To: "foodtrackerapplication@gmailcom",
        From: "foodtrackerapplication@gmail.com",
        Subject: "subject of the email",
        Body: "body of the email",    
    }).then(
        message => alert("mail sent successfully")
    )
}