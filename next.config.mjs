/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"firebasestorage.googleapis.com",
			"m.media-amazon.com",
			"googleusercontent.com",
			"lh3.googleusercontent.com",
		],
	},
};

export default nextConfig;
