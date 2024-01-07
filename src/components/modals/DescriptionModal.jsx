import { createPortal } from "react-dom";

const DescriptionModal = ({ movieReqDescDetails: { name, description }, descriptionModalTextNode, closeDescriptionModal }) => {

  return createPortal(
    <div className="the-description-modal" onClick={event => closeDescriptionModal(event)}>
      <div ref={descriptionModalTextNode} className="content">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>,
    document.getElementById("description-modal")
  );
}

export default DescriptionModal;