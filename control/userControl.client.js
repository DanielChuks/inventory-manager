
ajaxFunctions.ready(function(){getAssets});

//display all assets
$('#assetDisplayButton').click(function() {
  getAssets();
  closeWindows('assetContainer');
});

$('#reportIssueButton').click(function() {
  closeWindows('reportIssueBox');
});


//close report box
$('#reportCancel').click(function() {
  document.getElementById('reportIssueBox').style.display = 'none';
});

//get items assigned to you
function createAssets(data){
  const path = window.location.pathname;
  const pattern = /\w+/;
  const username = path.match(pattern)[0];
  if(data !== "No results"){
    const assets = JSON.parse(data);
    let innerHtml='';
    for (var i = 0; i<assets.length; i++){
      const asset = assets[i];
      if(asset.assignedto === username){
        innerHtml += `<div class='available'>
        <p>Name: ${asset.name}</p>
        <p>Description: ${asset.description}</p>
        <p>Serial Number: ${asset.serialnumber}</p>
        <p>Andela Serial Code: ${asset.serialcode}of</p>
        <p>Reclaim Date: ${asset.reclaimDate}</p>
      </div>`;
      }
    }
    $('#assetBox').html(innerHtml);
  }
}

//get available assets
function getAssets(){
  ajaxFunctions.ajaxRequest('GET', `${appUrl}/api/allassets`, createAssets);
}

//report issue to admin
function reportIssue(){
    const issueType = $('#issueType').val();
    const comment = $('#comment').val();
    const admin = $('#adminUsername').val();
    console.log(issueType, comment);
    ajaxFunctions.ajaxRequest('POST', `${appUrl}/api/reportissue?issue=${issueType}&comment=${comment}&admin=${admin}`, 
    function(data){
        alert(data)
        document.getElementById('reportIssueBox').style.display = 'none';
    });
}

//closes any open window except the one passed as argument
function closeWindows(open){
  document.getElementById('reportIssueBox').style.display = 'none';
  document.getElementById('assetContainer').style.display = 'none';
  document.getElementById(open).style.display = 'block';
}


