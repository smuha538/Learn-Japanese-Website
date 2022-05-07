function toggleIconColour(field, type)
{
  if(type == "error")
  {
    field.classList.add("errorIcon");
    field.classList.remove("checkIcon");

  }
  else
  {
    field.classList.add("checkIcon");
    field.classList.remove("errorIcon");
  }
}

function errorIcon(field)
{
  field.textContent = "error"
  toggleIconColour(field, "error");
}

function validIcon(field)
{
  field.textContent = "check_circle"
  toggleIconColour(field, "check");
}

function formValidator(field)
{
  if(checkIfFirstName(field.id))
  {
    validateFirstName(field);
  }
  else if(checkIfLastName(field.id))
  {
    validateLastName(field);
  }
  else if(checkIfEmail(field.id))
  {
    validateEmail(field);
  }
  else if(checkIfPassword(field.id))
  {
    validatePassword(field);
  }
  else
  {
    validateConfirmPassword(field);
  }
}

function checkIfFirstName(field)
{
  let firstName = document.querySelector("#first_name");
  return checkBoolean(field, firstName.id);
}

function checkIfLastName(field)
{
  let lastName = document.querySelector("#last_name");
  return checkBoolean(field, lastName.id);
}

function checkIfEmail(field)
{
  let email = document.querySelector("#email");
  return checkBoolean(field, email.id);
}

function checkIfPassword(field)
{
  let password = document.querySelector("#password");
  return checkBoolean(field, password.id);
}

function checkBoolean(actualField, expectedField)
{
  return actualField == expectedField ? true : false;
}

function validateFirstName(firstName)
{
  let firstNameIcon = document.querySelector("#firstNameIcon");
  let firstNameHelper = document.querySelector("#firstNameHelper");
  let fieldName = "First name"
  if(isEmpty(firstName))
  {
    errorIcon(firstNameIcon);
    errorMessage(firstNameHelper, fieldName);
  }
  else
  {
    validIcon(firstNameIcon);
    eraseMessage(firstNameHelper);
  }
}

function validateLastName(lastName)
{
  let lastNameIcon = document.querySelector("#lastNameIcon");
  let lastNameHelper = document.querySelector("#lastNameHelper");
  let fieldName = "Last name"
  if(isEmpty(lastName))
  {
    errorIcon(lastNameIcon);
    errorMessage(lastNameHelper, fieldName);
  }
  else
  {
    validIcon(lastNameIcon);
    eraseMessage(lastNameHelper);
  }
}

function validateEmail(email)
{
  let emailIcon = document.querySelector("#emailIcon");
  let emailHelper = document.querySelector("#emailHelper");
  if(!isEmailValid(email))
  {
    errorIcon(emailIcon);
    emailErrorMessage(emailHelper, email);
  }
  else
  {
    validIcon(emailIcon);
    eraseMessage(emailHelper);
  }
}

