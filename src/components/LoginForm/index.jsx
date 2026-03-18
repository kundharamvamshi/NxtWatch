import {useState, useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Container, LoginButton} from '../StyledComponents'

import ThemeContext from '../../context'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {isDark} = useContext(ThemeContext)
  const navigate = useNavigate()

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" replace />
  }

  const onLoginFormSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    navigate('/', {replace: true})
  }

  const onLoginFormSubmitFailure = error => {
    setErrorMsg(error)
  }

  const onLoginFormSubmit = async event => {
    event.preventDefault()
    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      onLoginFormSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      onLoginFormSubmitFailure(data.error_msg)
    }
  }

  return (
    <Container
      isDark={isDark}
      className={`login-form-page ${isDark ? 'login-page-dark' : 'login-page-light'}`}
    >
      <div className={`login-card ${isDark ? 'login-card-dark' : 'login-card-light'}`}>
        <img
          className="login-logo"
          src={
            isDark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="Website logo"
        />
        <form onSubmit={onLoginFormSubmit} className="login-form">
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            className="login-input"
            placeholder="Username"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="login-input"
            placeholder="Password"
          />
          <div className="show-password-row">
            <input
              type="checkbox"
              id="showpassword"
              checked={showPassword}
              onChange={event => setShowPassword(event.target.checked)}
            />
            <label htmlFor="showpassword">Show Password</label>
          </div>
          <LoginButton type="submit">Login</LoginButton>
        </form>
        {errorMsg && <p className="login-error">* {errorMsg}</p>}
      </div>
    </Container>
  )
}

export default LoginForm
