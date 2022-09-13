import React from "react";
import {
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

import PostCard from "../../components/posts/PostCard.js";

import styles from "./PostStyles.js";

const PostList = () => {
  const { posts = [] } = useSelector((state) => state?.postReducer ?? {});

  const renderPost = ({ item }) => (
    <PostCard data={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(p) => `${p.id}`}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 15 }}
      />
    </SafeAreaView>
  );
};

export default PostList;
