import {Link} from 'react-router-dom'

import './index.css'

const VideoListItem = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <li className="gaming-card">
      <Link to={`/videos/${id}`} className="gaming-card-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="gaming-image"
        />
        <p className="gaming-video-title">{title}</p>
        <p className="gaming-watchers">{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default VideoListItem
