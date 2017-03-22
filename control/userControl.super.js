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
    
    if(!name || !description || !serialnumber || !serialcode || !purchaseDate){
      alert()
    }
    
    const url = `${appUrl}/api/addasset?name=${name}&description=${description}&serialcode=${serialcode}
     &serialnumber=${serialnumber}&purchasedate=${purchaseDate}`;
    ajaxFunctions.ajaxRequest('POST', url, function(data){
      alert(data);
      addAssetBox.style.display = 'none';
    });
  }
    
})()

