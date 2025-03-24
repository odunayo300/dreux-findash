import React, { useEffect,useState} from 'react'
import {
   Box,
    Typography,
    Container, 
    Card,
     CardContent,
     Grid2,
     CardMedia,
     TableContainer,
     TableBody,
     TableHead,
     TableCell,
     TableRow,
     Paper,
     Table,
     Button } from '@mui/material'
import CustomAppBar from './CustomAppBar'

export default function Main({handleDrawerToggle}) {

  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[selectedCrypto, setSelectedCrypto] = useState(null);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [stocks, setStocks] = useState([]);
  // const [loadingStocks, setLoadingStocks] = useState(false);
  
const stocks_url = 'https://api.twelvedata.com/market_state?apikey=d87f66d50d744bd3a8244103e308c6f6';
const BASE_URL = 'https://api.coinranking.com/v2/coins';
 
useEffect(() =>{
  const fetchStocks = async () => {
    try {
      const response = await fetch(stocks_url);
      const data = await response.json();
      setStocks(data.slice(0, 10)); // Display only the first 10 stocks
    }
    catch (error) {
      console.log(error);
    }
  }
  fetchStocks();
},[])

  const options = {
    headers: {
      'Content-Type': 'application/json',
       'x-access-token': 'coinrankingda5b737ac77d59fe78cb72f37912d1a599d54c4338ae2a9a',
    },
  };


  

  useEffect(() =>{
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL, options);
        const data = await response.json();
        setCryptocurrencies(data.data.coins);  
        setFilteredCryptos(data.data.coins);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  },[])

  const handleCryptoSelect = (cryptoName) => {
    if (cryptoName) {
      // Filter cryptocurrencies based on the selected name
      const filtered = cryptocurrencies.filter((crypto) => crypto.name === cryptoName);
      setFilteredCryptos(filtered);
    } else {
      // Reset to show all cryptocurrencies if no selection is made
      setFilteredCryptos(cryptocurrencies);
    }
  };

  

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="primary">
          Fetching cryptocurrencies data...
        </Typography>
      </Box>
    )
  }
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth='lg'>
       <CustomAppBar
        handleDrawerToggle={handleDrawerToggle}
        cryptocurrencies={cryptocurrencies}
        onCryptoSelect={handleCryptoSelect}
      />
      <Box id='cryptocurrency' sx={{ my: 4 ,mt:8}}>
        <Typography variant='body1' color='warning' gutterBottom>CryptoCurrencies</Typography>
        {selectedCrypto?(
          <Box>
             <Typography variant="h4" gutterBottom>
              {selectedCrypto.name} Details
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="crypto details">
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>{selectedCrypto.rank}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{selectedCrypto.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>{selectedCrypto.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Market Cap</TableCell>
                    <TableCell>{selectedCrypto.marketCap}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Change</TableCell>
                    <TableCell>{selectedCrypto.change}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Listed at</TableCell>
                    <TableCell>{selectedCrypto.listedAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setSelectedCrypto(null)} // Reset selected cryptocurrency
            >
              Back to List
            </Button>
          </Box>
        ):(
          <Grid2 container spacing={3}>
             {filteredCryptos.map((crypto) => (
            <Grid2 key={crypto.uuid}>
              <Card
                sx={{
                  backgroundColor: crypto.color || '#f5f5f5',
                  color: '#fff',
                }}
                onClick={() => setSelectedCrypto(crypto)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={crypto.iconUrl}
                  alt={crypto.name}
                  sx={{ objectFit: 'contain', padding: 2 }}
                />
                   <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {crypto.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Current Market price: {crypto.price}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Market Cap: {crypto.marketCap}
                  </Typography>
                  <Typography variant="body2">Change: {crypto.change}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
          </Grid2>
        )}
       
        <Box id='stock'sx={{ mt: 6 }}>
          <Typography variant='body1' color='warning' gutterBottom>stock</Typography>
          <Typography variant='body2' color='textSecondary' gutterBottom>Check the state of all available exchanges, time to open, and time to close.</Typography>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Time after open</TableCell>
                  <TableCell>Time to open</TableCell>
                  <TableCell>Time to close</TableCell>
                  <TableCell>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.map((stock) => (
                  <TableRow key={stock.code}>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.time_after_open}</TableCell>
                    <TableCell>{stock.time_to_open}</TableCell>
                    <TableCell>{stock.time_to_close}</TableCell>
                    <TableCell>{stock.country}</TableCell>
                  </TableRow>     
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  ) 
}
