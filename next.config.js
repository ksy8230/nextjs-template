/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = (phase, { defaultConfig }) => {
  const rewrites = () => {
    return [
      {
        source: "/login/",
        destination: "http://127.0.0.1:8000/account/*",
      },
    ];
  };

  return { rewrites };
};
