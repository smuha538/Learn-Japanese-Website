function emptyForm() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    if (email == "" || email == null) {
      emailCheck();
      return false;
    }
    if (password == "" || password == null) {
      passwordCheck();
      return false;
    }
  }
  
  function emailCheck()
  {
    let email = document.querySelector("#email");
    let emailHelper = document.querySelector("#emailHelper");
    if(email.value)
    {
      emailHelper.classList.add("hide");
    }
    {
      emailHelper.classList.remove("hide");
    }
  }
  
  function passwordCheck()
  {
    let password = document.querySelector("#password");
    let passwordHelper = document.querySelector("#passwordHelper");
    if(password.value)
    {
      passwordHelper.classList.add("hide");
    }
    {
      passwordHelper.classList.remove("hide");
    }
  }
  
  document.addEventListener("click", (e) => {
    if(e.target && e.target.id == "login-btn")
    {
      sessionStorage.clear();
      localStorage.clear();
    }
  });
  