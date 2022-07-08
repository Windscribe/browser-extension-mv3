/* 
Custom colored console.log 
Could be used until pushToDebugLog() will be implemented
*/

type Variant = 'info' | 'error' | 'warn';

export default function(title: string, data?: unknown, variant?: Variant): void {
	if (variant === 'error') {
		console.log(`%c Error: ${title}:`, 'background: #c83E49; color: #1ADEAE', data);
	} else if (variant === 'warn') {
		console.log(`%c ${title}`, 'background: #f8aE49; color: #3A3E4E;', data);
	} else {
		console.log(`%c ${title}`, 'background: #383E49; color: #1ADEAE;', data);
	}
}