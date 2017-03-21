
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
    console.log(appUrl)
    const url = appUrl + `/signup?username=${username}&password=${password}&firstname=${firstname}&lastname=${lastname}&accounttype=${accounttype}&department=${department}&staffcode=${staffcode}`;
      
      ajaxFunctions.ajaxRequest("POST", url, function(data){
        console.log(data);
      })
    
  }
    
    

