console.log("linklist ran");
var array = [];
var listhtml = ''
var links = document.links;
for(var i=0; i<links.length; i++) {
  array.push(links[i].href);
  listhtml += ('<li>' +  links[i].href +  '</li>')
}
var z = document.createElement('ol');
z.innerHTML = listhtml;
document.body.appendChild(z);