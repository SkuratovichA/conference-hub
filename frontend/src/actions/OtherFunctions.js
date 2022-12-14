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