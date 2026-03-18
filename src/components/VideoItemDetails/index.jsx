import {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'

import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike} from 'react-icons/bi'

import {MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'
import FailureView from '../Common/FailureView'
import Loader from '../Common/Loader'

import {
  TrendingContainer,
  VideoItemContainer,
  LikeDislikeBtn,
} from '../StyledComponents'

import Header from '../Header'
import SideBar from '../SideBar'

import ThemeContext from '../../context'

import './index.css'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const VideoItemDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null)
  const [status, setStatus] = useState(statusConstants.loading)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const {id} = useParams()
  const {savedVideos, addVideo, removeVideo, isDark} = useContext(ThemeContext)

  const makeApiCall = useCallback(async () => {
    setStatus(statusConstants.loading)

    const url = `https://apis.ccbp.in/videos/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const videoDetailsData = data.video_details
      const formattedVideoDetails = {
        id: videoDetailsData.id,
        title: videoDetailsData.title,
        videoUrl: videoDetailsData.video_url,
        thumbnailUrl: videoDetailsData.thumbnail_url,
        channel: videoDetailsData.channel,
        viewCount: videoDetailsData.view_count,
        publishedAt: videoDetailsData.published_at,
        description: videoDetailsData.description,
      }
      setVideoDetails(formattedVideoDetails)
      setStatus(statusConstants.success)
    } else {
      setStatus(statusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    const loadVideoDetails = async () => {
      await makeApiCall()
    }

    loadVideoDetails()
  }, [makeApiCall])

  const onDislike = () => {
    setIsDisliked(prev => !prev)
    setIsLiked(false)
  }

  const onLike = () => {
    setIsLiked(prev => !prev)
    setIsDisliked(false)
  }

  const renderFailure = () => (
    <TrendingContainer isDark={isDark} data-testid="videoItemDetails">
      <FailureView isDark={isDark} onRetry={makeApiCall} />
    </TrendingContainer>
  )

  const renderSuccess = () => {
    if (!videoDetails) return null
    const {
      id: videoId,
      title,
      videoUrl,
      thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails

    const formattedChannelDetails = {
      name: channel.name,
      profileImageUrl: channel.profile_image_url,
      subscriberCount: channel.subscriber_count,
    }

    const isSaved = savedVideos.some(video => video.id === videoId)

    const onSave = () => {
      if (isSaved) {
        removeVideo(videoId)
      } else {
        addVideo(videoDetails)
      }
    }

    return (
      <TrendingContainer
        isDark={isDark}
        data-testid="videoItemDetails"
        className={`video-details-page ${isDark ? 'video-details-dark' : 'video-details-light'}`}
      >
        <div className="video-player-wrapper">
          <ReactPlayer
            src={videoUrl}
            light={thumbnailUrl}
            controls
            width="100%"
            height="100%"
          />
        </div>
        <p className="video-details-title">{title}</p>
        <div className="like-view">
          <div className="view-time video-details-stats">
            <p>{viewCount} views</p>
            <p>
              .{' '}
              {formatDistanceToNow(new Date(publishedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="like-dislike-container">
            <LikeDislikeBtn type="button" onClick={onLike} isClicked={isLiked}>
              <BiLike />
              Like
            </LikeDislikeBtn>
            <LikeDislikeBtn
              type="button"
              onClick={onDislike}
              isClicked={isDisliked}
            >
              <BiDislike />
              Dislike
            </LikeDislikeBtn>
            <button
              type="button"
              onClick={onSave}
              className={isSaved ? 'saved-btn' : 'not-saved'}
            >
              {isSaved ? <MdPlaylistAddCheck /> : <MdPlaylistAdd />}
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
        <hr className="video-details-separator" />
        <div className="video-channel-section">
          <img
            src={formattedChannelDetails.profileImageUrl}
            alt="channel logo"
            className="video-channel-logo"
          />
          <div className="video-channel-meta">
            <p className="video-channel-name">{formattedChannelDetails.name}</p>
            <p className="video-channel-subscribers">
              {formattedChannelDetails.subscriberCount} subscribers
            </p>
            <p className="video-channel-description">{description}</p>
          </div>
        </div>
      </TrendingContainer>
    )
  }

  const renderVideo = () => {
    switch (status) {
      case statusConstants.loading:
        return <Loader />
      case statusConstants.success:
        return renderSuccess()
      case statusConstants.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <VideoItemContainer isDark={isDark}>
      <Header />
      <div className="sidebar-bottom">
        <SideBar />
        {renderVideo()}
      </div>
    </VideoItemContainer>
  )
}

export default VideoItemDetails
