import axios from 'axios'

// const history = 
export const axiosInstance = axios.create({
    baseURL: 'https://608bc792737e470017b754c2.mockapi.io',
    headers: { 'Accept': 'application/json' }
});

const fetcher = async payload => {
    const { url, data = false, method = "GET", isCashe = false } = payload;

    const fetchApi = async () => {
        const config = { method, url }
        if (data) config.data = data;
        const res = await axios(config);
        if (isCashe) {
            caches.open('responses').then(cache => {
                cache.add(url, res).then(() => {
                    console.log(`${url} reponse chached `)
                })
            });
        }
        return res;
    }

    const fetchFromCahce = async () => {
        return await caches.open('responses').then(async cache => {
            const res = await cache.match(url);
            console.log('RESPONCE GET FROM CACHE --> ')
            if (res) return res;
            return fetchApi();
        });
    }

    if (isCashe) {
        console.log('UPDATE CACHE --> ')
        return fetchFromCahce();


    } else {
        return fetchApi();
    }

};

export default fetcher;
