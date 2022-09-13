import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  cardStyle: {
    padding: 15,
    marginBottom: 15,
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
  postContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 15,
    marginBottom: 15,
  },
  lastPostContainer: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0
  },
  postDataContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  postDataHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginTop: 5,
  },
  userFullName: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
  },
  dateTimeTxt: {
    fontSize: 13,
    color: "gray",
    marginTop: 5,
  },
  postActionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  postActionLeftBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  replyActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});