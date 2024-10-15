const typeOf = (t: unknown) =>
    Object.prototype.toString
        .call(t)
        .replace(/^\[object (.+)\]$/, '$1')
        .toLowerCase();

export { typeOf };
