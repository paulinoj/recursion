// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {
// your code goes here
  var jsonArr = json.split("");

  var getToken = function () {

	  stripWhiteSpace();

	  if (jsonArr[0] === "{") {

	    var newObj = {};
	    jsonArr.shift();
	    stripWhiteSpace();

	    if (jsonArr[0] == "}") {
	  	  jsonArr.shift();
	  	  return newObj;
	    }

	    var propValPair = getPropValPair();
	    newObj[propValPair.prop] = propValPair.val;

	    stripWhiteSpace();

  	  while (jsonArr[0] == ",") {
  	  	jsonArr.shift();

	      stripWhiteSpace();

	      propValPair = getPropValPair();
	      newObj[propValPair.prop] = propValPair.val;

	      stripWhiteSpace();
  	  }
  	  if (jsonArr[0] == "}") {
  	  	jsonArr.shift();
  	  	return newObj;
  	  }
  	  throw new SyntaxError();
  	}


	  if (jsonArr[0] === "[") {
	    var newArr = [];
	    jsonArr.shift();

	    stripWhiteSpace();

	    if (jsonArr[0] == "]") {
	  	  jsonArr.shift();
	  	  return newArr;
	    }

	    newArr.push(getToken());

	    stripWhiteSpace();

  	  while (jsonArr[0] == ",") {
  	  	jsonArr.shift();

	      stripWhiteSpace();

	      newArr.push(getToken());

	      stripWhiteSpace();
  	  }
  	  if (jsonArr[0] == "]") {
  	  	jsonArr.shift();
  	  	return newArr;
  	  }
  	  throw new SyntaxError();
  	}

  	else if (!isNaN(+jsonArr[0]) ||
             jsonArr[0] == "-" ||
             jsonArr[0] == "+" ||
             jsonArr[0] == ".") {
      var newNum = getNum();
 	    return newNum;
 	  }


 	  else if (jsonArr[0] === '"') {
 		  jsonArr.shift();
 		  return getString();
 	  }

 	  else if (jsonArr.slice(0,4).join("") === "true") {
 		  jsonArr.splice(0,4);
 		  return true;
 	  }

 	  else if (jsonArr.slice(0,5).join("") === "false") {
 		  jsonArr.splice(0,5);
 		  return false;
 	  }

    else if (jsonArr.slice(0,4).join("") === "null") {
      jsonArr.splice(0,4);
      return null;
    }

  }



  function getPropValPair() {
    if (jsonArr[0] != '"') {
  	  throw new SyntaxError();
    }
    else
    {
  	  jsonArr.shift();
  	  var prop = "";
  	  while (jsonArr[0] != '"') {
  		  if (jsonArr[0] == '\\') {
	        prop = prop + jsonArr.shift();
	      }
		    prop = prop + jsonArr.shift();
  	  }
  	
  	  if (jsonArr[0] != '"') {
  		  throw new SyntaxError();
  	  }

  	  jsonArr.shift();

	    stripWhiteSpace();

  	  if (jsonArr[0] != ':') {
  		  throw new SyntaxError();
  	  }
  	  else
  	  {
  		  jsonArr.shift();
  	  }

	    stripWhiteSpace();

  	  var val = getToken();
  	  var newObj = {prop: prop, val: val};

  	  return newObj;

    }
  }


  function getNum() {

    var numString = "";
    if (jsonArr[0] == "+") {
      jsonArr.shift();
    }
    else if (jsonArr[0] == "-") {
      jsonArr.shift();
      numString = numString + "-";
    }
	  while (!isNaN(+jsonArr[0])) {
	    numString = numString + jsonArr.shift();
	  }
    if (jsonArr[0] == ".") {
      jsonArr.shift();
      numString = numString + ".";
    }
    while (!isNaN(+jsonArr[0])) {
      numString = numString + jsonArr.shift();
    }    

	  return eval(numString);			  		
  }

  function getString() {

    var responseString = "";
	  while (jsonArr[0] != '"' && jsonArr.length > 1) {
	    if (jsonArr[0] == "\\") {
	  	  jsonArr.shift();			 	  	
	  	  responseString = responseString + jsonArr.shift();
	    }
	    else
	    {
	      responseString = responseString + jsonArr.shift();			 	  	
	    }
	  }
    if (jsonArr[0] != '"') {
      throw new SyntaxError();
    }
	  jsonArr.shift();
	  return responseString;			  		
  }

  function stripWhiteSpace() {
  	var deletions = true;
  	var twoCharSpace;
  	while (deletions) {
  	  deletions = false;

  	  if (jsonArr[0] == " ") {
  	  	jsonArr.shift();
  	  	deletions = true;
  	  }

  	  if ((jsonArr[0] == '\n') ||
  	      (jsonArr[0] == '\r') ||
  	      (jsonArr[0] == '\t')) {		  	  	  	
	      jsonArr.shift();
  	  	deletions = true;
  	  }
  	}
  }

  var finalAnswer = getToken(jsonArr);
  stripWhiteSpace();
  if (jsonArr.length != 0) {
    throw new SyntaxError();
  }
  
  return finalAnswer;
  
}


