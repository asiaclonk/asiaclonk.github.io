function random_int(min, max) {
    var range = max - min + 1;
    return min + Math.floor(Math.random() * range);
}

function random_zerobase(max) {
    return Math.floor(Math.random() * max);
}