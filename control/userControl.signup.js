
  //DOM objects
  //const submitButton = document.getElementById("submit-signup");
  
  //add eventListeners
 // submitButton.addEventListener('click', singUp(), false);
  
  //Sign Up, post form data to server
  function singUp(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const accounttype = document.getElementById('accounttype').value;
    const department = document.getElementById('department').value;
    const staffcode = document.getElementById('staffcode').value;
    
    const url = appUrl + `/signup?username=${username}&password=${password}&firstname=${firstname}&lastname=${lastname}&accounttype=${accounttype}&department=${department}&staffcode=${staffcode}`;
      
      ajaxFunctions.ajaxRequest("POST", url, function(data){
        console.log(typeof data);
        if(data === "success"){
          alert("Your New Account has been Created! Log in to continue!");
           window.location = appUrl;
        }else if(data === "username"){
          alert('The username you chose alredy exists in the database. Please try another username!');
        }else if(data === "accounttype"){
          alert('A super-admin already exists!');
        }else{
          if(data === "staffcode"){
            alert('Your Staff Code is already registered in the database, please contact the Admin!');
          }
        }
      })
    
  }
    
    

