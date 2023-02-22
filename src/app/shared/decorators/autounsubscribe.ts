export function AutoUnsubscribe(blackList = []) {

	return function (constructor) {
		const original = constructor.prototype.ngOnDestroy;

		constructor.prototype.ngOnDestroy = function () {
			for (const prop in this) {
				const property = this[prop];
				if (!blackList.includes(prop)) {
					if (property && (typeof property.unsubscribe === "function")) {				
						property.unsubscribe();
					}
				}
			}
			// eslint-disable-next-line prefer-rest-params
			original && typeof original === 'function' && original.apply(this, arguments);
		};
	}

}