(function(){
  //DOM objects
  const adminBox = document.getElementById('addAdminBox');
  const adminDisplayButton = document.getElementById('adminDisplayButton');
  const addAdminButton = document.getElementById('addAdminButton');
  const cancelAdminButton = document.getElementById("cancelAdminButton");
  const newAssetDisplayButton = document.getElementById("newAssetDisplayButton");
  const addAssetBox = document.getElementById("addAssetBox");
  const addAssetButton = document.getElementById("addAssetButton");
  const cancelAssetButton = document.getElementById("cancelAssetButton");
  const assignAssetBox = document.getElementById("assignAssetBox");
  const assignAssetButton = document.getElementById("assignAssetButton");
  const cancelAssignButton = document.getElementById("cancelAssignButton");
  const availableAssetBox = document.getElementById('availableAssetBox');
  
  //add admin
  adminDisplayButton.addEventListener('click', function(){adminBox.style.display = 'block'}, false);
  addAdminButton.addEventListener('click', addAdmin, false);
  cancelAdminButton.addEventListener('click', function(){adminBox.style.display = 'none'}, false);
  
  //Add new admin
  function addAdmin(){
    const username = document.getElementById('admin').value;
    const url = `${appUrl}/api/addadmin?username=${username}`;
    ajaxFunctions.ajaxRequest('POST', url, function(data){
      alert(data);
      adminBox.style.display = 'none';
    });
  }
  
  //add asset
  newAssetDisplayButton.addEventListener('click', function(){addAssetBox.style.display = 'block'}, false);
  addAssetButton.addEventListener('click', addAsset, false);
  cancelAssetButton.addEventListener('click', function(){addAssetBox.style.display = 'none'}, false);
  
  //Add new asset
  function addAsset(){
    const name = document.getElementById('newName').value;
    const description = document.getElementById('newDescription').value;
    const serialnumber = document.getElementById('newSerialNumber').value;
    const serialcode = document.getElementById('newSerialCode').value;
    const purchaseDate = document.getElementById('newPurchaseDate').value;
    
    const today = new Date();
    const dd = (today.getDate());
    const mm = today.getMonth()+1; //January is 0!
    const yyyy = today.getFullYear();
    
    const formDD = Number(purchaseDate.substr(8, 2));
    const formMM = Number(purchaseDate.substr(5, 2));
    const formYYYY = Number(purchaseDate.substr(0, 4));
    console.log(purchaseDate)
    console.log(formDD, dd, formMM, mm, formYYYY, yyyy);
    
    if(!name || !description || !serialnumber || !serialcode || !purchaseDate){
      alert("Please provide a valid input for all field!");
      return;
    }
    
    if(serialnumber < 1){
      alert("Serial Number should not be less than 1!");
      return;
    }
    
    if(formDD > dd || formMM > mm || formYYYY > yyyy){
      alert("Purchase Date can not be greater than today!")
      return;
    }
    
    const url = `${appUrl}/api/addasset?name=${name}&description=${description}&serialcode=${serialcode}
     &serialnumber=${serialnumber}&purchasedate=${purchaseDate}`;
    ajaxFunctions.ajaxRequest('POST', url, function(data){
      if (data === 'Asset has been added successfully!'){
        alert(data);
        addAssetBox.style.display = 'none';
      }else{
        alert(data);
      }
      
    });
  }
  
  //assign asset
 /* adminDisplayButton.addEventListener('click', function(){assignAssetBox.style.display = 'block'}, false);
  assignAssetButton.addEventListener('click', assignAsset, false);
  cancelAssignButton.addEventListener('click', function(){assignAssetBox.style.display = 'none'}, false);*/
  
  //Assign Asset
  /*function assignAsset(){
    const username = document.getElementById('admin').value;
    const url = `${appUrl}/api/addadmin?username=${username}`;
    ajaxFunctions.ajaxRequest('POST', url, function(data){
      alert(data);
      adminBox.style.display = 'none';
    });
  }*/
  
  function availableAsset(){
    /*const path = window.location.pathname;
    const pattern = /\w+/g;
    const len = (path.match(pattern)||[]).length;
    var accounttype = 'user';
    if(len === 2){
      accounttype = 'admin'
    }
    if(len === 3){
      accounttype = 'superadmin'
    }*/
    ajaxFunctions.ajaxRequest('GET', `${appUrl}/api/assets`, createElement);
  }
  
  function createElement(data){
    if(data !== "No results"){
      const assets = JSON.parse(data);
      let innerHtml = '';
      
      for (var i = 0; i<assets.length; i++){
        innerHtml += `<div class='available'>
          <p>Name: ${assets.name}</p><br>
          <p>Description: ${assets.description}</p><br>
          <p>Serial Number: ${assets.serialnumber}</p><br><br>
          <p>Andela Serial Code: ${assets.serialcode}</p><br><br>
          <p>Date of Purchase: ${assets.purchasedate}</p><br><br>
        </div>`; 
        
      }
      availableAssetBox.innerHTML = innerHtml;
      
    }
    
  }
  
  document.addEventListener('click', availableAsset, false)
    
})()

