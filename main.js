function getUserData(){
    // Get form input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    let isValid = true;

    // Check for required fields
    if (name === "") {
        alert("Invalid name, please rewrite your name");
        isValid = false;
    }

    if (email === "") {
        alert("Invalid email, please rewrite your email");
        isValid = false;
    } else {
        // Check email format using a simple regex pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            document.getElementById("emailError").textContent = "Invalid email format.";
            isValid = false;
        }
    }

    // Check if everything is valid, if it is, then it will alert the message
    if (isValid) {
        alert("Thank you " + name + "! We will contact you soon!")
    }
}