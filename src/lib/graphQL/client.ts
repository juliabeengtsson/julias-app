import { env } from "@/env"; 


export default async function fetchAPI(query: string, variables?: unknown) {
    try {
       const res = await fetch(env.DATABASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables,
            }),
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }

        const data = await res.json()
        return data;

    } catch(e) {
        console.error(e);
        throw e;
    }
}