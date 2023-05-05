import { calcFrete } from "@/lib/utils";

export default async function handler (req: any, res: any) {
    if (req.method === 'POST') {
        try {
            const data = await calcFrete(req?.body?.destino);
            res.status(200).json(data);
        } catch (err: any) {
            res.status(400).send(err.message);
            return;
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed.')
    }
}