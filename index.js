const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const https = require('https');

const TOKEN = '6803155643:AAGhoxqRZSGqsdtrKZVhM_Uiqc1XSdtiSjc';
const BOT_URL = 'https://api.telegram.org/bot' + TOKEN;

// Set the ngrok public URL as the webhook endpoint
const ngrokUrl = 'https://1b66-2-51-142-210.ngrok-free.app';
const webhookUrl = '${ngrokUrl}/https://api.telegram.org/bot7059112396:AAFcqdx-pl1U0vXikedJ67MQVXMUijmWulI/setWebhook?url=https://1b66-2-51-142-210.ngrok-free.app';

// Set the webhook URL for the Telegram bot
https.get('https://api.telegram.org/bot7059112396:AAFcqdx-pl1U0vXikedJ67MQVXMUijmWulI/setWebhook?url=https://1b66-2-51-142-210.ngrok-free.app', (res) => {
    console.log(`Webhook set to, ${webhookUrl}`);
});
const bot = new telegramBot(TOKEN, {polling: true});

bot.onText(/\/myBot/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Button 1', callback_data: 'btn1' }],
                [{ text: 'Button 2', callback_data: 'btn2' }]
            ]
        }
    };
    bot.sendMessage(chatId, 'Hello from your Telegram Bot : \nChoose an option:', options);
    
});

bot.on('callback_query', async (msg) => {
    const chatId = msg.message.chat.id;
    const button = msg.data;
    if(button === 'btn1'){
      bot.sendMessage(chatId, `Today is : ${new Date}`);
    }
    if(button === 'btn2'){
      bot.sendMessage(chatId, `You clicked on ${button}`);
    }
});
