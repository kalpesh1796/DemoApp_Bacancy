import React, { useState, memo, useEffect } from "react";
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
import ReplayComponent from "./ReplayComponent";

import { updatePostLikes } from "../../redux/actions/postActions";
import { navigateTo } from "../../context/NavigationContext";
import { dateFormat } from "../../utils/helperFunctions";
import styles from "./PostComponentStyles";

const PostCard = (props) => {
  const numberOfReplies = 1;
  const { data = {} } = props;
  const { id, message = "", user = {}, created_at = "", likes = 0, liked_by = [], replies = [] } = data;
  const { avatar, full_name } = user;
  const { user: currentUser = {} } = useSelector(state => state?.userReducer ?? {});

  const [isLiked, setIsLiked] = useState(liked_by.length > 0 && liked_by.some(lb => lb?.id === currentUser?.id));
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLiked(liked_by.length > 0 && liked_by.some(lb => lb?.id === currentUser?.id));
  }, [liked_by]);

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

  const totalComments = replies?.length ?? 0;
  const comments = [...replies].splice(0, numberOfReplies);

  const goToDetails = () => {
    navigateTo("PostDetails", { postId: id });
  };

  const handleReply = (data = {}) => {
    navigateTo("PostDetails", { postId: id, addComment: true, ...data });
  };

  const renderReplay = (item, ind) => {
    const isLastComment = ind === (comments.length - 1);
    return (
      <ReplayComponent
        postId={id}
        data={item}
        index={ind}
        key={item.id}
        showSubReplies={false}
        onReplyPress={handleReply}
        isLastComment={isLastComment}
      />
    );
  };

  return (
    <View style={styles.cardStyle}>
      <View style={styles.postContainer}>
        <Image source={{ uri: avatar }} resizeMode={"stretch"} style={styles.userAvatar} />
        <View style={styles.postDataContainer}>
          <View style={styles.postDataHeader}>
            <View style={{ flex: 1, marginBottom: 10 }}>
              <Text style={styles.userFullName}>{full_name}</Text>
              <Text style={styles.dateTimeTxt}>{dateFormat(created_at)}</Text>
            </View>
            <OptionComponent>
              <MaterialIcons name="more-horiz" color={"#000"} size={18} />
            </OptionComponent>
          </View>
          <Pressable onPress={goToDetails}>
            <MessageComponent message={message} />
          </Pressable>
        </View>
      </View>
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
        <Pressable onPress={handleReply} style={[styles.postactionBtn, { marginRight: 0 }]}>
          <FontAwesome
            size={18}
            name={"reply"}
            color={"#D4AF37"}
          />
          <Text style={[styles.postactionBtnTxt, { color: "#D4AF37" }]}>Reply</Text>
        </Pressable>
      </View>
      {
        totalComments > 0 ? (
          comments.map(renderReplay)
        ) : null
      }
    </View>
  );
};

export default memo(PostCard);
