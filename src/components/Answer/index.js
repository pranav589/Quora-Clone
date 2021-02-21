import React, { useState } from "react";
import "../QuestionDetail/styles.css";
import { Avatar } from "@material-ui/core";
import PostFooter from "../PostFooter/index";

function Answer({ answer, queId, id }) {
  const [ansId, setAnsId] = useState("");

  const getId = (id) => {
    setAnsId(id);
  };

  return (
    <div className="answerDetails__container" onClick={() => getId(id)}>
      <div className="questionDetail__user">
        <Avatar
          src={answer.user?.photoUrl}
          style={{ height: "30px", width: "30px" }}
        />
        <div
          className="questionDetail__time"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <p className="name">
            {answer.user?.displayName
              ? answer.user?.displayName
              : answer.user?.email}
          </p>
          <p style={{ marginLeft: "10px" }}>
            {new Date(answer.timestamp?.toDate()).toLocaleDateString()}
          </p>
        </div>
      </div>
      <form
        className="answer"
        id="answer"
        dangerouslySetInnerHTML={{ __html: answer.answer }}
      ></form>
      <div className="answerDetail__imageContainer">
        {answer.imageUrl && <img src={answer?.imageUrl} alt="" />}
      </div>
      <PostFooter queId={queId} ansId={ansId} />
    </div>
  );
}

export default Answer;
