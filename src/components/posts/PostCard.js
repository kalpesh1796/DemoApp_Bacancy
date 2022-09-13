import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MessageComponent from "./MessageComponent";
import ReplayComponent from "./ReplayComponent";

import { updatePostLikes } from "../../redux/actions/postActions";
import { navigateTo } from "../../context/NavigationContext";
import { dateFormat } from "../../utils/helperFunctions";
import styles from "./PostComponentStyles";

const PostCard = (props) => {
  const numberOfReplies = 1;
  const { data = {} } = props;
  const { id, message = "", user = {}, created_at = "", likes = 0, replies = [] } = data;
  const { avatar, full_name } = user;

  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

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

  const totalComments = replies?.length ?? 0;
  const comments = [...replies].splice(0, numberOfReplies);

  const goToDetails = () => {
    navigateTo("PostDetails", { postId: id });
  };

  const renderReplay = (item, ind) => {
    const isLastComment = ind === (comments.length - 1);
    return (
      <ReplayComponent postId={id} key={item.id} data={item} index={ind} isLastComment={isLastComment} />
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
            <Menu onSelect={(v) => alert(`You selected ${v} option`)}>
              <MenuTrigger>
                <MaterialIcons name="more-horiz" color={"#000"} size={18} />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption text="Edit" value={"edit"} />
                <MenuOption text="Delete" value={"delete"} />
              </MenuOptions>
            </Menu>
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
        <Pressable style={[styles.postactionBtn, { marginRight: 0 }]}>
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

export default PostCard;
