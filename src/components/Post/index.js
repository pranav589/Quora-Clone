import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./styles.css";
import { db } from "../../firebase";
import PostFooter from "../PostFooter";

function Post({ Id, question, imageUrl, users, timestamp }) {
  const [latestAnswer, setLastestAnswer] = useState(null);
  const [answerDetails, setAnswerDetails] = useState([]);

  useEffect(() => {
    let cleanup;
    if (Id) {
      cleanup = db
        .collection("questions")
        .doc(Id)
        .collection("answer")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) =>
          setAnswerDetails(
            snap.docs.map((doc) => ({
              id: doc.id,
              answer: doc.data(),
            }))
          )
        );
    }
    setLastestAnswer(answerDetails[0]?.answer);
  }, []);

  console.log(latestAnswer);

  return (
    <div className="post">
      <div className="post__info">
        <Avatar src={users.photoUrl} />
        <div className="post__user">
          <h5>{users.displayName ? users.displayName : users.email}</h5>
          <p>{new Date(timestamp?.toDate()).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="post__body">
        <Link to={`/${Id}`}>
          <div className="post__question">
            <p style={{ fontWeight: "500" }}>{question}</p>
          </div>
          <div className="post__answer">
            <form
              action=""
              dangerouslySetInnerHTML={{ __html: latestAnswer?.answer }}
            ></form>
            <img src={latestAnswer?.imageUrl} alt="" />
          </div>
        </Link>
      </div>
      {latestAnswer && <PostFooter />}
    </div>
  );
}

export default Post;
