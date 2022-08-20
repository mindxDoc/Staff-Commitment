import {makePostRequest} from "./api";
import 'dotenv/config'

const formToken = process.env.REACT_APP_GOOGLE_FORM;

export const postMessageToGoogle = async (data) => {
    const endpoint = `https://docs.google.com/forms/d/e/${formToken}/formResponse`;

    await makePostRequest(endpoint, data);
}