export const makePostRequest = async (url, details) => {
    const options = {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('Success Unicorn');
        return data;
    } catch (err) {
        return console.error('Error');
    };
};