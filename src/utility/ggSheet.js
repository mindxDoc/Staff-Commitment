import {makePostRequest} from "./api";
import 'dotenv/config'

export const postMessageToGoogle = async (data) => {
    const endpoint = 'https://docs.google.com/forms/d/e/1FAIpQLSccUAKYWu3NqWTCQrh2FkofXcfcEBJu2dxxF88EYfJgNij6oA/formResponse';

    await makePostRequest(endpoint, data);
}