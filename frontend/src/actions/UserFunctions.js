export const getInfoUser = async (token) => {
        let response = await fetch('http://localhost:8000/users/api/get_info_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })

        let data = await response.json()

        if (response.status === 200) {
            return data
        }
        else {
            alert("!PIZDA SAPOGAM INFO USER!")
            return {}
        }
    }