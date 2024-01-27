import { createPortal } from "react-dom";

import { CloseButton } from "reactstrap";


const VideoModal = ({ movieTrailerUrl, videoModalMovieTrailerNode, closeVideoModal }) => {
  
  const movieTrailerId = movieTrailerUrl.substring(17);

  return createPortal(
    <div className="the-video-modal overlay" onClick={event => closeVideoModal(event)}>
      <CloseButton 
        className="close-modal-btn"
        variant="white"
        onClick={event => closeVideoModal(event)}
      />
      <div ref={videoModalMovieTrailerNode} className="movie-trailer">
        <iframe  
          title="YouTube Video Player" 
          src={`https://www.youtube.com/embed/${movieTrailerId}`} 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen>
        </iframe>
      </div>
    </div>,
    document.getElementById("video-modal")
  );
}

export default VideoModal;