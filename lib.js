const Discord = require('discord.js');
const client = new Discord.Client();
const config = (".config.json");
/*returns a random int in the range of max to min*/
exports.rand = (min, max) => {
	return parseInt(Math.random() * max + min);
};
/*parses a command, with `command` being of type Message, and returns the comand as an array of each arg, removing the prefix*/
exports.parseCommand = (command) => {
	var args = command.content.toLowerCase().split(' ');
	var temp = "";
	var raw = args[0]
	for (i = 1;i < raw.length; i++){
		temp += raw[i];
	}
	args[0] = temp;
	return args;
};