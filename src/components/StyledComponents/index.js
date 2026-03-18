import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
  color: ${props => (props.isDark ? '#f8fafc' : '#0f172a')};
  min-height: 100vh;
`

export const HeaderContainer = styled.div`
  background-color: ${props => (props.isDark ? '#231f20' : '#ffffff')};
  color: ${props => (props.isDark ? '#f8fafc' : '#181818')};
  padding: 12px 20px;
  border-bottom: 1px solid ${props => (props.isDark ? '#313131' : '#ebebeb')};
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`

export const SideBarContainer = styled.div`
  background-color: ${props => (props.isDark ? '#231f20' : '#ffffff')};
  color: ${props => (props.isDark ? '#f8fafc' : '#181818')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  height: calc(100vh - 61px);
  padding: 28px 16px 20px;
  position: sticky;
  top: 61px;
  align-self: flex-start;
  overflow-y: auto;

  @media (max-width: 767px) {
    display: none;
  }
`

export const TrendingContainer = styled.div`
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
  color: ${props => (props.isDark ? '#f8fafc' : '#181818')};
  flex: 1;
  position: static;
  min-height: calc(100vh - 61px);
`

export const Banner = styled.div`
  background-image: url(https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
  padding: 24px 28px;
`

export const LoginButton = styled.button`
  color: #ffffff;
  background-color: #1d8cf1;
  border: 0;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`
export const RetryButton = styled.button`
  color: #ffffff;
  border: 0;
  border-radius: 8px;
  background-color: #4f46e5;
  padding: 11px 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`
export const LikeDislikeBtn = styled.button`
  background-color: transparent;
  border: 0;
  color: ${props => (props.isClicked ? '#2563eb' : '#64748b')};
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`

export const SavedVideosList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`
export const VideoItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
