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

        const data = res.json()
        return data;

    } catch(e) {
        console.error(e);
    }
}


