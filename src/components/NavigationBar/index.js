import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedIn";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import LinkIcon from "@material-ui/icons/Link";
import "./styles.css";
import { Avatar, Button, Input } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth, db } from "../../firebase";
// import Modal from "react-modal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import firebase from "firebase";
import { useHistory } from "react-router";

// Modal.setAppElement('#root')

function NavigationBar() {
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [open, setOpen] = useState(false);

  const user = useSelector(selectUser);

  const questionHandler = (e) => {
    e.preventDefault();
    if (input !== "" && inputUrl !== "") {
      db.collection("questions").add({
        question: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user,
        imageUrl: inputUrl,
      });
    } else {
      db.collection("questions").add({
        question: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user && user,
      });
    }

    setOpen(false);
    setInput("");
    setInputUrl("");
  };

  const history = useHistory("");

  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={() => history.push("/")}>
        <img src={logo} alt="Quora Logo" />
      </div>
      <div className="navbar__icons">
        <div className="navbar__icon">
          <HomeIcon />
        </div>
        <div className="navbar__icon">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="navbar__icon">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div className="navbar__icon">
          <PeopleAltOutlinedIcon />
        </div>
        <div className="navbar__icon">
          <NotificationsNoneOutlinedIcon />
        </div>
      </div>
      <div className="navbar__search">
        <SearchIcon />
        <input type="text" placeholder="Search Quora" />
      </div>
      <div className="navbar__others">
        <div className="navbar__avatar">
          <Avatar
            style={{ width: "28px", height: "28px" }}
            src={user ? user.photoUrl : ""}
            onClick={() => auth.signOut()}
          />
        </div>
        <LanguageIcon />
        <Button onClick={() => setOpen(true)}>Add Question</Button>
      </div>

      <div className="navbar__othersMob"></div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        styles={{
          modal: {
            padding: "30px",
          },
        }}
        showCloseIcon={false}
      >
        <div className="modal__title">
          <h5 className="modal__question">Add Question</h5>
          <h5>Share Link</h5>
        </div>
        <div className="modal__info">
          <Avatar
            className="avatar"
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
            }
          />
          <p>{user?.displayName ? user?.displayName : user?.email} asked</p>
          <div className="modal__scope">
            <PeopleAltOutlinedIcon />
            <p>Public</p>
            <ExpandMore />
          </div>
        </div>
        <div className="modal__Field">
          <Input
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Start your question with 'What', 'How', 'Why', etc. "
          />
          <div className="modal__fieldLink">
            <LinkIcon />
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              type="text"
              placeholder="Optional: include a link that gives context"
            ></input>
          </div>
        </div>
        <div className="modal__buttons">
          <button className="cancle" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button type="sumbit" className="add" onClick={questionHandler}>
            Add Question
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NavigationBar;
