import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Rating from 'react-rating-stars-component';
import './RatingPopup.css';

Modal.setAppElement('#root');

const RatingPopup = ({ isOpen, onRequestClose, onSubmit }) => {

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  //============================================Handle Submit Func=================================================

  const handleSubmit = () => {
    onSubmit(rating, message)
  }

  //============================================Model Close Func===================================================

  const handleModel = () => {
    onRequestClose();
  }

  //===========================================Set Value Whenever Model Open==========================================
  
  useEffect(() => {
    setRating(0)
    setMessage('')
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Rating Popup"
      className="rating-popup"
      overlayClassName="rating-popup-overlay"
    >
      <h3 className='mainheading'>Rate and Review</h3>
      <h3 onClick={() => { handleModel() }} className='closeBtn'>X</h3>
      <div className='reviewSec'>
        <h5 className='reviewheading'>Review:</h5>
        <Rating
          count={5}
          size={30}
          value={rating}
          onChange={(newRating) => setRating(newRating)}
          activeColor="#ffd700"
        />
      </div>

      <textarea
        className="message-input"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here..."
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
};

export default RatingPopup;
