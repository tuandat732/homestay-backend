module.exports = getTime = (date) => {
    let now = Date.now();
    let subTime = (now-Date.parse(date)) / 1000
    if (subTime >= 1 && subTime < 60) return `${Math.floor(subTime)} seconds`
    subTime = subTime / 60;
    if (subTime >= 1 && subTime < 60) return `${Math.floor(subTime)} minutes`
    subTime = subTime / 60;
    if (subTime >= 1 && subTime < 24) return `${Math.floor(subTime)} hours`
    subTime = subTime / 24;
    if (subTime >= 1 && subTime < 30) return `about ${Math.floor(subTime)} days`
    subTime = subTime / 30;
    if (subTime >= 1 && subTime < 12) return `about ${Math.floor(subTime)} months`;
    subTime = subTime / 12;
    return `about ${subTime} year`
}
