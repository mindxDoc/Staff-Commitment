export const makePostRequest = async (url, details) => {
    const options = {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return console.log('Success Unicorn');
    } catch (err) {
        return console.error('Error');
    };
};