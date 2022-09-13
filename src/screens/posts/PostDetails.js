import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Text,
  View,
  Alert,
  Image,
  Keyboard,
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

import { updatePostLikes, addPostComment, addPostSubComment } from "../../redux/actions/postActions";
import { goBack } from "../../context/NavigationContext";
import { dateFormat } from "../../utils/helperFunctions";
import styles from "./PostStyles.js";

const Posts = ({ route }) => {
  const { postId, addComment = false, replyId = undefined } = route?.params ?? {};
  const { bottom } = useSafeAreaInsets();
  const commentInputRef = useRef(null);
  const dispatch = useDispatch();
  const { posts = [] } = useSelector(state => state.postReducer ?? {});
  const { user: currentUser = {} } = useSelector(state => state?.userReducer ?? {});
  const postData = posts.find(p => p.id === postId) || {};
  const {
    id,
    likes = 0,
    user = {},
    message = "",
    replies = [],
    liked_by = [],
    created_at = "",
    post_category = "",
  } = postData;
  const { full_name = "", avatar = "" } = user;
  const totalReplies = replies?.length ?? 0;

  const [comment, setComment] = useState("");
  const [fetching, setFetching] = useState(true);
  const [replyData, setReplyData] = useState(null);
  const [isLiked, setIsLiked] = useState(liked_by.length > 0 && liked_by.some(lb => lb?.id === currentUser?.id));

  useEffect(() => {
    setTimeout(() => {
      setFetching(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!fetching && addComment && commentInputRef?.current) {
      commentInputRef?.current.focus();
      if (!!replyId) {
        setReplyData({ postId, replyId });
      } else {
        setReplyData(null);
      }
    }
  }, [fetching, addComment, commentInputRef?.current]);

  const onLikeDisLikePress = () => {
    const liked = !isLiked;
    const newLikes = liked ? likes + 1 : likes - 1;
    dispatch(updatePostLikes({
      liked,
      postId: id,
      currentUser,
      likes: newLikes < 1 ? 0 : newLikes,
    }));
    setIsLiked(liked);
  };

  const onCommentAdded = () => {
    if (!comment) {
      Alert.alert("Empty Comment", "Please add some comment...");
      return false;
    }
    Keyboard.dismiss();
    const commentData = {
      id: Math.floor(Math.random() * 100000),
      user: currentUser,
      message: comment,
      created_at: moment().format("MMM DD YYYY HH:mm:ss"),
      replies: [],
      likes: 0,
      liked_by: [],
    };
    if (replyData !== null) {
      dispatch(addPostSubComment({...replyData, commentData}));
      setReplyData(null);
    } else {
      dispatch(addPostComment({ postId: id, commentData }));
    }
    setComment("");
  };

  const renderReplay = (item, ind) => {
    const isLastComment = (ind === (replies.length - 1));
    return (
      <ReplayComponent
        postId={id}
        data={item}
        index={ind}
        key={item.id}
        showSubReplies={true}
        isLastComment={isLastComment}
        onReplyPress={(r) => {
          commentInputRef?.current.focus();
          setReplyData(r);
        }}
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
                {
                  post_category ? (
                    <Fragment>
                      <FontAwesome size={18} style={{ marginHorizontal: 8 }} name={"caret-right"} color="#000" />
                      <Text style={styles.userFullName}>{post_category}</Text>
                    </Fragment>
                  ) : null
                }
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
                <Text style={styles.postactionBtnTxt}>{totalReplies}</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                commentInputRef?.current.focus();
                setReplyData(null);
              }}
              style={[styles.postactionBtn, { marginRight: 0 }]}
            >
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
              totalReplies > 0 ? (
                replies.map(renderReplay)
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
