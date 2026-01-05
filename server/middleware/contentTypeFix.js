export default defineEventHandler((event) => {
    try {
        const url = event.node.req.url || event.path || '';
        const pathname = url.split('?')[0];

        if (!pathname.startsWith('/_nuxt')) return;

        const extMatch = pathname.match(/\.([a-z0-9]+)$/i);
        if (!extMatch) return;

        const ext = extMatch[1].toLowerCase();
        const types = {
            js: 'application/javascript; charset=utf-8',
            mjs: 'application/javascript; charset=utf-8',
            css: 'text/css; charset=utf-8',
            map: 'application/json; charset=utf-8',
            json: 'application/json; charset=utf-8',
            svg: 'image/svg+xml',
            png: 'image/png',
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            gif: 'image/gif',
            webp: 'image/webp',
            wasm: 'application/wasm',
        };

        const type = types[ext] || 'application/octet-stream';
        setResponseHeader(event, 'Content-Type', type);
    } catch (e) {
        console.log(e);
        // don't break responses on middleware errors
    }
});
