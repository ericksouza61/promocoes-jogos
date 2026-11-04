export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host;
        const fullUrl = new URL(req.url, `${protocol}://${host}`);
        
        // Remove o caminho '/api/deals' e mantém apenas os parâmetros de consulta (query string)
        const searchParams = fullUrl.searchParams;
        
        const targetUrl = `https://www.cheapshark.com/api/1.0/deals?${searchParams.toString()}`;

        const apiResponse = await fetch(targetUrl);
        if (!apiResponse.ok) {
            throw new Error(`Erro na API CheapShark: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
