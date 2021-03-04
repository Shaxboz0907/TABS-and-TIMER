const postData = async (url, data) => {    // asixron ishlaydigan func bor dedi async
    const res = await fetch( url, {        // await shu func bajarilishini kutish
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data // body = 'formData'ga teng
    });
    return await res.json();
};

const getResource = async (url) => { // asixron ishlaydigan func bor dedi (async)
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

export {postData} ;
export {getResource} ;