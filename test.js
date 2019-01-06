const lib = require('./lib.js');
var btoa = require('btoa');
var atob = require('atob');

const encode = (raw) => {
	return btoa(textToOct(textToBin(raw).hexEncode()));
}

const decode = (encoded) => {
	return binToText(octToText(atob(encoded)).hexDecode());
}

function octToText(input){
	var output = "";
	var arr = input.split(' ');
	arr.forEach(function(element){
		output += String.fromCharCode(parseInt(element, 8));
	});
	return output;
}

function textToOct(text){
	var output = "";
	for(i = 0; i < text.length; i++){
		output += "0"+text.charCodeAt(i).toString(8) + ' ';
	}
	return output;
}

String.prototype.hexEncode = function(){
    var output = "";
  for (var i = 0; i < this.length; i++) {
      output += this[i].charCodeAt(0).toString(16) + " ";
  }
  return output;
}

String.prototype.hexDecode = function(){
    var output = "";
	var arr = this.split(' ');
	arr.forEach(function(element){
		output += String.fromCharCode(parseInt(element, 16));
	});
	return output;
}

function textToBin(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
  }
  return output;
}

function binToText(input){
	var output = "";
	var arr = input.split(' ');
	arr.forEach(function(element){
		output += String.fromCharCode(parseInt(element, 2));
	});
	return output;
}

console.log(decode(encode('Hello World')));