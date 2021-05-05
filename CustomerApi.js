import fetcher from './axiosInstance';

const baseURL = 'https://608bc792737e470017b754c2.mockapi.io';

class CustomerApi {
    GET = ({ url, isCashe }) => {
        return fetcher({
            url: `${baseURL}${url}`,
            method: 'GET',
            isCashe
        })
    };

    POST = ({ url, isCashe, data }) => {
        return fetcher({
            url: `${baseURL}${url}`,
            method: 'GET',
            data,
            isCashe
        })
    }
}

export default new CustomerApi();