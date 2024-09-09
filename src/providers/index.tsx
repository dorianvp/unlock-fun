'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: '#22F7DD',
						accentColorForeground: '#07115E',
						borderRadius: 'medium',
						fontStack: 'system',
						overlayBlur: 'small',
					})}
					coolMode>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
