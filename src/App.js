import React from 'react'
import { CssBaseline } from '@mui/material'
import SideBar from './Component/SideBar'
import Main from './Component/Main';
import {useState} from 'react'

export default function App() {

  const[isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawerToggle = () =>{
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <div>
        <CssBaseline />
        <SideBar handleDrawerToggle = {handleDrawerToggle} isDrawerOpen={isDrawerOpen}/>
        <Main handleDrawerToggle = {handleDrawerToggle}/>
    </div>
  )
}
