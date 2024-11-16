import React from 'react';

const WhatsAppWidget = () => {
  const phoneNumber = '03014701330'; // Replace with your phone number
  const message = 'Hello, I would like to get in touch!'; // Replace with your message
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.widget}
    >
      <img
        src="https://image-url-for-whatsapp-icon.com/icon.png" // Replace with a valid WhatsApp icon URL
        alt="WhatsApp"
        style={styles.icon}
      />
    </a>
  );
};

const styles = {
  widget: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#25D366',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    zIndex: '1000',
  },
  icon: {
    width: '50px', // Size of the icon
    height: '50px',
  },
};

export default WhatsAppWidget;
