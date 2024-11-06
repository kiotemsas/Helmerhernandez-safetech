import  es  from "date-fns/locale/es/index.js";

const nextConfig = {
    reactStrictMode: false,    
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            child_process: false,
            fs: false,
          };
        }
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
