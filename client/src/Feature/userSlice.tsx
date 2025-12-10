import { createSlice } from "@reduxjs/toolkit";

interface userSliceInfo {
  groupId: string;
  chatUserId: string;
  totalUsers: number;
  activeRoom: boolean;
  privateChat: boolean;
  searchFilter: string;
  createGroup: boolean;
  chatUserName: string;
  chatUserImage: string;
  isGroupActive: boolean;
  chatUserStatus: string;
  activeUserPage: boolean;
  isActiveUserPageOpen: boolean;
}

const initialState: userSliceInfo = {
  totalUsers: 0,
  groupId: "",
  chatUserId: "",
  searchFilter: "",
  chatUserName: "",
  activeRoom: false,
  chatUserImage: "",
  chatUserStatus: "",
  privateChat: true,
  createGroup: false,
  isGroupActive: false,
  activeUserPage: false,
  isActiveUserPageOpen: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    showActiveUserPage: (state) => {
      state.activeUserPage = !state.activeUserPage;
    },
    showActiveRoom: (state) => {
      state.activeRoom = !state.activeRoom;
      state.activeUserPage = false;
    },
    setSelectedUserDetails: (state, action) => {
      state.chatUserId = action.payload.id;
      state.chatUserName = action.payload.name;
      state.chatUserImage = action.payload.image;
      state.chatUserStatus = action.payload.status;
    },
    setSelectedGroupDetails: (state, action) => {
      state.chatUserId = action.payload.id;
      state.groupId = action.payload.groupId;
      state.chatUserName = action.payload.name;
      state.chatUserImage = action.payload.image;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
    setCreateGroup: (state) => {
      state.createGroup = !state.createGroup;
    },
    setOpenGroup: (state, action) => {
      state.isGroupActive = action.payload.group;
      state.privateChat = action.payload.private;
    },

    setIsActiveUserPage: (state, action) => {
      state.isActiveUserPageOpen = action.payload;
    },
  },
});

export const {
  setOpenGroup,
  setTotalUsers,
  showActiveRoom,
  setCreateGroup,
  setSearchFilter,
  showActiveUserPage,
  setIsActiveUserPage,
  setSelectedUserDetails,
  setSelectedGroupDetails,
} = userSlice.actions;

export default userSlice.reducer;
