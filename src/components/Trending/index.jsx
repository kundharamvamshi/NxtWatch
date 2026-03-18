import {useCallback, useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import {FaFire} from 'react-icons/fa'
import VideoListItem from './videoListItem'
import FailureView from '../Common/FailureView'
import Loader from '../Common/Loader'

import Header from '../Header'
import SideBar from '../SideBar'

import {TrendingContainer} from '../StyledComponents'

import ThemeContext from '../../context'

import './index.css'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Trending = () => {
  const [videosData, setVideosData] = useState([])
  const [status, setStatus] = useState(statusConstants.loading)

  const {isDark} = useContext(ThemeContext)

  const makeApiCall = useCallback(async () => {
    setStatus(statusConstants.loading)

    const url = 'https://apis.ccbp.in/videos/trending'
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
      const videos = data.videos
      const formattedVideosData = videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: each.channel,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      setVideosData(formattedVideosData)
      setStatus(statusConstants.success)
    } else {
      setStatus(statusConstants.failure)
    }
  }, [])

  useEffect(() => {
    const loadTrendingVideos = async () => {
      await makeApiCall()
    }

    loadTrendingVideos()
  }, [makeApiCall])

  const renderSuccess = () => (
    <ul className="trending-videos-list">
      {videosData.map(each => (
        <VideoListItem videoDetails={each} key={each.id} />
      ))}
    </ul>
  )

  const renderTrendingVideos = () => {
    switch (status) {
      case statusConstants.loading:
        return <Loader />
      case statusConstants.success:
        return renderSuccess()
      case statusConstants.failure:
        return <FailureView isDark={isDark} onRetry={makeApiCall} />
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      <div className="trending-bottom">
        <SideBar />
        <TrendingContainer
          isDark={isDark}
          data-testid="trending"
          className={`trending-page ${isDark ? 'trending-page-dark' : 'trending-page-light'}`}
        >
          <div className="trending-container page-header-strip">
            <div
              className={`page-header-icon ${isDark ? 'page-header-icon-dark' : 'page-header-icon-light'}`}
            >
              <FaFire />
            </div>
            <p className="page-header-title">Trending</p>
          </div>
          <div className="trending-results">{renderTrendingVideos()}</div>
        </TrendingContainer>
      </div>
    </div>
  )
}

export default Trending
