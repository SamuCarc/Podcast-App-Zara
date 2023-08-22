/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "is5-ssl.mzstatic.com",
      "is3-ssl.mzstatic.com",
      "is4-ssl.mzstatic.com",
      "is2-ssl.mzstatic.com",
      "is1-ssl.mzstatic.com",
      "www.omnycontent.com",
      "*",
    ], // puedes añadir más si es necesario
  },
};

module.exports = nextConfig;
