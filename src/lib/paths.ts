import { base } from '$app/paths';

const protocolRe = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

export function withBase(path: string): string {
	if (!path) {
		return base;
	}

	if (protocolRe.test(path) || path.startsWith('//')) {
		return path;
	}

	if (path.startsWith('/')) {
		return `${base}${path}`;
	}

	return `${base}/${path}`;
}
