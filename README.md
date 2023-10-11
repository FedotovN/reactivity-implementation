# watch(ref, callback)
Utility to call function on reactive variable change
* ref: RefImpl object. watch function invokes callback if .value property was changed.
* callback: A function, that accepts a new ref as a first argument.

# ref(value)
Function that return a reactive variable.

# eff(callback)
Immediately invokes passed side effect, then inspects all of its dependencies and calls it every time when its reactive deps were changed


