import React, { useState, useRef } from "react";

const EditNoteModal = ({ isOpen, onClose, initialText, onSave }) => {
  const [editedText, setEditedText] = useState(initialText);
  const textAreaRef = useRef(null);

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = () => {
    onSave(editedText);
    onClose();
  };

  const insertBullet = () => {
    const startPos = textAreaRef.current.selectionStart;
    const endPos = textAreaRef.current.selectionEnd;
    const newText =
      editedText.substring(0, startPos) + "\n- " + editedText.substring(endPos);
    setEditedText(newText);
    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(startPos + 3, startPos + 3);
  };

  const maxWordLimit = 100;
  const remainingWords =
    maxWordLimit - editedText.split(/\s+/).filter((word) => word !== "").length;

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <textarea
          ref={textAreaRef}
          className="note-textarea"
          value={editedText}
          onChange={handleChange}
        ></textarea>
        <div className="word-count">{remainingWords} words remaining</div>
        <div className="modal-buttons">
          <button className="button" onClick={insertBullet}>
            Bullet Point
          </button>{" "}
          <button className="button" onClick={handleSave}>
            Save
          </button>{" "}
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
