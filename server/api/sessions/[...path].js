import { defineEventHandler, proxyRequest } from 'h3';

export default defineEventHandler(async (event) => {
    const path = event.context.params?.path || '';
    const targetUrl = `https://storefront-prod.fr.picnicinternational.com/api/15/${path}`;

    delete event.node.req.headers.origin;
    delete event.node.req.headers.referer;

    return proxyRequest(event, targetUrl, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': 'fr',
            'Accept-Encoding': 'gzip, deflate',
            'x-picnic-agent': '20100;1.15.310-21062',
            'User-Agent': 'Picnic/1.15.310 (iOS; iPhone; iOS 16.6; Scale/3.00)',
        },
    });
});
