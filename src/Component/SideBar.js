import React from 'react'
import { Drawer, Link, Typography,Box, List, ListItem,ListItemText,ListItemIcon} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FeedIcon from '@mui/icons-material/Feed';
export default function SideBar({isDrawerOpen,handleDrawerToggle}) {
  return (
    <>
        <Drawer anchor='left' open ={isDrawerOpen} onClose={handleDrawerToggle}>
            <Box width='250px' p={2} textAlign='center' role='presentation'>
            <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Menu
           </Typography>
           <List>
                <ListItem sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                    <ListItemIcon>
                    <HomeIcon sx={{ color: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText>
                    <Link href="#" underline="none" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        Overview
                    </Link>
                    </ListItemText>
                </ListItem>
                <ListItem sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                    <ListItemIcon>
                    <CurrencyExchangeIcon sx={{ color: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText>
                    <Link href="#cryptocurrency"  underline="none" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        CryptoCurrencies
                    </Link>
                    </ListItemText>
                </ListItem>
                <ListItem sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                    <ListItemIcon>
                    <ShowChartIcon sx={{ color: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText>
                    <Link href="#stock" underline="none" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        Stock
                    </Link>
                    </ListItemText>
                </ListItem>
                <ListItem  sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                    <ListItemIcon>
                    <FeedIcon sx={{ color: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText>
                    <Link href="#news" underline="none" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        News
                    </Link>
                    </ListItemText>
                </ListItem>
           </List>
            </Box>
        </Drawer>
    </>
  )
}
