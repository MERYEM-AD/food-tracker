function sendEmail() {

    let userName = document.getElementById("name").value
    let userEmail = document.getElementById("email").value
    let userMessage = document.getElementById("message").value


        Email.send({
        // Host: "smtp.gmail.com",
        // Username: "foodtrackerapplication@gmail.com",
        // Password: "bootcampgroup1", 
        SecureToken:"bcd89ce0-1dea-4997-ad8d-523f52e30597",
        From: "foodtrackerapplication@gmail.com",
        To: "foodtrackerapplication2@gmailcom",
        Name: userName,
        Email: userEmail,
        Body: userMessage,    
    })
    .then(function(message) {
        alert("mail sent successfully")
    });
}