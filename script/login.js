const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailError = document.getElementById('emailError')
const passwordError = document.getElementById('passwordError')
form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    
});




const validateInputs = () => {

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    passwordError.style.display = "none";
    emailError.style.display = "none";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(emailValue.match(mailformat))
        {   if (passwordValue.length >= 8)
            loginUser(emailValue,passwordValue)
            else 
            passwordError.style.display = "block"
        }
        else
        {
            emailError.style.display = "block"
            if (passwordValue.length < 8)
            passwordError.style.display = "block"
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



async function loginUser(email, password){
  
    let users = JSON.parse(localStorage.getItem('users')) ?? [];
    const enterEmail = document.getElementById('email').value;
    const enterPassword = document.getElementById('password').value;


    //var getUser = localStorage.getItem(users);

    if(enterEmail === users.email)
    {
        if(enterPassword = users.password){
            localStorage.setItem('auntheticatedUser', JSON.stringify(users))
            customAlert('Login successfull');
        
//         if(users.admin){
//             location.href = '/landingpage-dashboard.html'
//         }else{
//             location.href = '/blogs.html'
//         }
//     }else{
//         customErrorAlert('wrong password')
//     }
//     }
// else{
//     customErrorAlert('Invalid credentials')
}
    }    
try{
    const res = await axios({
        method: 'POST',
        url: 'http://localhost:1000/user/log_in',
        data: {
            "email": email,
            "password": password
        }

    });
    const token = res.data.token;
    sessionStorage.setItem('token', token)
    if(email == 'norbertmuhizi21@gmail.com'){
        window.location.href = 'http://127.0.0.1:5501/landingpage-dashboard.html'
    } else {
        window.location.href = 'http://127.0.0.1:5501/index.html'
    }
    return customAlert(res.response.data.message)
}catch(error){
    if (error.response.data.error == undefined){
        customAlert('Login succesfull')
       
        setTimeout(function() {
            
            
            // if(users.data.role === 'admin'){
            // window.location.href = 'http://127.0.0.1:5501/landingpage-dashboard.html'
            // }else{
            //     window.location.href = 'http://127.0.0.1:5501/index.html'
            // }
          }, 3000);
    }else {
        customErrorAlert(error.response.data.error)
    }
    //console.log(res.data)
}

}