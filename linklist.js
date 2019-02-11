console.log("linklist ran");
var array = [];
var tree = null;
var listhtml = '<div id = "pdflinks" class="tree"><button type="button" id="dllinks" onclick="dllinks"> "download"</button>\
<input type="textbox" id="dlocation"/>\
<input type="checkbox" /> All<div class="lnks"><ol>'
var links = document.links;
    // array.push(links[0].href);
    // listhtml += ('<input type="checkbox" />' + links[0].href )
    
for(var i=0; i<links.length; i++) {
  if (links[i].getAttribute('href').endsWith('.pdf')) {
    // array.push(links[i].href);
    listhtml += ('<li><input type="checkbox" /><a href="' + links[i].href + '">' +  links[i].href + '</a></li>' ) 
  }
}
listhtml += '</ol></div></div>'
var z = document.createElement('div');

z.innerHTML = listhtml;
document.body.appendChild(z);

function dllinks() {
chrome.extension.sendMessage(array);
}

document.getElementById('dllinks').addEventListener("click", dllinks)
$(document).ready(function(){
  $('.tree input[type="checkbox"]').on('change', function() {
    checkChild($(this));
  });

  function checkChild(element) {
    // console.log($('dlocation').get().value)
    if (element.parent().prop('class') != 'lnks') {
      var children = element.next().children();
      if (element.prop('checked')) {

        for (var i in children) {
          children[i].checked = true;
          array.push(children[i].nextElementSibling.href);
        }

      }
      else {
        for (var i in children) {
          children[i].checked = false;
          array.pop(children[i].nextElementSibling.href);
        }
      }
    }
    else{
      if (element.prop('checked')){
        array.push(element.next().prop('href'));
      }
      else{
        array.pop(element.next().prop('href'));

      }
    }
  }
})