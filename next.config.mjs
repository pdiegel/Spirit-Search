/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            //['s.gravatar.com', 'www.thecocktaildb.com']

            // Gravatar
            { protocol: 'https', hostname: 's.gravatar.com' },
            { protocol: 'https', hostname: 'www.thecocktaildb.com' },
            { protocol: 'https', hostname: 'upload.wikimedia.org' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
        ],
    }
};

export default nextConfig;
