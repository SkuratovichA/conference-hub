// author: Shchapaniak Andrei

export const conferenceCRUDHandler = async (type, _conference, token, dataToUpdate, imagee) => {
    let response, data;

    switch (type) {
        case "fetch_one":
            console.log("FETCH ONE")
            response = await fetch(String('http://localhost:8000/conferences/api/get_conf/' + _conference), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            data = await response.json()
            return response.status >= 200 && response.status <= 299 ? data['conf'] : {}
        case "fetch_all":
            console.log("FETCH ALL")
            response = await fetch('http://localhost:8000/conferences/api/get_all_confs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            data = await response.json()
            return response.status >= 200 && response.status <= 299 ? data : {}
        case "update":
            console.log("UPDATE")
            response = await fetch(String('http://localhost:8000/conferences/api/manipulate_conf/' + _conference), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    data: dataToUpdate,
                }),
            })

            data = await response.json()
            return response.status >= 200 && response.status <= 299 ? data : {}
        case "delete":
            console.log("DELETE")
            response = await fetch(String('http://localhost:8000/conferences/api/manipulate_conf/' + _conference), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    data: dataToUpdate,
                }),
            })

            data = await response.json()
            return response.status >= 200 && response.status <= 299 ? data : {}
        case "create":
            response = await fetch(String('http://localhost:8000/conferences/api/manipulate_conf/' + _conference), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    data: dataToUpdate,
                }),
            })

            data = await response.json()
            return response.status >= 200 && response.status <= 299 ? data : {}
    }
}
