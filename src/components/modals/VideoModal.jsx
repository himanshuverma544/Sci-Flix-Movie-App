import { useEffect } from "react";
import { createPortal } from "react-dom";

import { CloseButton } from "reactstrap";

import { useCloseModalByKey } from "../../customHooks";


const VideoModal = ({ movieTrailerUrl, videoModalMovieTrailerNode, closeVideoModal }) => {
  
  useCloseModalByKey(closeVideoModal);

  const movieTrailerId = movieTrailerUrl.substring(17);
  

  return createPortal(
    <section>
      <div
        className="the-video-modal overlay"
        onClick={closeVideoModal}
      >
        <CloseButton 
          className="close-modal-btn"
          variant="white"
          onClick={closeVideoModal}
        />
        <div ref={videoModalMovieTrailerNode} className="movie-trailer">
          <iframe  
            title="YouTube Video Player" 
            src={`https://www.youtube.com/embed/${movieTrailerId}`} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </section>,
    document.getElementById("video-modal")
  );
}

export default VideoModal;