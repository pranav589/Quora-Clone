import React, { useState, useEffect } from "react";
import "../Post/styles.css";
import { db } from "../../firebase";

import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

function PostFooter({ queId, ansId }) {
  const [upVote, setUpVote] = useState(0);
  const [noOfUpVote, setNoOfUpVote] = useState(0);
  const [downVote, setDownVote] = useState(false);
  const [noOfDownVote, setNoOfDownVote] = useState(0);

  const upVotesHandler = () => {
    if (downVote && noOfDownVote > 0) {
      setDownVote(false);
      setNoOfDownVote(noOfDownVote - 1);
    }
    const upVoteAdd = upVote && !downVote && upVote > 0 ? -1 : 1;
    setNoOfUpVote(noOfUpVote + upVoteAdd);
    setUpVote(!upVote);
  };

  const downVoteHandler = () => {
    if (upVote && noOfUpVote > 0) {
      setUpVote(false);
      setNoOfUpVote(noOfUpVote - 1);
    }
    const downVoteToAdd = downVote && !upVote && downVote > 0 ? -1 : 1;
    setNoOfDownVote(noOfDownVote + downVoteToAdd);
    setDownVote(!downVote);
  };

  return (
    <div className="post__footer">
      <div className="post__footerActions">
        <div className="post__footerAction" onClick={upVotesHandler}>
          <ArrowUpwardOutlinedIcon
            style={{ color: upVote ? "#5D8AFB" : "black" }}
          />
          <p>{noOfUpVote}</p>
        </div>
        <div className="post__footerAction" onClick={downVoteHandler}>
          <ArrowDownwardOutlinedIcon
            style={{ color: downVote ? "#eb4034" : "black" }}
          />
          <p>{noOfDownVote}</p>
        </div>

        <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon />
      </div>
      <div className="post__footerLeft">
        <ShareOutlinedIcon />
        <MoreHorizOutlinedIcon />
      </div>
    </div>
  );
}

export default PostFooter;
