import React from 'react';
import CustomerApi from './CustomerApi';


const Example = () => {
    useEffect(() => {
        const option = {
            url: '/user',
            isCashe: true,
        }
        CustomerApi.GET(option)
            .then(res => console.log('GET User Info --> ', res))
            .catch(error => console.log(error))

    }, [])
    return <div></div>
}
export default Example;