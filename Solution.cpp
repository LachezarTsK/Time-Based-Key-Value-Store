
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

class TimeMap {

    struct Data {
        string value{};
        int timestamp{};
        Data(const string& value, int timestamp) : value{value}, timestamp{timestamp}{}
    };
    inline static const string NOT_FOUND = "";
    unordered_map<string, vector<Data>> keyWordToData;

public:
    TimeMap() = default;

    void set(const string& keyWord, const string& value, int timestamp) {
        keyWordToData[keyWord].emplace_back(Data(value, timestamp));
    }

    string get(const string& keyWord, int timestamp) {
        //C++20: !keyWordToData.contains(keyWord)
        if (keyWordToData.find(keyWord) == keyWordToData.end() || keyWordToData[keyWord][0].timestamp > timestamp) {
            return NOT_FOUND;
        }
        int index = binarySearchForClosestTimestampFromBelowTarget(keyWord, timestamp);
        return keyWordToData[keyWord][index].value;
    }

private:
    int binarySearchForClosestTimestampFromBelowTarget(const string& keyWord, int targetTimestamp) {
        vector<Data>& data = keyWordToData[keyWord];
        int left = 0;
        int right = data.size() - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (data[middle].timestamp <= targetTimestamp) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
};
