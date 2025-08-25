import React, { useContext } from 'react'
import "./Header.css"
import { ThemeContext } from "../App"

const Header = ({ title, leftChild, rightChild }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className='Header'>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightChild}</div>
    </header>
  )
}

export default Header
