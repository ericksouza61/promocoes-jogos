export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        // Extrai a query string diretamente do objeto de requisição da Vercel
        const urlParams = new URLSearchParams(req.query).toString();
        const targetUrl = `https://www.cheapshark.com/api/1.0/deals?${urlParams || 'onSale=1&pageSize=20'}`;

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
