import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import NavigationBar from "../NavigationBar";
import CreateIcon from "@material-ui/icons/Create";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

import "./styles.css";
import { Avatar } from "@material-ui/core";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Editor } from "@tinymce/tinymce-react";
import firebase from "firebase";
import Answer from "../Answer";

const relatedQuestions = [
  {
    question:
      "What is the best playing XI for the 3rd test match against England, and according to you?",
    key: "1",
  },
  {
    question: "What is the best way to fry chicken?",
    key: "2",
  },
  {
    question: "Who is your favorite cricketer? Why?",
    key: "3",
  },
  {
    question: "What is the DIR command in DOS?",
    key: "4",
  },
  {
    question: "How many numbers between 1 and 70 are not divisible by 5?",
    key: "5",
  },
];

function QuestionDetail() {
  const { Id } = useParams();
  const [questionDetail, setQuestionDetail] = useState({});
  const user = useSelector(selectUser);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState("");

  const [progress, setProgress] = useState(0);
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [answerDetails, setAnswerDetails] = useState([]);

  useEffect(() => {
    let cleanup;
    if (Id) {
      cleanup = db
        .collection("questions")
        .doc(Id)
        .get()
        .then((snap) => setQuestionDetail(snap.data()));
    }
  }, [Id]);

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
  }, [Id]);

  const handleClose = () => {
    setOpen(false);
    setPreview("");
  };

  var richMessage = "";
  const handleEditorChange = (e) => {
    richMessage = e.target.getContent();
    console.log("Rich Message was updated:", richMessage);
  };

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImageAsFile((imageFile) => image);
  };

  const answerUploadHandler = (e) => {
    if (richMessage === "" && imageAsFile === "") {
      console.log("Prevented Access to Photo or Answer Submission");
    } else {
      e.preventDefault();
      if (imageAsFile === "") {
        db.collection("questions").doc(Id).collection("answer").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          answer: richMessage,
          imageUrl: "",
          upvote: false,
          downVote: false,
          noOfUpvotes: 0,
          noOfDownvotes: 0,
          user: user,
        });
        setOpen(false);
        setInput("");

        setProgress(0);
      } else {
        console.log("start of upload");
        const uploadTask = storage
          .ref(`/images/${imageAsFile.name}`)
          .put(imageAsFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (err) => {
            console.log(err);
          },
          () => {
            storage
              .ref("images")
              .child(imageAsFile.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("questions").doc(Id).collection("answer").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  answer: richMessage,
                  imageUrl: url,
                  upvote: false,
                  downVote: false,
                  noOfUpvotes: 0,
                  noOfDownvotes: 0,
                  user: user,
                });
              });
            setOpen(false);
            setInput("");

            setProgress(0);
          }
        );
      }
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="questionDetail">
          <h5>{questionDetail?.question}</h5>
          <div className="questionDetail__options">
            <div className="questionDetail__icon" onClick={() => setOpen(true)}>
              <CreateIcon />
              <p>Answer</p>
            </div>
            <div className="questionDetail__icon">
              <RssFeedIcon />
              <p>Follow</p>
            </div>
            <div className="questionDetail__icon">
              <PeopleOutlineIcon />
              <p>Request</p>
            </div>
          </div>
          <div className="questionDetail__numberOfAnswers">
            <div className="border1"></div>
            <p>
              {answerDetails.length}{" "}
              {answerDetails.length > 1 ? "Answers" : "Answer"}
            </p>
            <div className="border2"></div>
          </div>

          {answerDetails.map(({ id, answer }) => (
            <Answer id={id} answer={answer} key={id} queId={Id} />
          ))}
        </div>

        <div className="relatedQuestions">
          <div className="relatedQuestions__container">
            <h5>Related Questions</h5>
            {relatedQuestions.map((questionData) => (
              <p key={questionData.key}>{questionData.question}</p>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        showCloseIcon={false}
        styles={{
          modal: {
            width: "90%",
          },
        }}
      >
        <div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={
                user?.photoUrl
                  ? user?.photoUrl
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <div>
              <p style={{ cursor: "pointer" }}>
                {user?.displayName ? user?.displayName : user?.email}
              </p>
              <p style={{ color: "grey", cursor: "pointer" }}>
                Edit Credential
              </p>
            </div>
          </div>
          <div className="modal__Field">
            <div className="modal__editorContainer">
              <div className="file">
                <input
                  type="file"
                  name="Select"
                  id=""
                  onChange={handleImageAsFile}
                />
              </div>

              <div className="modal__editor">
                <Editor
                  apiKey="tsjggcqd1749ircqxch1gaaje751c4y3e1aieoahhn90bn7l"
                  name="message"
                  initialValue=""
                  init={{
                    height: 225,
                    plugins: "link image code",
                    toolbar:
                      "undo redo | bold italic | alignleft aligncenter alignright | code",
                  }}
                  onChange={handleEditorChange}
                  outputFormat={"text"}
                  onBlur={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
          <div className="modal__imagePreview">
            <img src={preview} alt="" />
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={handleClose}>
              Cancel
            </button>
            <button onClick={answerUploadHandler} type="submit" className="add">
              Submit Answer
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default QuestionDetail;
