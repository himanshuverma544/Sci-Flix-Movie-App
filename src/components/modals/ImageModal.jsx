import { createPortal } from "react-dom";

const ImageModal = ({ movieImage, imageModalImageNode, closeImageModal }) => {

  return createPortal(
    <div className="the-image-modal" onClick={event => closeImageModal(event)}>
      <img ref={imageModalImageNode} src={movieImage.url} alt={movieImage.alt}/>
    </div>,
    document.getElementById("image-modal")
  );
}

export default ImageModal;