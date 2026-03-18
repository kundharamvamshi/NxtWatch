import {MdHome, MdPlaylistAdd} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'

import {useContext} from 'react'
import {NavLink} from 'react-router-dom'

import {SideBarContainer} from '../StyledComponents'
import ThemeContext from '../../context'

import './index.css'

const navItems = [
  {to: '/', label: 'Home', icon: MdHome},
  {to: '/trending', label: 'Trending', icon: FaFire},
  {to: '/gaming', label: 'Gaming', icon: SiYoutubegaming},
  {to: '/saved-videos', label: 'Saved Videos', icon: MdPlaylistAdd},
]

const SideBar = () => {
  const {isDark} = useContext(ThemeContext)

  return (
    <SideBarContainer isDark={isDark}>
      <ul className="sidebar-nav-list">
        {navItems.map(item => {
          const NavigationIcon = item.icon

          return (
            <li key={item.to} className="sidebar-nav-item">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({isActive}) =>
                  isActive ? 'active-tab nav-link' : 'inactive-tab nav-link'
                }
              >
                {({isActive}) => (
                  <>
                    <NavigationIcon className={isActive ? 'active-icon' : ''} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
      <div className="sidebar-footer">
        <p className="sidebar-footer-title">CONTACT US</p>
        <div className="social-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="social-image"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="social-image"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social-image"
          />
        </div>
        <p className="sidebar-footer-text">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </SideBarContainer>
  )
}

export default SideBar
