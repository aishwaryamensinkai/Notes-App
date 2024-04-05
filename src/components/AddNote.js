import React, { useState, useRef } from "react";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const textAreaRef = useRef(null);
  const maxWordLimit = 100;

  const handleChange = (event) => {
    const words = event.target.value.split(/\s+/).filter((word) => word !== "");
    if (words.length <= maxWordLimit) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    const words = noteText.split(/\s+/).filter((word) => word !== "");
    if (words.length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };

  const insertBullet = () => {
    const startPos = textAreaRef.current.selectionStart;
    const endPos = textAreaRef.current.selectionEnd;
    const newText =
      noteText.substring(0, startPos) + "\n- " + noteText.substring(endPos);
    setNoteText(newText);
    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(startPos + 3, startPos + 3);
  };

  const remainingWords =
    maxWordLimit - noteText.split(/\s+/).filter((word) => word !== "").length;

  return (
    <div className="note new">
      <div className="note-toolbar"></div>
      <textarea
        ref={textAreaRef}
        id="noteTextArea"
        cols="8"
        rows="10"
        placeholder="Type to add new text"
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{remainingWords} words remaining</small>
        <button className="button" onClick={insertBullet}>
          Bullet Point
        </button>
        <button className="button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
