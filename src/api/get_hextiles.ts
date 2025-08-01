import { GameData } from "../data/GameData"

export async function get_hextiles() {
    const res = await fetch(`${GameData.apiBaseUrl}/hextiles`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${GameData.apiToken}`,
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return data
}

export async function get_hextiles_booth(booth_name: string) {
    const res = await fetch(`${GameData.apiBaseUrl}/hextiles/${booth_name}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${GameData.apiToken}`,
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    console.log('get_hextiles_booth', data)
    return data
}