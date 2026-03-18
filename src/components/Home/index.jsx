import {useCallback, useContext, useEffect, useState} from 'react'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'

import Header from '../Header'
import SideBar from '../SideBar'
import FailureView from '../Common/FailureView'
import Loader from '../Common/Loader'
import VideoItem from './videoItem'

import {
  Container,
  Banner,
  RetryButton,
} from '../StyledComponents'

import ThemeContext from '../../context'

import './index.css'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

const Home = () => {
  const [videosList, setVideosList] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const [status, setStatus] = useState(statusConstants.loading)
  const [showBanner, setShowBanner] = useState(true)

  const {isDark} = useContext(ThemeContext)

  const handleSuccess = formattedVideosData => {
    if (formattedVideosData.length === 0) {
      setStatus(statusConstants.empty)
    } else {
      setVideosList(formattedVideosData)
      setStatus(statusConstants.success)
    }
  }

  const makeApiCall = useCallback(async (query = '') => {
    setStatus(statusConstants.loading)

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${query}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const videosData = data.videos
      const formattedVideosData = videosData.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: each.channel,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      handleSuccess(formattedVideosData)
    } else {
      setStatus(statusConstants.failure)
    }
  }, [])

  useEffect(() => {
    const loadVideos = async () => {
      await makeApiCall('')
    }

    loadVideos()
  }, [makeApiCall])

  const onSearch = event => {
    const value = event.target.value
    setSearchedText(value)
    if (value.length === 0) {
      makeApiCall(value)
    }
  }

  const onClickSearch = () => {
    setStatus(statusConstants.loading)
    makeApiCall(searchedText)
  }

  const closeBanner = () => {
    setShowBanner(false)
  }

  const renderSuccess = () => (
    <ul className="home-videos-list">
      {videosList.map(each => (
        <VideoItem key={each.id} videoDetails={each} />
      ))}
    </ul>
  )

  const renderEmpty = () => (
    <div className="empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <RetryButton type="button" onClick={makeApiCall}>
        Retry
      </RetryButton>
    </div>
  )

  const renderVideos = () => {
    switch (status) {
      case statusConstants.loading:
        return <Loader />
      case statusConstants.empty:
        return renderEmpty()
      case statusConstants.success:
        return renderSuccess()
      case statusConstants.failure:
        return <FailureView isDark={isDark} onRetry={() => makeApiCall(searchedText)} />
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      <div className="home-bottom">
        <SideBar />
        <Container isDark={isDark} data-testid="home" className="home-page">
          {showBanner && (
            <Banner data-testid="banner" className="home-banner">
              <div className="home-banner-content">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                  className="home-banner-logo"
                />
                <p className="home-banner-text">
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <button type="button" className="home-banner-btn">
                  GET IT NOW
                </button>
              </div>
              <button
                type="button"
                onClick={closeBanner}
                data-testid="close"
                className="banner-close-btn"
              >
                <AiOutlineClose />
              </button>
            </Banner>
          )}

          <div
            className={`home-content ${isDark ? 'home-content-dark' : 'home-content-light'}`}
          >
            <div className="search-container">
              <input
                type="search"
                value={searchedText}
                onChange={onSearch}
                className="search-input"
                placeholder="Search"
              />
              <button
                type="button"
                onClick={onClickSearch}
                data-testid="searchButton"
                className="search-btn"
              >
                <FaSearch />
              </button>
            </div>
            <div className="home-results-wrapper">
              <div>{renderVideos()}</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Home
