import {RetryButton} from '../StyledComponents'

const FailureView = ({isDark, onRetry}) => (
  <div className={`failure-container ${isDark ? 'failure-dark' : 'failure-light'}`}>
    <img
      src={
        isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      }
      alt="failure view"
      className="failure-image"
    />
    <h1 className="failure-title">Oops! Something Went Wrong</h1>
    <p className="failure-description">
      We are having some trouble completing your request.
      <br />
      Please try again.
    </p>
    <RetryButton type="button" onClick={onRetry}>
      Retry
    </RetryButton>
  </div>
)

export default FailureView
