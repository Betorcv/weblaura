/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Si tu repositorio se llama 'weblaura', el basePath sería '/weblaura'
    // Si quieres que esté en la raíz de github.io, déjalo vacío o comenta esta línea
    // basePath: '/weblaura',
    // trailingSlash: true,
}

module.exports = nextConfig

