
  //DOM objects
  //const submitButton = document.getElementById("submit-signup");
  
  //add eventListeners
 // submitButton.addEventListener('click', singUp(), false);
  
  //Sign Up, post form data to server
  function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const url = appUrl + `/login?username=${username}&password=${password}`;
      
      ajaxFunctions.ajaxRequest('POST', url, function(data){
        console.log(data);
        if(data === "false"){
          alert('Wrong username or password!');
           window.location = appUrl;
        }else{
          if(data === "true"){
            alert(`Welcome ${username}`);
          }
        }
      })
    
  }
    
    

