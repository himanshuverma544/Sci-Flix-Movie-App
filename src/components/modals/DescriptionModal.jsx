import { createPortal } from "react-dom";

import { CloseButton } from "reactstrap";


const DescriptionModal = ({ movieReqDescDetails: { name, description }, descriptionModalTextNode, closeDescriptionModal }) => {

  return createPortal(
    <div 
      className="the-description-modal overlay" 
      onClick={event => closeDescriptionModal(event)}
    >
      <CloseButton 
        className="close-modal-btn"
        variant="white"
        onClick={event => closeDescriptionModal(event)}
      />
      <div ref={descriptionModalTextNode} className="content">
        <h3>{name}</h3>
        <hr/>
        <p>{description}</p>
      </div>
    </div>,
    document.getElementById("description-modal")
  );
}

export default DescriptionModal;