String.prototype.format = function (...args) {
    return this.replace(/{(\d+)}/g, (match, index) => args[index] || '');
};
//# sourceMappingURL=extension.js.map