import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Alert,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MessageComponent from "../../components/posts/MessageComponent";
import ReplayComponent from "../../components/posts/ReplayComponent";
import OptionComponent from "../../components/OptionComponent";

import { updatePostLikes, addPostComment } from "../../redux/actions/postActions";
import { goBack } from "../../context/NavigationContext";
import { dateFormat } from "../../utils/helperFunctions";
import styles from "./PostStyles.js";

const Posts = ({ route }) => {
  const { postId } = route?.params ?? {};
  const { posts = [] } = useSelector(state => state.postReducer ?? {});
  const { bottom } = useSafeAreaInsets();
  const commentInputRef = useRef(null);

  const [isLiked, setIsLiked] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [comment, setComment] = useState("");

  const postData = posts.find(p => p.id === postId) || {};

  const { id, post_category = "", message = "", likes = 0, created_at = "", user = {}, replies = [] } = postData;
  const { full_name = "", avatar = "" } = user;
  const totalComments = replies?.length ?? 0;
  const comments = [...replies];

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setFetching(false);
    }, 1000);
  }, []);

  const onLikeDisLikePress = () => {
    const liked = !isLiked;
    const newLikes = liked ? likes + 1 : likes - 1;
    dispatch(updatePostLikes({
      liked,
      postId: id,
      likes: newLikes < 1 ? 0 : newLikes,
    }));
    setIsLiked(liked);
  };

  const onCommentAdded = () => {
    if (!comment) {
      Alert.alert("Empty Comment", "Please add some comment...");
      return false;
    }
    const commentData = {
      id: Math.floor(Math.random() * 100000),
      user: {
        id: 2,
        avatar: "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
        full_name: "Jason Shrensky"
      },
      message: comment,
      created_at: moment().format("MMM DD YYYY HH:mm:ss"),
      replies: [],
      likes: 0,
    };
    dispatch(addPostComment({ postId: id, commentData }));
    setComment("");
  };

  const renderReplay = (item, ind) => {
    const isLastComment = (ind === (comments.length - 1));
    return (
      <ReplayComponent
        postId={id}
        data={item}
        index={ind}
        key={item.id}
        isLastComment={isLastComment}
      />
    );
  };

  if (fetching) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size={"large"} color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerStyle}>
        <View style={styles.headerInner}>
          <Pressable onPress={() => goBack()} hitSlop={15}>
            <MaterialIcons
              size={25}
              color={"#000"}
              name="arrow-back"
            />
          </Pressable>
          <View style={styles.profileView}>
            {
              avatar ? (
                <Image source={{ uri: avatar }} resizeMode={"stretch"} style={styles.userAvatar} />
              ) : null
            }
            <View style={styles.profileRightView}>
              <View style={styles.profileNameView}>
                <Text style={styles.userFullName}>{full_name}</Text>
                <FontAwesome size={18} style={{ marginHorizontal: 8 }} name={"caret-right"} color="#000" />
                <Text style={styles.userFullName}>{post_category}</Text>
              </View>
              <Text style={styles.dateTimeTxt}>{dateFormat(created_at)}</Text>
            </View>
          </View>
          <OptionComponent>
            <MaterialIcons name="more-horiz" color={"#000"} size={18} />
          </OptionComponent>
        </View>
      </SafeAreaView>
      <ScrollView
        enableOnAndroid
        extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContainer, { paddingBottom: bottom + 60 }]}
      >
        <View style={styles.postDataContainer}>
          <MessageComponent message={message} />
          <View style={styles.seprator} />
          <View style={styles.postActionBar}>
            <View style={styles.postActionLeftBar}>
              <Pressable style={styles.postactionBtn} onPress={onLikeDisLikePress}>
                <FontAwesome
                  size={18}
                  color={isLiked ? "#f00" : "#000"}
                  name={isLiked ? "heart" : "heart-o"}
                />
                <Text style={[styles.postactionBtnTxt, isLiked && { color: "#f00" }]}>{likes}</Text>
              </Pressable>
              <Pressable style={styles.postactionBtn}>
                <FontAwesome
                  size={18}
                  color={"#000"}
                  name={"comment-o"}
                />
                <Text style={styles.postactionBtnTxt}>{totalComments}</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => commentInputRef?.current.focus()} style={[styles.postactionBtn, { marginRight: 0 }]}>
              <FontAwesome
                size={18}
                name={"reply"}
                color={"#D4AF37"}
              />
              <Text style={[styles.postactionBtnTxt, { color: "#D4AF37" }]}>Reply</Text>
            </Pressable>
          </View>
          <View>
            {
              totalComments > 0 ? (
                comments.map(renderReplay)
              ) : null
            }
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior="position" style={styles.commentKeyboardAvoidingViewStyle}>
        <View style={[styles.commentInputContainer, { paddingBottom: bottom + 10 }]}>
          <TextInput
            multiline
            value={comment}
            ref={commentInputRef}
            autoCapitalize="none"
            placeholder="Add Comments"
            style={styles.commentInputStyle}
            onChangeText={c => setComment(c)}
          />
          <Pressable hitSlop={10} onPress={onCommentAdded}>
            <FontAwesome name="send-o" size={20} color="#000" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Posts;
