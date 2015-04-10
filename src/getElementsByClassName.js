// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:


 

var getElementsByClassName = function(className){
  var getElementsByClassNameFromElement = function(element) {

  var result = [];
  var subresult;

  if (element.classList.contains(className)) {
    result.push(element);
  }

  var children = Array.prototype.slice.call(element.childNodes);

    for (var i = 0; i < children.length; i++) {
      if (children[i].nodeType === 1) {        
        subresult = getElementsByClassNameFromElement(children[i]);
        result = result.concat(subresult);    
    }
  }

  return result;

  }

return getElementsByClassNameFromElement(document.body);

};

