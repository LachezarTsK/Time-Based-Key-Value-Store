
/** 
 * @param {string} value 
 * @param {number} timestamp
 */
function Data(value, timestamp) {
    this.value = value;
    this.timestamp = timestamp;
}

class TimeMap {

    constructor() {
        this.NOT_FOUND = "";
        this.keyWordToData = new Map();// Map<string, Data[]>
    }

    /** 
     * @param {string} keyWord 
     * @param {string} value 
     * @param {number} timestamp
     * @return {void}
     */
    set(keyWord, value, timestamp) {
        if (!this.keyWordToData.has(keyWord)) {
            this.keyWordToData.set(keyWord, []);
        }
        this.keyWordToData.get(keyWord).push(new Data(value, timestamp));
    }

    /** 
     * @param {string} keyWord 
     * @param {number} targetTimestamp
     * @return {string}
     */
    get(keyWord, targetTimestamp) {
        if (!this.keyWordToData.has(keyWord) || this.keyWordToData.get(keyWord)[0].timestamp > targetTimestamp) {
            return this.NOT_FOUND;
        }
        let index = this.binarySearchForClosestTimestampFromBelowTarget(keyWord, targetTimestamp);
        return this.keyWordToData.get(keyWord)[index].value;
    }

    /** 
     * @param {string} keyWord 
     * @param {number} targetTimestamp
     * @return {number}
     */
    binarySearchForClosestTimestampFromBelowTarget(keyWord, targetTimestamp) {
        let data = this.keyWordToData.get(keyWord);
        let left = 0;
        let right = data.length - 1;

        while (left <= right) {
            let middle = left + Math.floor((right - left) / 2);
            if (data[middle].timestamp <= targetTimestamp) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
}
