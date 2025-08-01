import { GameData } from "../data/GameData"

export async function post_msg(booth_name: string, content: string) {
    const res = await fetch(`${GameData.apiBaseUrl}/msg`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GameData.apiToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            booth_name: booth_name,
            content: content
        }),
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
}