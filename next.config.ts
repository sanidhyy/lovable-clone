import type { NextConfig } from 'next';

import '@/env/client';
import '@/env/server';

const nextConfig: NextConfig = {
	images: { unoptimized: true },
	devIndicators: false,
};

export default nextConfig;
