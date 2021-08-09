import { Label, Input, Button } from "reactstrap";
import { useVideosContext } from "../context/VideosContext";
import Video from "../types/video";
import formatDate from "../utils/formatDate";

interface Props {
  video: Video;
  isModal?: boolean;
  toggleModal: () => void;
}

function VideoDetails({
  video: { id, title, views, likes, timestamp, favorite },
  isModal,
  toggleModal,
}: Props) {
  const { toggleFavorite, removeVideo } = useVideosContext();

  return (
    <>
      <h2>{title}</h2>
      <p>Views: {views ?? "Not available"}</p>
      <p>Likes: {likes}</p>
      <p>Added: {formatDate(timestamp)}</p>
      <Label>
        <Input
          type="checkbox"
          checked={favorite}
          onChange={() => toggleFavorite(id)}
          className="mb-4 me-1"
        />
        Favorite
      </Label>
      <div>
        <Button onClick={() => removeVideo(id)} color="danger" className="me-2">
          Delete
        </Button>
        <Button onClick={toggleModal} color="primary">
          {isModal ? "Close" : "Watch"}
        </Button>
      </div>
    </>
  );
}

export default VideoDetails;
