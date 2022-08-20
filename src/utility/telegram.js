import {makePostRequest} from "./api";
import 'dotenv/config'

const telegramBotKey = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const chat_id = process.env.REACT_APP_TELEGRAM_USER_ID;

export const sendNotification = async (text, parse_mode) => {
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
    await makePostRequest(endpoint,
        {
            text,
            parse_mode,
            disable_web_page_preview: false,
            disable_notification: false,
            reply_to_message_id: 0,
            chat_id
          });
};