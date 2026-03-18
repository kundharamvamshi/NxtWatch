import {useCallback, useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import {SiYoutubegaming} from 'react-icons/si'
import VideoListItem from './VideoListItem'
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

const Gaming = () => {
  const [videosData, setVideosData] = useState([])
  const [status, setStatus] = useState(statusConstants.loading)

  const {isDark} = useContext(ThemeContext)

  const makeApiCall = useCallback(async () => {
    setStatus(statusConstants.loading)

    const url = 'https://apis.ccbp.in/videos/gaming'
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
        viewCount: each.view_count,
      }))
      setVideosData(formattedVideosData)
      setStatus(statusConstants.success)
    } else {
      setStatus(statusConstants.failure)
    }
  }, [])

  useEffect(() => {
    const loadGamingVideos = async () => {
      await makeApiCall()
    }

    loadGamingVideos()
  }, [makeApiCall])

  const renderSuccess = () => (
    <ul className="gaming-videos-list">
      {videosData.map(each => (
        <VideoListItem videoDetails={each} key={each.id} />
      ))}
    </ul>
  )

  const renderGamingVideos = () => {
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
      <div className="gaming-bottom">
        <SideBar />
        <TrendingContainer
          isDark={isDark}
          data-testid="gaming"
          className={`gaming-page ${isDark ? 'gaming-page-dark' : 'gaming-page-light'}`}
        >
          <div className="gaming-container page-header-strip">
            <div
              className={`page-header-icon ${isDark ? 'page-header-icon-dark' : 'page-header-icon-light'}`}
            >
              <SiYoutubegaming />
            </div>
            <p className="page-header-title">Gaming</p>
          </div>
          <div className="gaming-results">{renderGamingVideos()}</div>
        </TrendingContainer>
      </div>
    </div>
  )
}

export default Gaming
