import {useContext} from 'react'

import Header from '../Header'
import {Container} from '../StyledComponents'

import ThemeContext from '../../context'

import './index.css'

const NotFound = () => {
  const {isDark} = useContext(ThemeContext)

  return (
    <div className={`not-found-layout ${isDark ? 'not-found-layout-dark' : 'not-found-layout-light'}`}>
      <Header />
      <Container isDark={isDark} className="not-found-page">
        <img
          src={
            isDark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          }
          alt="not found"
          className="not-found-image"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found.</p>
      </Container>
    </div>
  )
}

export default NotFound
