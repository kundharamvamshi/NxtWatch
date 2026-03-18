import {createContext} from 'react'

const ThemeContext = createContext({
  isDark: false,
  changeTheme: () => {},
  savedVideos: [],
  addVideo: () => {},
  removeVideo: () => {},
})

export default ThemeContext
