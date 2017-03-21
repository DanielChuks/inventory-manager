(function(){
  //DOM objects
  const loginButton = document.getElementById('login');
  const signupButton = document.getElementById('signup');
  
  //add eventListeners
  loginButton.addEventListener('click', function(){console.log(loginButton)}, false);
  signupButton.addEventListener('click', openSignUp, false);
  
  function openSignUp(){
     window.location=`${appUrl}/signup`;
  }
  
    
    
})()

