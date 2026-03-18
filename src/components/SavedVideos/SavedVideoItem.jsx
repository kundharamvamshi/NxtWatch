import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import './index.css'

const SavedVideosItem = props => {
  const {savedVideoItem} = props
  const {id, thumbnailUrl, title, channel, viewCount, publishedAt} =
    savedVideoItem
  const {name} = channel

  return (
    <li className="saved-video-list-item">
      <Link to={`/videos/${id}`} className="saved-video-link">
        <img src={thumbnailUrl} alt="video thumbnail" className="saved-image" />
        <div className="saved-video-meta">
          <p className="saved-video-title">{title}</p>
          <p className="saved-video-channel">{name}</p>
          <div className="view-time saved-video-stats">
            <p>{viewCount} views</p>
            <p>
              . {formatDistanceToNow(new Date(publishedAt), {addSuffix: true})}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SavedVideosItem
