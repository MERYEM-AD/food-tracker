const contactusForm = document.querySelector('#contactUsForm');


contactusForm.addEventListener('submit',function(event){
    event.preventDefault();
    sendEmail();
});

function sendEmail() {

    let userName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userMessage = document.getElementById("message").value;
    

        Email.send({
        // Host: "smtp.gmail.com",
        // Username: "foodtrackerapplication@gmail.com",
        // Password: "bootcampgroup1", 
        SecureToken:"bcd89ce0-1dea-4997-ad8d-523f52e30597",
        From: userEmail,
        To: "foodtrackerapplication@gmail.com",
        Name: userName,
        Email: userEmail,
        Body: userMessage, 
        Subject: "Message:"   
    })
    .then(function(message) {
        window.location.href = "thankyou.html";
        // alert("Thank you! Mail sent successfully");
    }).catch(function(error) {
        console.log(error);
    });
}


