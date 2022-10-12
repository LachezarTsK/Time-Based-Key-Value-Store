
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TimeMap {

    private record Data(String value, int timestamp){}
    private static final String NOT_FOUND = "";
    Map<String, List<Data>> keyWordToData;

    public TimeMap() {
        keyWordToData = new HashMap<>();
    }

    public void set(String keyWord, String value, int timestamp) {
        keyWordToData.putIfAbsent(keyWord, new ArrayList<>());
        keyWordToData.get(keyWord).add(new Data(value, timestamp));
    }

    public String get(String keyWord, int timestamp) {
        if (!keyWordToData.containsKey(keyWord) || keyWordToData.get(keyWord).get(0).timestamp > timestamp) {
            return NOT_FOUND;
        }
        int index = binarySearchForClosestTimestampFromBelowTarget(keyWord, timestamp);
        return keyWordToData.get(keyWord).get(index).value;
    }

    private int binarySearchForClosestTimestampFromBelowTarget(String keyWord, int targetTimestamp) {
        List<Data> data = keyWordToData.get(keyWord);
        int left = 0;
        int right = data.size() - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (data.get(middle).timestamp <= targetTimestamp) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
}
