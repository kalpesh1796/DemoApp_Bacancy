import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  dataContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  postDataContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerStyle: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  profileView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileRightView: {
    maxWidth: "75%",
    paddingLeft: 10,
  },
  profileNameView: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  userAvatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
  userFullName: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  dateTimeTxt: {
    fontSize: 11,
    color: "gray",
    marginTop: 2,
  },
  seprator: {
    marginVertical: 10,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  postActionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postActionLeftBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  postactionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 25,
  },
  postactionBtnTxt: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10
  },
  commentKeyboardAvoidingViewStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderTopColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#FFF",
  },
  commentInputStyle: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    maxHeight: 100,
    paddingRight: 10,
  },
});
