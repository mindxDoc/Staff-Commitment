import 'dotenv/config'

const formToken = process.env.REACT_APP_GOOGLE_FORM;

export const postMessageToGoogle = async (data) => {
    const endpoint = `https://docs.google.com/forms/d/e/${formToken}/formResponse`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            mode: "no-cors",
            header: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        const res = await response.json();
        return console.log('Success', res);
    } catch (error) {
        return console.error('Error', error);
    }
}