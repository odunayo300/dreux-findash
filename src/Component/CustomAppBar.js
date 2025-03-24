import React from 'react'
import {AppBar as MuiAppBar,
     Typography,
     Toolbar,IconButton,
     TextField,
     Autocomplete,
     Box} from '@mui/material'
     
import MenuIcon from '@mui/icons-material/Menu';

export default function CustomAppBar({ handleDrawerToggle,cryptocurrencies, onCryptoSelect}) {   


  return (
   <MuiAppBar position="fixed">
    <Toolbar>
        <IconButton size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick ={handleDrawerToggle}
        >
            <MenuIcon />    
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dreux Findash   
        </Typography>

        <Box width={'250px'}>
            <Autocomplete
                 options={cryptocurrencies ? cryptocurrencies.map((crypto) => crypto.name) : []} // Fallback to an empty array
                onChange={(event,value) => onCryptoSelect(value)}
                renderInput={(params) =>  <TextField 
                    {...params}
                    label='Search'
                    size='large'
                    fullWidth
                />}
            />
        </Box>
       
            
    </Toolbar>
   </MuiAppBar>
  )
}
