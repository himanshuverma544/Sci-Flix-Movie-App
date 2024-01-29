import { useEffect } from "react";

import { MODAL_CLOSE_KEY } from "./constants";


export const useCloseModalByKey = (closeModal) => {

  useEffect(() => {

    function closeModalByKey(event) {
      if (event.key === MODAL_CLOSE_KEY) {
        closeModal();
      }
    }
    document.addEventListener("keyup", closeModalByKey);
        
    return () => {
      document.removeEventListener("keyup", closeModalByKey)
    }
  }, [closeModal]);
}
