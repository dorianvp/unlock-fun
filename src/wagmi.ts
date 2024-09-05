import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
	zetachain
} from 'wagmi/chains';

export const config = getDefaultConfig({
	appName: 'RainbowKit demo',
	projectId: 'YOUR_PROJECT_ID',
	chains: [
		zetachain
	],
	ssr: true,
});
