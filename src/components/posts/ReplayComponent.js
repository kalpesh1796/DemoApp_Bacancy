import React, { Fragment, useState, memo, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MessageComponent from "./MessageComponent";
import OptionComponent from "../OptionComponent";

import {
  updatePostReplyLikes,
  updatePostsSubReplyLikes,
} from "../../redux/actions/postActions";
import styles from "./PostComponentStyles";

const ReplayComponent = (props) => {
  const {
    postId,
    replyOf,
    data = [],
    onReplyPress,
    isSubReply = false,
    isLastComment = true,
    showSubReplies = false,
  } = props;
  const { id, message = "", user = {}, likes = 0, liked_by = [], replies = [] } = data;
  const { avatar, full_name } = user;
  const { user: currentUser = {} } = useSelector(state => state?.userReducer ?? {});
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(liked_by.length > 0 && liked_by.some(lb => lb?.id === currentUser?.id));

  useEffect(() => {
    setIsLiked(liked_by.length > 0 && liked_by.some(lb => lb?.id === currentUser?.id));
  }, [liked_by]);

  const onLikeDisLikePress = () => {
    const liked = !isLiked;
    const newLikes = liked ? likes + 1 : likes - 1;
    if (isSubReply) {
      dispatch(updatePostsSubReplyLikes({
        liked,
        postId,
        currentUser,
        subReplyId: id,
        replyId: replyOf,
        likes: newLikes < 1 ? 0 : newLikes,
      }));
    } else {
      dispatch(updatePostReplyLikes({
        liked,
        postId,
        currentUser,
        replyId: id,
        likes: newLikes < 1 ? 0 : newLikes,
      }));
    }
    setIsLiked(liked);
  };

  const handleReplyPress = () => {
    if (onReplyPress) {
      onReplyPress({ postId, replyId: isSubReply ? replyOf : id });
    }
  };

  return (
    <Fragment>
      <View style={[styles.postContainer, { marginTop: 15 }, isLastComment && styles.lastPostContainer]}>
        <Image source={{ uri: avatar }} resizeMode={"stretch"} style={styles.userAvatar} />
        <View style={styles.postDataContainer}>
          <View style={styles.postDataHeader}>
            <View style={{ flex: 1, marginBottom: 10 }}>
              <Text style={styles.userFullName}>{full_name}</Text>
            </View>
            <OptionComponent>
              <MaterialIcons name="more-horiz" color={"#000"} size={18} />
            </OptionComponent>
          </View>
          <MessageComponent message={message} />
          <View style={styles.replyActionContainer}>
            <Text>{12}m</Text>
            <Pressable style={[styles.postactionBtn, { marginRight: 0 }]} onPress={onLikeDisLikePress.bind(this,)}>
              <FontAwesome
                size={18}
                color={isLiked ? "#f00" : "#000"}
                name={isLiked ? "heart" : "heart-o"}
              />
              <Text style={[styles.postactionBtnTxt, isLiked && { color: "#f00" }]}>{likes}</Text>
            </Pressable>
            <Pressable onPress={handleReplyPress} style={[styles.postactionBtn, { marginRight: 0 }]}>
              <FontAwesome
                size={15}
                name={"reply"}
                color={"#D4AF37"}
              />
              <Text style={[styles.postactionBtnTxt, { fontSize: 12, color: "#D4AF37" }]}>Reply</Text>
            </Pressable>
          </View>
          {
            showSubReplies ? replies.map((item, ind) => {
              return (
                <ReplayComponent
                  data={item}
                  index={ind}
                  replyOf={id}
                  key={item.id}
                  postId={postId}
                  isSubReply={true}
                  onReplyPress={onReplyPress}
                  isLastComment={(ind === (replies.length - 1))}
                />
              );
            }) : null
          }
        </View>
      </View>
    </Fragment>
  );
};

export default memo(ReplayComponent);