//Reference from: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
function isEmailValid(email)
{
  return email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function emailErrorMessage(emailHelper, email)
{
  if(isEmpty(email))
  {
    let fieldName = "Email address";
    errorMessage(emailHelper, fieldName);
  }
  else if(!email.value.includes("@"))
  {
    emailHelper.textContent = "You are missing '@' in your email";
    redText(emailHelper);
  }
  else if(!isEmpty(email))
  {
    emailHelper.textContent = "Your email address is incomplete";
    redText(emailHelper);
  }
  else
  {
    eraseMessage(emailHelper);
  }
}

function validatePassword(password)
{
  let passwordIcon = document.querySelector("#passwordIcon");
  let passwordHelper = document.querySelector("#passwordHelper");
  if(!isAppropriateLength(password) || isEmpty(password))
  {
    errorIcon(passwordIcon);
    passwordErrorMessage(passwordHelper, password);
  }
  else
  {
    validIcon(passwordIcon);
    eraseMessage(passwordHelper);
  }
}

// function containsSpecialCharacters(password)
// {
//   return password.value.includes(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/);
// }

function validateConfirmPassword(confirmPassword)
{
  let confirmPasswordIcon = document.querySelector("#confirmPasswordIcon");
  let confirmPasswordHelper = document.querySelector("#confirmPasswordHelper");
  if(!matchesPassword(confirmPassword) || isEmpty(confirmPassword) || !isAppropriateLength(confirmPassword))
  {
    errorIcon(confirmPasswordIcon);
    confirmPasswordErrorMessage(confirmPasswordHelper, confirmPassword);
  }
  else
  {
    validIcon(confirmPasswordIcon);
    eraseMessage(confirmPasswordHelper);
  }
}

function confirmPasswordErrorMessage(confirmPasswordHelper, confirmPassword)
{
  if(isEmpty(confirmPassword))
  {
    errorMessage(confirmPasswordHelper, "Confirm password");
  }
  else
  {
     confirmPasswordHelper.textContent = "Password does not match";
  
  }
  redText(confirmPasswordHelper);
}

function matchesPassword(confirmPassword)
{
  let password = document.querySelector("#password");
  return password.value == confirmPassword.value ? true : false;
}

function passwordErrorMessage(passwordHelper, password)
{
  if(isEmpty(password))
  {
    errorMessage(passwordHelper, "Password");
  }
  else
  {
     passwordHelper.textContent = "Password must be 8 characters minimum";
  }
  redText(passwordHelper);
}

function isAppropriateLength(password)
{
  return password.value.length >= 8 ? true : false;
}

function isEmpty(fieldValue)
{
  return fieldValue.value.length == 0 ? true : false;
}

function errorMessage(fieldHelper, fieldName)
{
  fieldHelper.textContent = `${fieldName} must be filled in`;
  redText(fieldHelper);
}

function eraseMessage(fieldHelper)
{
  fieldHelper.textContent = "";
}

function redText(text)
{
  text.style.color = "red";
}

function passwordVisibility(passwordType)
{
  let visibleInput;
  if(passwordType.id == "passwordVisibility")
  {
    visibleInput = document.querySelector("#password");
    togglePasswordVisibility(visibleInput, passwordType);
  }
  else
  {
    visibleInput = document.querySelector("#confirmPassword");
    togglePasswordVisibility(visibleInput, passwordType);
  }
  
}

function togglePasswordVisibility(visibleInput, visibilityIcon)
{
  if (visibleInput.type == "password") 
  {
    visibleInput.type = "text";
    visibilityOff(visibilityIcon);
  } else 
  {
    visibleInput.type = "password";
    visibilityOn(visibilityIcon);
  }   
}

function visibilityOn(visibilityIcon)
{
  visibilityIcon.textContent = "visibility";
}

function visibilityOff(visibilityIcon)
{
  visibilityIcon.textContent = "visibility_off";
}

document.querySelector("#passwordVisibility").addEventListener("click", (e) => {
  passwordVisibility(e.target);
});

document.querySelector("#confirmPasswordVisibility").addEventListener("click", (e) => {
  passwordVisibility(e.target);
});

document.querySelector("form").addEventListener("keyup", (e) => {
  formValidator(e.target);
});

document.querySelector("#signUp").addEventListener("click", () => {
  if(emptyFields())
  {
    fieldWarning();
  }
});

document.querySelector("form").addEventListener("change", () => {
  let submitClass = document.querySelector("#signUp").classList; 
  if(emptyFields())
  {
    submitClass.add("disabled");
  }
  else
  {
    submitClass.remove("disabled");
  }
});

document.querySelector("#password").addEventListener("change", () => {
  let confirm = document.querySelector("#confirmPassword");
  formValidator(confirm);
});

function fieldWarning()
{
  let inputFields = document.querySelectorAll("input");
  inputFields.forEach((input) => formValidator(input));
}

function emptyFields()
{
  let validIcons = document.querySelectorAll(".validateIcon");
  let result = false;
  validIcons.forEach((icon) => {
    if(icon.innerHTML != "check_circle")
    {
      result = true;
    }
  });
  return result;
}
