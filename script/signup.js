
const form = document.getElementById('form');
const email = document.getElementById('email');
const fullName = document.getElementById('fullname')
const password = document.getElementById('password');
const emailError = document.getElementById('emailError')
const passwordError = document.getElementById('passwordError')
const fullNameError = document.getElementById('fullNameError')
form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    
});




const validateInputs = () => {

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const fullNameValue = fullName.value.trim();
    passwordError.style.display = "none";
    emailError.style.display = "none";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(emailValue.match(mailformat))
        {   if (passwordValue.length >= 8)
            registerUser(fullNameValue,emailValue,passwordValue)
            else 
            passwordError.style.display = "block"
        }
        else
        {
            emailError.style.display = "block"
            if (passwordValue.length < 8)
            passwordError.style.display = "block"
            if (fullNameValue == '')
            fullNameError.style.display = "block"
        }
};	


function customAlert(message) {
    var alert = document.getElementById("yesAlert");
    alert.innerHTML = message;
    alert.style.display = "block";
    setTimeout(function() {
      alert.style.display = "none";
    }, 3000);
  }
  function customErrorAlert(message){
    var alert = document.getElementById("noAlert");
    alert.innerHTML = message;
    alert.style.display = "block";
    setTimeout(function() {
      alert.style.display = "none";
    }, 3000);
  }
async function registerUser(fName, email, password){
    const enterEmail = document.getElementById('email').value;
    const enterPassword = document.getElementById('password').value;

    const newUser = {
        id: crypto.randomUUID(),
        email: enterEmail,
        password:enterPassword
    }

        localStorage. setItem('users', JSON.stringify(newUser));
        try{
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:1000/user/authorise',
                data: {
                    "fullName": fName,
                    "email": email,
                    "hash_password": password
                }
    
            })
            return customAlert(res.response.data.message)
        }catch(error){
            if (error.response.data.error == undefined){
                customAlert('User created succesfully')
                setTimeout(function() {
                    window.location.href = 'http://127.0.0.1:5501/login.html'
                  }, 3000);
            }else {
                customErrorAlert(error.response.data.error)
            }
             
        }
        
        //console.log(res.data)

}