import vaultFn from 'node-vault';

const vault = vaultFn({
    apiVersion: 'v1',
    endpoint: 'http://vault.priv.acnodu.fr',
});

// eslint-disable-next-line import/no-mutable-exports
let config = {};

const generateConfig = async () => {
    const { default: pkg } = await import('./../../package.json', { with: { type: 'json' } });

    const login = await vault.approleLogin({
        role_id: '8dc52e67-feab-5e6d-903b-33fcd4e28671',
        secret_id: '65c641c0-2ed5-b6f7-53d4-5629db54bf0a',
    });


    console.log(`docker/data/${pkg.name}/${process.env.ENV}`.toLowerCase())
    vault.token = login.auth.client_token;

    const { data } = await vault.read(
        `docker/data/${pkg.name}/${process.env.ENV}`.toLowerCase()
    );

    config = data.data;
};

export { config, generateConfig };
