// Note.js
import React, { useState } from "react";
import EditNoteModal from "./EditNoteModal";

const Note = ({ id, date, text, handleDeleteNote, handleEditNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveNote = (editedText) => {
    handleEditNote(id, editedText);
    handleCloseModal();
  };

  return (
    <div className="note">
      <p className="note-text">{text}</p>
      <div className="note-footer">
        <small className="note-date">{date}</small>
        <div className="note-buttons">
          <button className="button" onClick={handleEdit}>
            Edit
          </button>{" "}
          <button className="button" onClick={() => handleDeleteNote(id)}>
            Delete
          </button>
        </div>
      </div>
      <EditNoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialText={text}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default Note;
