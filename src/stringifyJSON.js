// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var beginning = "";
  var end = "";

  if (typeof obj == "string") {
  	beginning = '"';
  	end = '"';
  }

  else if (obj === null)
  	obj = "null";

  else if (typeof obj == "function") {
  	return undefined;
  }

  else if (obj == undefined) {
  	return undefined;
  }

  else if (Array.isArray(obj)) {
  	var answer = "";
  	beginning = "[";
  	end = "]";
  	for (var i = 0; i < obj.length; i++) {
  		var val = stringifyJSON(obj[i]);
  		if (val !== undefined) {
  			answer = answer + val + ',';
  		}
  		else
  		{
  			answer = answer + 'null' + ',';
  		}
  	}

	if (answer.slice(-1) == ",") {
		answer = answer.slice(0, -1);
	} 
  	obj = answer;
  }

  else if (typeof obj == "object") {
  	var answer = "";
  	beginning = "{";
  	end = "}";
  	for (var prop in obj) {
  		var val = stringifyJSON(obj[prop]);
  		if (val !== undefined) {
  			answer = answer + '"' + prop + '":' + val + ',';
  		}
  	}

	if (answer.slice(-1) == ",") {
		answer = answer.slice(0, -1);
	} 
  	obj = answer;
  }

  return beginning + obj + end;
};