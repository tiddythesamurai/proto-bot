const Discord = require('discord.js');
const client = new Discord.Client();
const config = (".config.json");
const btoa = require('btoa');
const atob = require('atob');
/*returns a random int in the range of max to min*/
exports.rand = (min, max) => {
	return parseInt(Math.random() * (max - min) + min);
};
/*parses a command, with `command` being of type Message, and returns the comand as an array of each arg, removing the prefix*/
exports.parseCommand = (command) => {
	//console.log(command.content[0]);
	var args = command.content.split(' ');
	console.log(args);
	var message = "";
	if(args[0].toLowerCase() == '!encode' || args[0].toLowerCase() == '!decode') {
		for(i = 7; i < command.content.length; i++){
			message += command.content[i];
		}
		var newArgs = [args[0], message];
		args = newArgs;
	}else{
	args.forEach(function(element){
		element = element.toLowerCase();
	});
	}
	var temp = "";
	var raw = args[0]
	for (i = 1;i < raw.length; i++){
		temp += raw[i];
	}
	args[0] = temp;
	return args;
};
/*generates a string in the format #xxxxxx where the x's are an RGB in hex format*/
exports.randRGB = () => {

	hexString = "#FF";
	
	code = exports.rand(0,40);
	temp = code.toString(16);
	if(temp.length % 2) temp = '0' + temp;
	hexString += temp.toUpperCase();
	code = exports.rand(0,40);
	temp = code.toString(16);
	if(temp.length % 2) temp = '0' + temp;
	hexString += temp.toUpperCase();
	
	return hexString;
}

exports.encode = (raw) => {
	return btoa(textToOct(textToBin(raw).hexEncode()));
}

exports.decode = (encoded) => {
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
