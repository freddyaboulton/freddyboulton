export function inview(node, params = {}) {
	const { threshold = 0.2, once = true } = params;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					node.dispatchEvent(new CustomEvent('inview', { detail: { inView: true } }));
					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					node.classList.remove('in-view');
					node.dispatchEvent(new CustomEvent('inview', { detail: { inView: false } }));
				}
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
