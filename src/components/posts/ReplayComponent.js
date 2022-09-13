import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MessageComponent from "./MessageComponent";
import OptionComponent from "../OptionComponent";

import { updatePostReplyLikes } from "../../redux/actions/postActions";
import styles from "./PostComponentStyles";

const ReplayComponent = (props) => {
  const { postId, data = [], isLastComment = true } = props;
  const { id, message = "", user = {}, likes = 0 } = data;
  const { avatar, full_name } = user;

  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);

  const onLikeDisLikePress = () => {
    const liked = !isLiked;
    const newLikes = liked ? likes + 1 : likes - 1;
    dispatch(updatePostReplyLikes({
      postId,
      replyId: id,
      likes: newLikes < 1 ? 0 : newLikes,
    }));
    setIsLiked(liked);
  };

  return (
    <Fragment key={id}>
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
            <Pressable style={[styles.postactionBtn, { marginRight: 0 }]} onPress={onLikeDisLikePress.bind(this, )}>
              <FontAwesome
                size={18}
                color={isLiked ? "#f00" : "#000"}
                name={isLiked ? "heart" : "heart-o"}
              />
              <Text style={[styles.postactionBtnTxt, isLiked && { color: "#f00" }]}>{likes}</Text>
            </Pressable>
            <Pressable style={[styles.postactionBtn, { marginRight: 0 }]}>
              <FontAwesome
                size={15}
                name={"reply"}
                color={"#D4AF37"}
              />
              <Text style={[styles.postactionBtnTxt, { fontSize: 12, color: "#D4AF37" }]}>Reply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Fragment>
  );
};

export default ReplayComponent;
