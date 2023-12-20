/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com", "cdn.sanity.io"],
    },
  };
  
  const withPWA = require("next-pwa")({
    dest: "public",
  });
  
  // Merge configurations
  module.exports = {
    ...nextConfig,
    ...withPWA,
    // other configurations if needed
  };
  