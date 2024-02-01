import { createPortal } from "react-dom";

import { CloseButton } from "reactstrap";

import { useCloseModalByKey } from "../../utils/customHooks";


const ImageModal = ({ movieImage, imageModalImageNode, closeImageModal }) => {

  useCloseModalByKey(closeImageModal);

  return createPortal(
    <section>
      <div className="the-image-modal overlay" onClick={closeImageModal}>
        <CloseButton 
          className="close-modal-btn"
          variant="white"
          onClick={closeImageModal}
        />
        <img ref={imageModalImageNode} src={movieImage.url} alt={movieImage.alt}/>
      </div>
    </section>,
    document.getElementById("image-modal")
  );
}

export default ImageModal;