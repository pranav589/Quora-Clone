import React, { useEffect, useState } from "react";
import "./styles.css";
import Post from "../Post/index";
import QuoraBox from "../QuoraBox/index";
import { db } from "../../firebase";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const cleanup = db
      .collection("questions")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            question: doc.data(),
          }))
        )
      );
    return () => cleanup();
  }, []);
  return (
    <div className="feed">
      <QuoraBox />
      {posts.map(({ id, question }) => (
        <Post
          key={id}
          Id={id}
          question={question.question}
          imageUrl={question.imageUrl}
          timestamp={question.timestamp}
          users={question.user}
          questionId={question.id}
        />
      ))}
    </div>
  );
}

export default Feed;
