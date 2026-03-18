import {useState} from 'react'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'

import ThemeContext from './context'

import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/saved-videos" element={<SavedVideos />} />
        <Route path="/videos/:id" element={<VideoItemDetails />} />
      </Route>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </>,
  ),
)

const App = () => {
  const [isDark, setIsDark] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const toggleTheme = () => {
    setIsDark(prevIsDark => !prevIsDark)
  }

  const addVideo = videoItem => {
    setSavedVideos(prevVideos => [...prevVideos, videoItem])
  }

  const removeVideo = id => {
    setSavedVideos(prevVideos => prevVideos.filter(each => each.id !== id))
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        changeTheme: toggleTheme,
        savedVideos,
        addVideo,
        removeVideo,
      }}
    >
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  )
}

export default App
