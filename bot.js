const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const package = ("./package.json");
const lib = require("./lib.js");
const Jimp = require('jimp');
const args = ['info'];
client.on('message', (message) => {
	if(message.content[0] == config.prefix && !message.author.bot){
		var command = lib.parseCommand(message);
		console.log(command);
		switch(command[0]){
			case args[0]:
				switch(command[1]){
					case 'me':
						message.channel.send(`ID: ${message.author.id}\nAvatar: ${message.author.avatarURL}\nUsername: ${message.author.username}\nTag: ${message.author.tag}`);
						break;
					case 'you':
						message.channel.send(`ID: ${client.user.id}\nAvatar: ${client.user.avatarURL}\nUsername: ${client.user.username}\nTag: ${client.user.tag}`);
						break;
					case 'channel':
						message.channel.send(`ID: ${message.channel.id}`);
						break;
					case undefined:
						message.channel.send('Type `!info <arg>` to display some info, the current `args` are: `me`(your info), `you` (the bot\'s info), and `channel` (self-explanatory)');
						break;
					default:
						console.log('Arg error');
						break;
				}
			case undefined:
				return;
			default:
				return;
		}
	}
	if(message.attachments.size > 0 && (message.author.id != client.user.id)){
		var att = message.attachments.array();
		Jimp.read(att[0].url)
			.then(image =>{
				console.log(`image deepfrying...`);
				image.resize(lib.rand(350, 501),Jimp.AUTO);
				for(i = 0;i < 3; i++){
					image.contrast(Math.random());
					image.color([
					  { apply: 'desaturate', params: [lib.rand(20, 31)] },
					  { apply: 'mix', params: ['#F01E14', lib.rand(15,26)] },
					  {apply: 'brighten', params: [0.2]}
					]);
					image.quality(lib.rand(10, 16));
					image.write('./img.jpg');
				}
				image.write('img.jpg');
				message.channel.send("Deep fried:", {

					file: './img.jpg'

				});
				console.log(`image deepfried`);
				return;
			});
			return;
	}
});
client.on('ready', () => {
	console.log(`Logged in`);
});
client.login(config.token);