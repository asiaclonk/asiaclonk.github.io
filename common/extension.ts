declare interface String {
    format(...args: string[]): string;
}

String.prototype.format = function (this: string, ...args: string[]) {
    return this.replace(/{(\d+)}/g, (match, index) => args[index] || '');
};