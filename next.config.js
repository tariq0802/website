const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "cgwebsite.s3.ap-south-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
