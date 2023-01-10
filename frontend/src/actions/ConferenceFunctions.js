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
            // id: 1
            // brief: "description",
            // name: 'Skuratovich Aliaksandr',
            // type: "poster",
            // location: "somewhere",
            // participants: ['aaa'],
            // imageUrl:
            //     'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            // startDatetime: '2022-12-13T15:00',
            // endDatetime: '2022-12-13T15:30',
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

        case "editEvent":
            return []

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
