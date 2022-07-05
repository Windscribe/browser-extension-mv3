type methodT = 'info' | 'error';

export default function(title: string, data?: unknown, method?: methodT): void {
	if (method === 'error') {
		console.log(`%c Error: ${title}:`, 'background: #c83E49; color: #1ADEAE', data);
	} else {
		console.log(`%c ${title}`, 'background: #383E49; color: #1ADEAE;', data);
	}
}