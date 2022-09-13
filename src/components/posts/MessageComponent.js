import React, { useCallback, useState, memo } from "react";
import { View, Text } from "react-native";

const MessageComponent = (props) => {
  const { message = "", maxLines = 4 } = props;
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  }

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= maxLines);
  }, []);

  return (
    <View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : maxLines}
        style={{ lineHeight: 18, fontSize: 14 }}>{message.split(" ").map((m, i) => (
          <Text key={`${i}_${m}`} style={{ color: m.charAt(0) === "#" ? "blue" : "#000" }}>{m} </Text>
        ))}</Text>
      {
        lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{ lineHeight: 18, fontSize: 14, color: "blue" }}
          >
            {textShown ? 'Read less' : 'Read more'}
          </Text>
        ) : null
      }
    </View>
  )
};

export default memo(MessageComponent);
