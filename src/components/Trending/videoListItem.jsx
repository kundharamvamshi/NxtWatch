import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const VideoListItem = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} =
    videoDetails
  const formattedChannelDetails = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }

  return (
    <li className="trending-list-item">
      <Link to={`/videos/${id}`} className="trending-card-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-thumbnail"
        />
        <div className="trending-meta">
          <p className="trending-video-title">{title}</p>
          <p className="trending-channel-name">{formattedChannelDetails.name}</p>
          <div className="view-time trending-video-stats">
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

export default VideoListItem
