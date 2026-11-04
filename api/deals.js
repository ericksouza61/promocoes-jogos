export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        // Monta os parâmetros de forma segura garantindo valores padrão caso venham vazios
        const query = req.query || {};
        const onSale = query.onSale || '1';
        const lowerPrice = query.lowerPrice || '0';
        const upperPrice = query.upperPrice || '300';
        const sortBy = query.sortBy || 'Savings';
        const desc = query.desc || '1';
        const pageNumber = query.pageNumber || '0';
        const pageSize = query.pageSize || '20';

        let targetUrl = `https://www.cheapshark.com/api/1.0/deals?onSale=${onSale}&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}&sortBy=${sortBy}&desc=${desc}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

        if (query.storeID) {
            targetUrl += `&storeID=${query.storeID}`;
        }
        if (query.title) {
            targetUrl += `&title=${encodeURIComponent(query.title)}`;
        }

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
