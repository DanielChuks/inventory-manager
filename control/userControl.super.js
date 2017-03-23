(function(){
  //DOM objects
  let globalCode = '';
  const addAdminBox = document.getElementById('addAdminBox');
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
  const availableAssetButton = document.getElementById('availableAssetButton');
  const assignedAssetButton = document.getElementById('assignedAssetButton');
  const assignedAssetBox = document.getElementById('assignedAssetBox');
  const availableContainer = document.getElementById('availableContainer');
  const assignedContainer = document.getElementById('assignedContainer');
  
  //display available asset box
  availableAssetButton.addEventListener('click', function() {
    closeWindows('availableContainer');
  })
  
  //display unavailable asset box
  assignedAssetButton.addEventListener('click', function() {
    if(assignedAssetBox.innerHTML){
      assignedContainer.style.display = 'block';
    }
  })
  
  
  //add admin
  adminDisplayButton.addEventListener('click', function(){addAdminBox.style.display = 'block'}, false);
  addAdminButton.addEventListener('click', addAdmin, false);
  cancelAdminButton.addEventListener('click', function(){addAdminBox.style.display = 'none'}, false);
  
  //Add new admin
  function addAdmin(){
    const username = document.getElementById('admin').value.toLowerCase();
    if(!username){
      alert('Please Input the username of the new Admin!')
      return;
    }
    const url = `${appUrl}/api/addadmin?username=${username}`;
    ajaxFunctions.ajaxRequest('POST', url, function(data){
      alert(data);
      addAdminBox.style.display = 'none';
    });
  }
  
  //add asset
  newAssetDisplayButton.addEventListener('click', function(){addAssetBox.style.display = 'block'}, false);
  addAssetButton.addEventListener('click', addAsset, false);
  cancelAssetButton.addEventListener('click', function(){addAssetBox.style.display = 'none'}, false);
  
  
  //Add new asset
  function addAsset(){
    const trailingSpace = /^\s+|\s+$/g;
    const allSpace = /\s+/g;
    const name = document.getElementById('newName').value.replace(trailingSpace, '');
    const description = document.getElementById('newDescription').value.replace(trailingSpace, '');
    const serialnumber = document.getElementById('newSerialNumber').value;
    const serialcode = document.getElementById('newSerialCode').value.replace(allSpace, '');
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
  $('#assignAsset').click(assignAsset)
  $('#assignCancel').click( function(){assignAssetBox.style.display = 'none'});
  
  
  
  //Assign Asset
  function assignAsset(){
    const username = $('#assignUser').val();
    const date = $('#assignReclaimDate').val();
    const url = `${appUrl}/api/assignasset?assignee=${username}&serial=${globalCode}&date=${date}`;
    ajaxFunctions.ajaxRequest('POST', url, function(data){
      alert(data);
      assignAssetBox.style.display = 'none';
    });
  }
  
  
  function availableAsset(){
    ajaxFunctions.ajaxRequest('GET', `${appUrl}/api/availableassets`, createAvailabe);
  }
  
  
  function createAvailabe(data){
    console.log(data);
    if(data !== "No results"){
      const assets = JSON.parse(data);
      
      
      for (var i = 0; i<assets.length; i++){
        const asset = assets[i];
        let innerHtml = `<div class='available'>
          <p>Name: ${asset.name}</p>
          <p>Description: ${asset.description}</p>
          <p>Serial Number: ${asset.serialnumber}</p>
          <p>Andela Serial Code: ${asset.serialcode}of</p>
          <p>Date of Purchase: ${asset.purchasedate}</p>
          <input type='submit' value='Assign' serial = '${asset.serialcode}' class='assign-submit'>
          <input type='submit' value='Cancel'  class='cancel-assign'>
        </div>`; 
        $('#availableAssetBox').append(innerHtml);
      }
      
      $('.assign-submit').click(assignDisplay);
      $('.cancel-assign').click(function() {
          assignAssetBox.style.display = 'none';
      })
    }
  }
  
  function assignedAsset(){
    ajaxFunctions.ajaxRequest('GET', `${appUrl}/api/assignedassets`, createAssigned);
  }
  
  
  function createAssigned(data){
    console.log(data);
    if(data !== "No results"){
      const assets = JSON.parse(data);
      console.log(assets)
      
      for (var i = 0; i<assets.length; i++){
        const asset = assets[i];
        let innerHtml = `<div class='available'>
          <p>Name: ${asset.name}</p>
          <p>Description: ${asset.description}</p>
          <p>Serial Number: ${asset.serialnumber}</p>
          <p>Andela Serial Code: ${asset.serialcode}</p>
          <p>Date of Purchase: ${asset.purchasedate}</p>
          <p>Assinged to: ${asset.assignedto}</p>
          <p>Reclaim Date: ${asset.reclaimDate}</p>
          <input type='submit' value='Unassign' serial = '${asset.serialcode}' class='unassign-submit'>
        </div>`;
        $('#assignedAssetBox').append(innerHtml);
      }
     
      $('.unassign-submit').click(unassignAsset);
    }
  }
  
  //unassign asset
  function unassignAsset(){
    const serial = this.getAttribute('serial');
    const url = `${appUrl}/api/unassignasset?serialcode=${serial}&test=test`;
    ajaxFunctions.ajaxRequest('POST', url, function(data){
      console.log(data)
    })
  }
  
  ajaxFunctions.ready(function(){
    availableAsset();
    assignedAsset();
  });
  

  function assignDisplay(){
    const serial = this.getAttribute('serial');
    globalCode = serial;
    console.log(globalCode);
    document.getElementById('assignAssetBox').style.display = 'block';
  }
  
  
  function closeWindows(open){
    document.getElementById('assignAssetBox').style.display = 'none';
    document.getElementById('availableContainer').style.display = 'none';
    document.getElementById('assignedContainer').style.display = 'none';
    document.getElementById('addAdminBox').style.display = 'none';
    document.getElementById('addAssetBox').style.display = 'none';
    document.getElementById('assignAssetBox').style.display = 'none';
    document.getElementById(open).style.display = 'block';
  }
  
  
  
    
})()

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

