// author: Shchapaniak Andrei

export const setProperty = (obj, path, value) => {
    const [head, ...rest] = path.split('.')

    return {
        ...obj,
        [head]: rest.length
            ? setProperty(obj[head], rest.join('.'), value)
            : value
    }
}

export const createFile = async (name) => {
    let response = await fetch('http://127.0.0.1:8000' + name);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };
    let file = new File([data], "test.jpg", metadata);
    console.log(file)
    return file
}

export const getAllConfsBucket = async () => {
    let response = await fetch('http://localhost:8000/ch/api/get_all_states_bucket', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let data = await response.json()
    return response.status >= 200 && response.status <= 299 ? data : {}
}

export const getStateConfBucket = async (nameconf, token) => {
    let response = await fetch('http://localhost:8000/ch/api/get_conf_state/' + nameconf, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        // body: JSON.stringify({
        //     data: dataToUpdate,
        // }),
    })

    let data = await response.json()
    return response.status >= 200 && response.status <= 299 ? data : {}
}