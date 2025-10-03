/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kbtmhgwptzbslfsijjff.supabase.co",
        pathname: "/storage/v1/object/public/watchers_images/**",
      },
    ],
  },
};

export default nextConfig;
