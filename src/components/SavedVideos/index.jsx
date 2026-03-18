import {useContext} from 'react'

import {MdPlaylistAdd} from 'react-icons/md'

import ThemeContext from '../../context'

import SavedVideosItem from './SavedVideoItem'

import Header from '../Header'
import SideBar from '../SideBar'

import {
  TrendingContainer,
  SavedVideosList,
} from '../StyledComponents'

import './index.css'

const SavedVideos = () => {
  const {savedVideos, isDark} = useContext(ThemeContext)

  return (
    <div data-testid="savedVideos">
      <Header />
      <div className="saved-bottom">
        <SideBar />
        {savedVideos.length === 0 ? (
          <TrendingContainer
            isDark={isDark}
            className={`saved-page ${isDark ? 'saved-page-dark' : 'saved-page-light'}`}
          >
            <div className="saved-empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
                className="saved-empty-image"
              />
              <h1 className="saved-empty-title">No Saved Videos Found</h1>
              <p className="saved-empty-description">
                You can save your videos while watching them.
              </p>
            </div>
          </TrendingContainer>
        ) : (
          <TrendingContainer
            isDark={isDark}
            className={`saved-page ${isDark ? 'saved-page-dark' : 'saved-page-light'}`}
          >
            <div className="saved-container page-header-strip">
              <div
                className={`page-header-icon ${isDark ? 'page-header-icon-dark' : 'page-header-icon-light'}`}
              >
                <MdPlaylistAdd />
              </div>
              <h1 className="page-header-title">Saved Videos</h1>
            </div>
            <SavedVideosList className="saved-videos-list">
              {savedVideos.map(each => (
                <SavedVideosItem key={each.id} savedVideoItem={each} />
              ))}
            </SavedVideosList>
          </TrendingContainer>
        )}
      </div>
    </div>
  )
}

export default SavedVideos
