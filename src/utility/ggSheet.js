import 'dotenv/config'

const formToken = process.env.REACT_APP_GOOGLE_FORM;

export const postMessageToGoogle = async (data) => {
    const endpoint = `https://docs.google.com/forms/d/e/${formToken}/formResponse`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            mode: "no-cors",
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        });
        const string = await response.text();
        console.log("Let's Party");
        const json = string === "" ? {} : JSON.parse(string);
        return json;
    } catch (error) {
        return console.error("What's wrong? => ", error);
    }
}