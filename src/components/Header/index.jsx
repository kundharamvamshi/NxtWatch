import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useContext, useState} from 'react'

import {RiSunLine} from 'react-icons/ri'
import {FaMoon} from 'react-icons/fa'
import {FiMenu, FiX} from 'react-icons/fi'
import {MdHome, MdPlaylistAdd} from 'react-icons/md'
import {FaFire} from 'react-icons/fa6'
import {SiYoutubegaming} from 'react-icons/si'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import './index.css'

import {HeaderContainer} from '../StyledComponents'

import ThemeContext from '../../context'

const navItems = [
  {to: '/', label: 'Home', icon: MdHome},
  {to: '/trending', label: 'Trending', icon: FaFire},
  {to: '/gaming', label: 'Gaming', icon: SiYoutubegaming},
  {to: '/saved-videos', label: 'Saved Videos', icon: MdPlaylistAdd},
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const {isDark, changeTheme} = useContext(ThemeContext)

  const handleLogout = () => {
    closeMenu()
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const handleThemeChange = () => {
    changeTheme()
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <HeaderContainer isDark={isDark}>
      <div className="header-bar">
        <div className="header-left">
          <button
            type="button"
            className="menu-toggle-btn mobile-only"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <FiMenu />
          </button>
          <Link to="/">
            <img
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </div>

        <div className="header-actions">
          <button
            type="button"
            onClick={handleThemeChange}
            data-testid="theme"
            className="icon-btn"
            aria-label="Toggle theme"
          >
            {isDark ? <RiSunLine /> : <FaMoon />}
          </button>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="header-profile desktop-only"
          />
          <Popup
            modal
            trigger={
              <button type="button" className="logout-btn desktop-only">
                Logout
              </button>
            }
          >
            {close => (
              <div className={`logout-modal ${isDark ? 'dark' : 'light'}`}>
                <p>Are you sure you want to logout?</p>
                <div className="logout-modal-actions">
                  <button type="button" onClick={close} className="modal-cancel-btn">
                    Cancel
                  </button>
                  <button type="button" onClick={handleLogout} className="modal-confirm-btn">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>

      {isMenuOpen && (
        <div>
          <button
            type="button"
            className="mobile-menu-overlay mobile-only"
            aria-label="Close navigation menu"
          />
          <div className={`mobile-menu-drawer mobile-only ${isDark ? 'dark' : 'light'}`}>
            <div className="mobile-menu-header">
              <button
                type="button"
                className="icon-btn"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <FiX />
              </button>
            </div>

            <nav className="mobile-nav">
              {navItems.map(item => {
                const NavigationIcon = item.icon

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({isActive}) =>
                      isActive
                        ? 'mobile-nav-link mobile-nav-link-active'
                        : 'mobile-nav-link'
                    }
                  >
                    <NavigationIcon />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>

            <div className="mobile-menu-footer">
              <Popup
                modal
                trigger={
                  <button type="button" className="mobile-logout-btn">
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className={`logout-modal ${isDark ? 'dark' : 'light'}`}>
                    <p>Are you sure you want to logout?</p>
                    <div className="logout-modal-actions">
                      <button type="button" onClick={close} className="modal-cancel-btn">
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="modal-confirm-btn"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>

          </div>
        </div>
      )}
    </HeaderContainer>
  )
}

export default Header
