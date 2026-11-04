// api/deals.js
export default async function handler(req, res) {
    // Permite que seu frontend acesse esta API sem bloqueio de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { onSale, lowerPrice, upperPrice, sortBy, desc, pageNumber, pageSize, storeID, title } = req.query;

    let targetUrl = `https://www.cheapshark.com/api/1.0/deals?onSale=${onSale || 1}&lowerPrice=${lowerPrice || 0}&upperPrice=${upperPrice || 300}&sortBy=${sortBy || 'Savings'}&desc=${desc || 1}&pageNumber=${pageNumber || 0}&pageSize=${pageSize || 20}`;

    if (storeID) targetUrl += `&storeID=${storeID}`;
    if (title) targetUrl += `&title=${encodeURIComponent(title)}`;

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Erro na API da CheapShark');
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar ofertas no servidor' });
    }
}
