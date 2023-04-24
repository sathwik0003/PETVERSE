const signform = document.querySelector("#signform")
const loginform = document.querySelector("#loginform")
const fullname = document.querySelector("#fname")
const phonenumber=document.getElementById('phonenumber')
const signbutton = document.getElementById('signbutton')
const emailid = document.getElementById('emailid')
const password1= document.getElementById('password1')
const password2=document.getElementById('password2')
const loginusername = document.getElementById('loginusername')
const loginpassword = document.getElementById('loginpassword')
const uname = document.getElementById('uname')

console.log('load')


const phoneRegex = /^((\+91)|\+)?[6789]\d{9}$/; 
  const emailRegex = /^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+[.]+[a-z]+$/; 
  const passwordRegex = /^.{8,}$/;
  const unameregex = /^(?=.*[A-Za-z])(?=.*\d)[\w]{6,}$/

signform.addEventListener("submit", function(event) {

    if (validateForm()) {
        console.log("an")
    }
   
    else if(password1.value!=password2.value){
        alert("Confirm Password properly")
        let url="./views/login";
        window.location.url
    }
    else {
        alert("Enter valid input");
        let url="./views/login";
        window.location.url
    }
});



function validateForm() {
    let isValid = true;
    if (!phoneRegex.test(phonenumber.value)) {
        isValid = false;
        phonenumber.classList.add("invalid");
    } else {
        phonenumber.classList.remove("invalid");
    }
    if (!emailRegex.test(emailid.value)) {
        isValid = false;
        emailid.classList.add("invalid");
    } else {
        emailid.classList.remove("invalid");
    }
    if (!passwordRegex.test(password1.value)) {
        isValid = false;
        password1.classList.add("invalid");
    } else {
        password1.classList.remove("invalid");
    }
    if (!unameregex.test(uname.value)) {
        isValid = false;
        uname.classList.add("invalid");
    } else {
        uname.classList.remove("invalid");
    }
    if (password1.value!==password2.value) {
        isValid = false;
        password2.classList.add("invalid");
    } else {
        uname.classList.remove("invalid");
    }
    return isValid
}

