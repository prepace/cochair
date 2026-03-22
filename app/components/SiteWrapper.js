'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const themes = {
	day: { class: '' },
	night: { class: 'dark' },
	storm: { class: 'storm' },
	aurora: { class: 'aurora' },
};

export default function SiteWrapper({ children }) {
	const [theme, _setTheme] = useState('day');

	useEffect(() => {
		document.documentElement.className = themes[theme].class;
	}, [theme]);

	return (
		<div className="min-h-screen theme-bg theme-fg">
			<Navbar />
			<main className="pt-16">{children}</main>
		</div>
	);
}
