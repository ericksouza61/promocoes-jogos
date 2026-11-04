export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        const queryParams = new URLSearchParams(req.query).toString();
        const targetUrl = `https://www.cheapshark.com/api/1.0/deals?${queryParams}`;

        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`Erro na API externa: ${response.status}`);
        }
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
