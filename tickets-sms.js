const { Telegraf } = require('telegraf')
const { Webhook, Embed } = require('simple-discord-wh');
const config = require('./config.json')
require('colors')

class Utils {
    generateRandomInt() {
        return Math.floor(Math.random() * (99 - 1) + 1)
    }
    
    generateFakeID() {
        const array = []
        for (let i = 0; i < 6; i++) {
            const random = this.generateRandomInt()
            if (array.includes(random)) {
                array.push(("0" + gthis.enerateRandomInt().toString()).slice(-2))
            } else {
                array.push(("0" + random.toString()).slice(-2))
            }
        }
        return array.join('\'')
    }
    
    getDate() {
        let date_ob = new Date()
        let day = ("0" + date_ob.getDate()).slice(-2)
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
        let year = (date_ob.getFullYear()).toString()
        let hours = ("0" + (date_ob.getHours())).slice(-2)
        let minutes = ("0" + (date_ob.getMinutes())).slice(-2)
        let seconds = ("0" + (date_ob.getSeconds())).slice(-2)
        if (parseInt(hours) + 1 == 24) {
            return { day, month, year, hours, minutes, seconds, hours_: (h) => { return '00'}, days_: (d) => { return ("0" + (parseInt(day) + d)).slice(-2) }}
        } else {
            return { day, month, year, hours, minutes, seconds, hours_: (h) => { return ("0" + (parseInt(hours) + h)).slice(-2) }, days_: (d) => { return ("0" + (parseInt(day) + d)).slice(-2) }}
        }
    }
}

class T_93100 {
    parse(msg, user) {
        var text = '', utils = new Utils()
        if (msg.toString().toUpperCase() == "TDV") {      
            text = `
TRANSDEV IDF
Ticket SMS 2 euros

Valable 1h
${utils.getDate().hours}:${utils.getDate().minutes} à ${utils.getDate().hours_(1)}:${utils.getDate().minutes}
${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year.slice(-2)}

SMS A PRESENTER AU CONDUCTEUR

${utils.generateFakeID()}

tab-sms.fr`
            new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toUpperCase(), group: "Île-de-France mobilités", ticket: text, service: 'Bus urbain', operator: 'Transdev IDF', num: 93100 })
        } else if (msg.toString().toLowerCase().startsWith("bus")) {
    text = `
RATP - Ticket SMS bus ${msg.toString().toLowerCase().replaceAll('bus', '').replaceAll(' ', '').replaceAll('n', 'N')}
2 euros TTC

1 trajet sans corresp.
Le ${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year.slice(-2)} de ${utils.getDate().hours}:${utils.getDate().minutes} à ${utils.getDate().hours_(1)}:${utils.getDate().minutes}

SMS A PRESENTER AU CONDUCTEUR

${utils.generateFakeID()}

tab-sms.fr`
            if (msg.toString().toLowerCase().replaceAll('bus', '').replaceAll(' ', '').replaceAll('n', 'N').includes('N')) {
                new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toLowerCase().replaceAll('bus', '').replaceAll(' ', '').replaceAll('n', 'N'), group: "Île-de-France mobilités", ticket: text, service: 'Bus urbain', operator: 'SNCF', num: 93100, _: msg.toString().toLowerCase().replaceAll('bus', '').replaceAll(' ', '').replaceAll('n', 'N') })
            } else {
                new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toLowerCase().replaceAll('bus', '').replaceAll(' ', ''), group: "Île-de-France mobilités", ticket: text, service: 'Bus urbain', operator: 'Ratpdev', num: 93100, _: msg.toString().toLowerCase().replaceAll('bus', '').replaceAll(' ', '').replaceAll('n', 'N') })
            }
        } else if (msg.toString().toUpperCase() == "TICE") {
            text = `
TICE

Valable 1h
${utils.getDate().hours}h${utils.getDate().minutes} à ${utils.getDate().hours_(1)}h${utils.getDate().minutes}
${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year}

SMS A PRESENTER AU CONDUCTEUR

${utils.generateFakeID()}

Bon voyage`
        new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toUpperCase(), group: "Île-de-France mobilités", ticket: text, service: 'Bus urbain', operator: 'Optile', num: 93100 })
    } else if (msg.toString().toUpperCase() == "TEST") {
        text = 'Votre ligne mobile est compatible avec le service.'
    } else {
        text = `
Ticket SMS disponible en envoyant : 
- BUS suivi de la ligne (BUS63, BUSN01) pour la RATP
- le mot clef affiché au point d'arret ou dans le véhicule pour OPTILE
    `
        }
        return text
    }
}

