const discord_permission = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS", "NONE"];
const util = require("./src/functions");
const { MessageButton, MessageActionRow } = require("discord.js");
class betterDJS {
    constructor(client) {
        this.client = client;
    };
    async createEmbed(interaction) {
        let embed = new MessageEmbed()
            .setAuthor("Embed Builder")
            .setDescription("Welcome to the interactive embed builder. Use the buttons below to build the embed, after click post!")
            .setFooter(interaction.member.guild.name)
        let row1 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("author")
            .setLabel("Author Text")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("title")
            .setLabel("Title Text")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("titleurl")
            .setLabel("Title URL")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("description")
            .setLabel("Description Text")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("footer")
            .setLabel("Footer Text")
            .setStyle("SECONDARY")
        )
        let row2 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("authorimage")
            .setLabel("Author Image")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("thumbnail")
            .setLabel("Thumbnail Image")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("image")
            .setLabel("Large Image")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("footerimage")
            .setLabel("Footer Image")
            .setStyle("SECONDARY")
        ).addComponents(
            new MessageButton()
            .setCustomId("color")
            .setLabel("Embed Color")
            .setStyle("SECONDARY")
        )
        let row3 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("fields")
            .setStyle("SECONDARY")
            .setLabel("Embed Fields")
        ).addComponents(
            new MessageButton()
            .setCustomId("channel")
            .setStyle("PRIMARY")
            .setLabel("Channel to Post")
        ).addComponents(
            new MessageButton()
            .setCustomId("post")
            .setStyle("DANGER")
            .setLabel("Post the embed")
        )
        let field;
        let buttons = [row1, row2, row3];
        interaction.reply({ embeds: [embed], components: buttons, ephemeral: true });
        const filter = click => click.user.id === interaction.member.id;
        const wordFilter = rep => { return rep.author.id === interaction.member.id };
        const collecter = interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
        let channel = interaction.channel;
        let back;
        collecter.on("collect", async function(click) {
            if (click.customId == "author") {
                click.update({ content: "What would you like to set the author text to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setAuthor(response.content, embed.author.iconURL || null); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "title") {
                click.update({ content: "What would you like to set the title text to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setTitle(response.content); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "titleurl") {
                click.update({ content: "What would you like to set the title URL to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setURL(response.content); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "description") {
                click.update({ content: "What would you like to set the description to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setDescription(response.content); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "footer") {
                click.update({ content: "What would you like to set the footer text to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setFooter(response.content || " ", embed.footer.iconURL || null); } catch (e) { console.log(e.stack) };
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "authorimage") {
                click.update({ content: "What would you like to set the author image to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setAuthor(embed.author.name, response.content || response.attachments.first().url); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "color") {
                click.update({ content: "What color would you like to set the embed to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setColor(response.content); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "thumbnail") {
                click.update({ content: "What would you like to set the thumbnail image to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setThumbnail(response.content || response.attachments.first().url); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "image") {
                click.update({ content: "What would you like to set the large image to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setImage(response.content || response.attachments.first().url); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "footerimage") {
                click.update({ content: "What would you like to set the footer image to?", components: [] });
                let response = await waitResponse(interaction.channel, wordFilter);
                if (!response) return returnHome(interaction, buttons);
                try { embed.setFooter(embed.footer.text || " ", response.content || response.attachments.first().url); } catch {};
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "channel") {
                click.update({ content: "What channel would you like to post this to?", components: [] });
                let msg = await channel.awaitMessages({ filter: wordFilter, max: 1, time: 120000 });
                let chan;
                if (msg.first().mentions.channels.first()) {
                    chan = msg.first().mentions.channels.first();
                } else {
                    chan = interaction.member.guild.channels.cache.get(msg.first().content);
                };
                try { msg.first().delete(); } catch {};
                if (chan) {
                    channel = chan;
                    buttons[2].components[1].setLabel(chan.name);
                };
                click.editReply({ embeds: [embed], content: " ", components: buttons });
            } else if (click.customId == "post") {
                channel.send({ embeds: [embed] });
                click.update({ embeds: [], components: [], content: "Embed Posted !" })
            } else if (click.customId == "fields") {
                let fieldButtons = await getFieldButtons(embed.fields);
                if (fieldButtons.length) {
                    fieldButtons[fieldButtons.length - 1].components.push(new MessageButton().setCustomId("go-back").setStyle("SUCCESS").setLabel("Go Back"));
                    fieldButtons[fieldButtons.length - 1].components.push(new MessageButton().setCustomId("create-new").setStyle("SUCCESS").setLabel("New Field"));
                } else {
                    fieldButtons[0] = new MessageActionRow().addComponents(new MessageButton().setCustomId("create-new").setStyle("SUCCESS").setLabel("New Field")).addComponents(new MessageButton().setCustomId("go-back").setStyle("SUCCESS").setLabel("Go Back"));
                }
                click.update({ components: fieldButtons });
                back = "home";
            } else if (click.customId == "create-new") {
                click.update({ content: "What should the name of this field be?", components: [] });
                let name = await waitResponse(interaction.channel, wordFilter);
                if (!name) return returnHome(click, buttons);
                click.editReply({ content: "What should the value of this field be?" });
                let value = await waitResponse(interaction.channel, wordFilter);
                if (!value) return returnHome(click, buttons);
                embed.addField(name.content, value.content);
                let fieldButtons = await getFieldButtons(embed.fields);
                if (fieldButtons.length) {
                    fieldButtons[fieldButtons.length - 1].components.push(new MessageButton().setCustomId("go-back").setStyle("SUCCESS").setLabel("Go Back"));
                    fieldButtons[fieldButtons.length - 1].components.push(new MessageButton().setCustomId("create-new").setStyle("SUCCESS").setLabel("New Field"));
                } else {
                    fieldButtons[0] = new MessageActionRow().addComponents(new MessageButton().setCustomId("create-new").setStyle("SUCCESS").setLabel("New Field")).addComponents(new MessageButton().setCustomId("go-back").setStyle("SUCCESS").setLabel("Go Back"));
                }
                click.editReply({ content: " ", embeds: [embed], components: fieldButtons });
                back = "home";
            } else if (click.customId == "go-back") {
                switch (back) {
                    case "home":
                        returnHome1(click, buttons);
                        break;
                    case "fields":
                        let fieldButtons = await getFieldButtons(embed.fields);
                        if (fieldButtons.length) {
                            fieldButtons[fieldButtons.length - 1].components.push(new MessageButton().setCustomId("go-back").setStyle("SUCCESS").setLabel("Go Back"));
                            fieldButtons[fieldButtons.length - 1].components.push(new MessageButton().setCustomId("create-new").setStyle("SUCCESS").setLabel("New Field"));
                        } else {
                            fieldButtons[0] = new MessageActionRow().addComponents(new MessageButton().setCustomId("create-new").setStyle("SUCCESS").setLabel("New Field")).addComponents(new MessageButton().setCustomId("go-back").setStyle("SUCCESS").setLabel("Go Back"));
                        }
                        click.update({ components: fieldButtons });
                        back = "home";
                        break;
                }
            } else if (click.customId.startsWith("edit-field-")) {
                field = Number(click.customId.split("-")[2]);
                let edits = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("field-name")
                    .setLabel("Field Name: " + embed.fields[field].name)
                    .setStyle("SECONDARY")
                ).addComponents(
                    new MessageButton()
                    .setCustomId("field-value")
                    .setLabel("Field Value")
                    .setStyle("SECONDARY")
                )
                if (embed.fields[field].inline == true) {
                    edits.addComponents(
                        new MessageButton()
                        .setCustomId("field-inline")
                        .setLabel("Field Inline")
                        .setStyle("SUCCESS")
                    )
                } else {
                    edits.addComponents(
                        new MessageButton()
                        .setCustomId("field-inline")
                        .setLabel("Field Inline")
                        .setStyle("DANGER")
                    )
                };
                click.update({ components: [edits, new MessageActionRow().addComponents(new MessageButton().setCustomId("go-back").setStyle("SUCCESS").setLabel("Go Back"))] })
                back = "fields";
            } else if (click.customId.startsWith("field-")) {
                let check = click.customId.split("-")[1];
                let backup = click.message.components;
                if (check == "name") {
                    click.update({ content: "What should the name of this field be?", components: [] });
                    let rep = await waitResponse(interaction.channel, wordFilter);
                    if (!rep) return returnHome(click, backup);
                    embed.fields[field].name = rep.content;
                    backup[0].components[0].setLabel(`Field Name: ${rep.content}`);
                    click.editReply({ content: " ", embeds: [embed], components: backup });
                } else if (check == "value") {
                    click.update({ content: "What should the value of this field be?", components: [] });
                    let rep = await waitResponse(interaction.channel, wordFilter);
                    if (!rep) return returnHome(click, backup);
                    embed.fields[field].value = rep.content;
                    click.editReply({ content: " ", embeds: [embed], components: backup });
                } else if (check == "inline") {
                    if (embed.fields[field].inline == true) {
                        embed.fields[field].inline = false;
                        backup[0].components[2].setStyle("DANGER");
                        click.update({ embeds: [embed], components: backup });
                    } else {
                        embed.fields[field].inline = true;
                        backup[0].components[2].setStyle("SUCCESS");
                        click.update({ embeds: [embed], components: backup });
                    }
                }
            };
        })
    }
};

module.exports = betterDJS;



async function getFieldButtons(fields) {
    let array = [];
    let row = new MessageActionRow()
    let limit = 0;
    for (let field of fields) {
        if (row.components.length == 5) {
            array.push(row);
            row = new MessageActionRow();
        };
        row.addComponents(new MessageButton().setCustomId("edit-field-" + limit).setStyle("SECONDARY").setLabel(field.name));
        limit++;
    };
    if (row.components.length) array.push(row);
    return array;
};

async function waitResponse(channel, filter) {
    let msg = await channel.awaitMessages({ filter: filter, max: 1, time: 120000 });
    try {
        msg.first().delete();
        return msg.first()
    } catch {
        return undefined;
    }
};

function returnHome(interaction, buttons) {
    interaction.editReply({ components: buttons, content: " " })
};

function returnHome1(interaction, buttons) {
    interaction.update({ components: buttons, content: " " })
};