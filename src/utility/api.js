export const makePostRequest = (url, details) => {
    const options = {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
    };

    return fetch(url, options)
        .then((response) => response.json())
        .then(data => console.log('Success:', data))
        .catch(err => console.error('Error:', err));;
};