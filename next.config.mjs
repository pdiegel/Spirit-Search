/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            //['s.gravatar.com', 'www.thecocktaildb.com']

            // Gravatar
            { protocol: 'https', hostname: 's.gravatar.com' },
            { protocol: 'https', hostname: 'www.thecocktaildb.com' },
            { protocol: 'https', hostname: 'upload.wikimedia.org' }
        ],
    }
};

export default nextConfig;
