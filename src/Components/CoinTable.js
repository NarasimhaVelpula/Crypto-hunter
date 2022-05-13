/** @jsxImportSource @emotion/react */
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import  { useCallback, useEffect, useRef, useState } from 'react'
import { CoinList, GetSearchCoins, SearchCoins } from '../config/api'
import { CryptoState } from '../CryptoContext'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { numberWithCommas } from './Banner/Carousel'
import { useNavigate } from "react-router-dom";

function CoinTable() {

    const [coins, setCoins] = useState([])
    const [loading,setLoading]=useState(false)
    const [searchString,setSearchString]=useState('')
    const [pageno,setPageno]=useState(1)
    const {currency,symbol}= CryptoState()
    const navigation=useNavigate()

    const darkTheme=createTheme({
      palette:{
          primary:{
              main: '#fff',
          },
          mode: "dark"
      }
  })

  const fetchCoins=async ()=>{
    setLoading(true)
    const {data}=await axios.get(CoinList(currency,pageno))
    setCoins(coins=>[...coins,...data])
    setLoading(false)
}

const fetchSearchCoins= async(e)=>{
  setSearchString(e.target.value)
  if(e.target.value!==""){

    setLoading(true)
    var {data:data1} = await axios.get(SearchCoins(e.target.value))
    const coins= data1.coins.map(coin=>coin.id)
    var {data:data2}= await axios.get(GetSearchCoins(coins,currency))
    const data= data1.coins.map((coin)=>({
      current_price: data2[coin.id][currency],
      image: coin.large,
      price_change_percentage_24h: data2[coin.id][`${currency}_24h_change`],
      market_cap: data2[coin.id][`${currency}_market_cap`],
      symbol: coin.symbol,
      name: coin.name,
      id: coin.id
      
    }))
    
    setLoading(false)
    setCoins(data)
  }
  else{
    fetchCoins()
  }
}


let bottomBoundaryRef=useRef(null);
    const scrollObserver = useCallback(
      node=>{
        new IntersectionObserver(entries=>{
          entries.forEach(async en=>{
            if(en.intersectionRatio>0){
              // updatePage()

              console.log('check me I am working')
              setPageno(page=>page+1)
            }
          })
        }).observe(node);
       },[]
    )

    useEffect(() => {
      console.log("getting new page")
      fetchCoins()
    }, [currency,pageno])
    
    

    useEffect(() => {
      if (bottomBoundaryRef.current) {
        scrollObserver(bottomBoundaryRef.current);
      }
    }, [scrollObserver, bottomBoundaryRef]);

   let profit

  return (
    <ThemeProvider theme={darkTheme}>
      {console.log(pageno)}
      <Container sx={{textAlign: 'center'}}>
        <Typography variant="h3" sx={{margin: '18px', fontFamily:"Montserrat"}}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField label="Search for a Crypto Name" sx={{marginBottom:'20px', width: '100%'}}
        value={searchString}
        onChange={fetchSearchCoins}
        />
        <TableContainer component="paper"  sx={{margin: '0px'}}>
          
          <Table stickyHeader >
            <TableHead >
              <TableRow>
              {['Coin','Price','24h change','Market Cap'].map((head) => (
                <TableCell key={head} sx={{color: 'blue',
                fontWeight:700, 
                fontSize: '14px',
                fontFamily: "Montserrat",
                backgroundColor: 'chartreuse'
                }}>
                    {head}
                </TableCell>
              ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map(coin=>(
                <TableRow 
                key={coin.name} 
                onClick={()=>{navigation(`/coin/${coin.id}`)}}
                sx={{
                  "&:hover":{
                    cursor: 'pointer'
                  }
                }}
                >
                    <TableCell sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textTransform: 'uppercase'
                      }}>
                      <img src={coin.image} 
                      height="40" 
                      style={{marginBottom:'10px'}}
                      alt={coin.name}
                      />
                      <div style={{display: 'flex', flexDirection:'column', marginLeft:"10px"}}>
                        <span>{coin.symbol}</span>
                        <span style={{color:'darkgrey'}}>{coin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell>
                      {profit=coin?.price_change_percentage_24h >= 0}
                    <span
                  style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
                    </TableCell>
                    <TableCell>
                      {symbol} {numberWithCommas(coin?.market_cap.toString().slice(0,-6))}M
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Box >
      <CircularProgress />
    </Box>
      }
      {/* {loading2 && (
  <div className="text-center bg-secondary m-auto p-3">
    <p className="m-0 text-white">Getting images</p>
  </div>
      )*/}
<div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div> 
        </TableContainer>
      </Container>
    </ThemeProvider>
  )
}

export default CoinTable