const API_URL = "http://localhost:5033/api/complaint"

export const complaintPostRequest = async ({postDetails, route}) => {
    const response =  await fetch(`${API_URL}/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postDetails)
    })

    const data = await response.json()
    return data
}

export const complaintGetRequest = async ({ route }) => {
    const response =  await fetch(`${API_URL}/${route}`)
    const data = await response.json()
    if(!data.ok) throw new Error(data.error)
    return data
}