class T_93027 {
    parse(msg, user) {
        var text = '', utils = new Utils()
        if (msg.toString().toUpperCase() == "1H") {      
            text = `VALABLE LE ${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year.slice(-2)}
DE ${utils.getDate().hours}:${utils.getDate().minutes} A ${utils.getDate().hours_(1)}:${utils.getDate().minutes}

${utils.generateFakeID()}

Réseau semo
Mouv' 1 heure
1€

SMS à présenter au conducteur à chaque montée\n\n`
            new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toUpperCase(), group: "Semo mobilités", ticket: text, service: 'Bus urbain', operator: 'Semo', num: 93027 })
        } else if (msg.toString().toUpperCase() == "24H") {
            text = `DU ${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year.slice(-2)} A ${utils.getDate().hours}:${utils.getDate().minutes} 
AU ${utils.getDate().days_(1)}.${utils.getDate().month}.${utils.getDate().year.slice(-2)} A ${utils.getDate().hours}:${utils.getDate().minutes}
 
${utils.generateFakeID()}

Réseau semo
Mouv' 24 heures
2.40€

SMS à présenter au conducteur à chaque montée`
            new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toUpperCase(), group: "Semo mobilités", ticket: text, service: 'Bus urbain', operator: 'Semo', num: 93027 })
        } else if (msg.toString().toUpperCase() == "48H") {
            text = `DU ${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year.slice(-2)} A ${utils.getDate().hours}:${utils.getDate().minutes} 
AU ${utils.getDate().days_(1)}.${utils.getDate().month}.${utils.getDate().year.slice(-2)} A ${utils.getDate().hours}:${utils.getDate().minutes}
 
${utils.generateFakeID()}

Réseau semo
Mouv' 48 heures
3.90€

SMS à présenter au conducteur à chaque montée`
            new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toUpperCase(), group: "Semo mobilités", ticket: text, service: 'Bus urbain', operator: 'Semo', num: 93027 })
        } else if (msg.toString().toUpperCase() == 'TEST') {
            text = 'REPONSE TEST'
        } else {
            text = 'Ce message ne correspond à aucun service. Pour acheter votre titre de transport semo,  envoyez le code 1H ou 24H ou 48H au 93027.'
        }
        return text
    }
}

class T_93000 {
    parse(msg, user) {
        var text = '', utils = new Utils()
        if (msg.toString().toUpperCase() == "V1") {      
            text = `
Réseau ASTUCE
Titre 1 voyage
60min

Valable de ${utils.getDate().hours}:${utils.getDate().minutes} a ${utils.getDate().hours_(1)}:${utils.getDate().minutes}
le ${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year.slice(-2)}
1.60 euro

${utils.generateFakeID()}

Transfert interdit
www.reseau-astuce.fr`
            new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toUpperCase(), group: "Réseau astuce", ticket: text, service: 'Bus urbain', operator: 'Transdev, Keolis, TAE, VTNI', num: 93000 })
        } else if (msg.toString().toUpperCase() == "TEST") {
            text = 'Votre ligne mobile est compatible avec le service.'
        } else {
            text = `Erreur: votre message ne correspond à aucun titre de transport.
Pour acheter un titre de transport envoyez V1 (ticket 1h) ou J1 (ticket 24h) au 93000. `
        }
        return text
    }
}

class T_93123 {
    parse(msg, user) {
        var text = '', utils = new Utils()
        if (msg.toString().toUpperCase() == "V1") {      
            text = `
Titre valable 1 heure sur les réseau TAG, cars Région et TER.
le ${utils.getDate().day}.${utils.getDate().month}.${utils.getDate().year.slice(-2)} de ${utils.getDate().hours}:${utils.getDate().minutes} a ${utils.getDate().hours_(1)}:${utils.getDate().minutes}

1.70 €

${utils.generateFakeID()}

Transfert interdit
www.tag.fr/cgv`
            new WebHook(config.stats.discord_webhook).ticket({ user, code: msg.toString().toUpperCase(), group: "Réseau TAG", ticket: text, service: 'Bus urbain, Cars Région, TER', operator: 'TAG M', num: 93123 })
        } else if(msg.toString().toUpperCase() == "TEST") {
            text = 'Votre ligne mobile est compatible au service M TAG SMS. + d\'information sur Tag.fr'
        } else {
            text = 'Ce message ne correspond à aucun titre de transport. Pour acheter un ticket TAG valable 1 heure, envoyez 1H au 93123.'
        }
        return text
    }
}

class WebHook {
    constructor(url) {
        readonly: this.url = url
    }

    ticket({ num, operator, service, ticket, user, code, group, _ }) {
        const wh = new Webhook(this.url)
        wh.setAvatar('LOGO_FRANCE_MOBILITES.PNG')
        wh.setUsername('France moblités | Fraude')
        const embed = new Embed()
        .setTitle(operator)
        .addField('Utilisateur :', `@${user.username}`)
        .addField('Exploitant :', operator)
        .addField('Service :', service)
        .setThumbnail(config.webhook_graphics[num][operator].thumbnail)
        .setColor(config.webhook_graphics[num][operator].color)
        if (_ !== null) {
            embed.addField('Ligne :', _.line)
        }
        embed.addField('Numéro :', num)
        .addField('Code SMS', code)
        .addField('Groupe :', group)
        .addField('Ticket :', `\`\`\`${ticket}\`\`\``)
        wh.send(embed)
    }
}

class TicketsSMS {
    constructor({ number, parse }) {
        readonly: this.number = number
        readonly: this.parse = parse
        readonly: this.token = config.tabsms.find(obj => obj.num === this.number.toString()).token
    }

    start() {
        const bot = new Telegraf(this.token)
        bot.on('message', (object) => {
            if (object.message.text) {
                object.reply(this.parse(object.message.text, object.from))
            }
        })
        bot.launch()
        console.log(`Bot TAB-SMS-${this.number.toString().cyan} started at ${(new Utils().getDate().day + "/" + new Utils().getDate().month + "/" + new Utils().getDate().year  + " " + new Utils().getDate().hours + ":" + new Utils().getDate().minutes + ":" + new Utils().getDate().seconds).magenta}`)
    }
}

new TicketsSMS({ parse: new T_93100().parse, number: 93100 }).start()
new TicketsSMS({ parse: new T_93027().parse, number: 93027 }).start()
new TicketsSMS({ parse: new T_93000().parse, number: 93000 }).start()
new TicketsSMS({ parse: new T_93123().parse, number: 93123 }).start()