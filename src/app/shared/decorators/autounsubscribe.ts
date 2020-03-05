export function AutoUnsubscribe(blackList = []) {

	return function (constructor) {
		const original = constructor.prototype.ngOnDestroy;

		constructor.prototype.ngOnDestroy = function () {
			for (let prop in this) {
				console.log(prop);
				const property = this[prop];
				if (!blackList.includes(prop)) {
					if (property && (typeof property.unsubscribe === "function")) {
						console.log(property);
						debugger
						property.unsubscribe();
					}
				}
			}
			original && typeof original === 'function' && original.apply(this, arguments);
		};
	}

}