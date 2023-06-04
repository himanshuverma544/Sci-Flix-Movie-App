import { createSlice } from "@reduxjs/toolkit";


const moviesComments = localStorage.getItem("moviesComments");

const moviesCommentsSlice = createSlice({
  name: "moviesComments",
  initialState: moviesComments ? JSON.parse(moviesComments) : {},
  reducers: {

    addComment(state, action) {

      const { movieName, userCommentReqDetails } = action.payload;

      if (!state[movieName]) {
        state[movieName] = [];
      }

      state[movieName].push(userCommentReqDetails);
    },
    
    editComment(state, action) {

      const { movieName, userCommentReqDetails: { commentId, userComment: userEditedComment }} = action.payload;
      
      const reqCommentObj = state[movieName].find(
        userCommentReqDetails => userCommentReqDetails.commentId === commentId
      );
      
      reqCommentObj.userComment = userEditedComment;
    }
  }
});

export const { addComment, editComment } = moviesCommentsSlice.actions;
export default moviesCommentsSlice.reducer;