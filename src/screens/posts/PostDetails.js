import React from "react";
import {
  Text,
  SafeAreaView,
} from "react-native";

import styles from "./PostStyles.js";

const Posts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Post Details</Text>
    </SafeAreaView>
  );
};

export default Posts;
