import { createPortal } from "react-dom";

import { CloseButton } from "reactstrap";

import { useCloseModalByKey } from "../../utils/customHooks";


const DescriptionModal = ({ movieReqDescDetails: { name, description }, descriptionModalTextNode, closeDescriptionModal }) => {

  useCloseModalByKey(closeDescriptionModal);
  
  return createPortal(
    <section>
      <div 
        className="the-description-modal overlay" 
        onClick={closeDescriptionModal}
      >
        <CloseButton 
          className="close-modal-btn"
          variant="white"
          onClick={closeDescriptionModal}
        />
        <div ref={descriptionModalTextNode} className="content">
          <h3>{name}</h3>
          <hr/>
          <p>{description}</p>
        </div>
      </div>
    </section>,
    document.getElementById("description-modal")
  );
}

export default DescriptionModal;