import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const VideoItem = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} =
    videoDetails
  const formattedChannelDetails = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }

  return (
    <li className="home-video-card">
      <Link to={`/videos/${id}`} className="home-video-link">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="video-item-bottom">
          <img
            src={formattedChannelDetails.profileImageUrl}
            alt="channel logo"
            className="channel-image"
          />
          <div className="home-video-meta">
            <p className="home-video-title">{title}</p>
            <p className="home-video-channel">{formattedChannelDetails.name}</p>
            <div className="view-time home-video-stats">
              <p>{viewCount} views</p>
              <p>
                .{' '}
                {formatDistanceToNow(new Date(publishedAt), {addSuffix: true})}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoItem
