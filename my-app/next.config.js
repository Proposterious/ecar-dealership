/** @type {import('next').NextConfig} */

module.exports = {
    experimental: { 
        appDir: true, 
        serverComponentsExternalPackages: ["mongoose"]
    },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    }
};