import { createPortal } from "react-dom";

import { CloseButton } from "reactstrap";


const ImageModal = ({ movieImage, imageModalImageNode, closeImageModal }) => {

  return createPortal(
    <div className="the-image-modal overlay" onClick={event => closeImageModal(event)}>
      <CloseButton 
        className="close-modal-btn"
        variant="white"
        onClick={event => closeImageModal(event)}
      />
      <img ref={imageModalImageNode} src={movieImage.url} alt={movieImage.alt}/>
    </div>,
    document.getElementById("image-modal")
  );
}

export default ImageModal;