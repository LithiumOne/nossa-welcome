const Discord = require('discord.js');
const tokens = [
    (process.env.token1),
    (process.env.token2),
    (process.env.token3),
    (process.env.token4)
];
const chnls = [
    "843527050785718273",
    "843527052211519518",
    "843527054250737694",
    "843527055924264980"
];
const yarak = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(client.user.username);
        await client.user.setActivity({
            name: "Anarchy 💛 Nossa",
            type: "LISTENING"
        });
        concon = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if (yarak.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("843527017924395048").rawPosition)) {//ROLID
                //console.log(yarak);
                ses = await concon.play('./assets/hg.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("843527017924395048").rawPosition)) { //ROLID
                ses = await concon.play('./assets/hg.mp3');
                yarak.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get('843527017924395048').rawPosition) {//ROLID
                ses = await concon.play('./yt.mp3');
                yarak.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })
}
