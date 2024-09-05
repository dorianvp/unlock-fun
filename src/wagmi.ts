import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
	scroll
} from 'wagmi/chains';

export const config = getDefaultConfig({
	appName: 'RainbowKit demo',
	projectId: 'YOUR_PROJECT_ID',
	chains: [
		scroll
	],
	ssr: true,
});
