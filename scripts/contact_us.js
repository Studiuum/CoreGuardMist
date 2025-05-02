 // Handle the form submission and check for empty fields
 
 let genCaptcha;
 
 function captchaGenerator() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';

  // Generate 5 random characters
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters[randomIndex];
  }
  // Display the generated CAPTCHA (you can adjust how you want to display it)
  document.getElementById('captcha-challenge').innerHTML = `Captcha-Challenge : ${captcha}`;
  genCaptcha = captcha;
}
 
 captchaGenerator();
 
 function getTimeConverted(){
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format time string with leading zeros
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  
  return timeString;
 }
 

 document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get all input and textarea elements inside the form
    const inputs= document.querySelectorAll('.left input, .left textarea');
    
    // VALUES
    let formValid = true;
    const fieldNames = ['name', 'email', 'message', 'captcha'];
    const values = {};

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const field = fieldNames[i];
      const value = input.value.trim();
      const errorMessage = document.getElementById(input.id + '-error');

      if (value === "") {
        errorMessage.innerHTML = 'This field is required.';
        errorMessage.classList.add('visible');
        input.focus();
        formValid = false;
        values[field] = null;
      } else {
        errorMessage.classList.remove('visible');
        values[field] = value;
      }
    }

    const name_value = values.name;
    const email_value = values.email;
    const message_value = values.message;
    const captcha_value = values.captcha;
    
    // Get the error containers early
    let email_error = document.getElementById('email-error');
    let captcha_error = document.getElementById('captcha-error');

    // Checks if the actual value checks out
    if (email_value){
      if (!email_value.match('@')){
        formValid = false;
        // Set the content of the div (HTML allowed)
        email_error.innerHTML = 'Invalid Email Address: Missing "@"';
        email_error.classList.add('visible');
      } else{
        email_error.classList.remove('visible');
      }
    }

    // Checks if the entered captcha matches
    if(captcha_value){
      if (!(genCaptcha === captcha_value)){
        formValid = false;
        // Set the content of the div (HTML allowed)
        captcha_error.innerHTML = 'Incorrect CAPTCHA. Please try again.';
        captcha_error.classList.add('visible');
      }else{
        captcha_error.classList.remove('visible');
      }
    }

    // If form is not valid, prevent form submission
    if (!formValid) {
      captchaGenerator();
      return false;
    }

    // SEND EMAIL
    obtained_time = getTimeConverted();
    // Sending the email
    emailjs.send("coreguard_mist_service","template_zumkiwb",{
      name: name_value,
      time: obtained_time,
      message:message_value,
      email:email_value
    })
      .then(function(response) {
        alert("Message sent successfully!");
      }, function(error) {
        alert("Failed to send message: " + error.text);
      });

    // For now, this will just log a message
    console.log('Form is valid!');
  });