declare interface String {
    /** The familiar format function that replaces {0} inserts. */
    format(...args: string[]): string;
}

String.prototype.format = function (this: string, ...args: string[]) {
    return this.replace(/{(\d+)}/g, (match, index) => args[index] || '');
};