// author: Shchapaniak Andrei

export const conferenceCRUDHandler = async (type, _conference, token, dataToUpload, imagee) => {
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
                    data: dataToUpload,
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
                    data: dataToUpload,
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
                    data: dataToUpload,
                }),
            })

            data = await response.json()
            return response.status >= 200 && response.status <= 299 ? data : {}
        case "fetchEvents":
             response = await fetch(String('http://localhost:8000/conferences/api/get_events/' + _conference), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            data = await response.json()
            console.log('fetched events', data['events'])
            return response.status >= 200 && response.status <= 299 ? data['events'] : {}

        case "createEvent":
            response = await fetch(String('http://localhost:8000/conferences/api/create_event/' + _conference), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    data: dataToUpload,
                }),
            })
            console.log('Successfully created event')
            return

        case "updateEvent":
            response = await fetch(String('http://localhost:8000/conferences/api/update_event/' + _conference), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    data: dataToUpload,
                }),
            })
            console.log('Successfully created event')
            return

        case "deleteEvent":
            response = await fetch(String('http://localhost:8000/conferences/api/delete_event/' + _conference), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    data: dataToUpload,
                }),
            })
            console.log('Successfully created event')
            return
    }
}
