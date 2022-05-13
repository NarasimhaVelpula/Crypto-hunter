import { AppBar, Box, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import {css} from '@emotion/react'
import { Link } from 'react-router-dom'
import { CryptoState } from '../../CryptoContext';

function Header() {
  const styles={
      select: css`
        height: 40;
        margin-right: 15px;
        color: white;
        width: 30%;
        flex:1;
      `,
      title: css`
        flex:8;
        color: chartreuse;
        font-family: Montserrat;
        font-weight: bold;
        cursor: pointer
      `
  }

  const darkTheme=createTheme({
      palette:{
          primary:{
              main: '#fff',
          },
          mode: "dark"
      }
  })

  const {currency, setCurrency}= CryptoState()
  return (
      <ThemeProvider theme={darkTheme}>
      <Box flexgrow={1}>
          <AppBar position="static" color="transparent">
              <Toolbar>
                  <Typography sx={styles.title} variant="h5">
                      <Link to="/">
                      Crypto Hunter
                      </Link>
                  </Typography>
                  <Select variant="standard" sx={styles.select}
                  value={currency}
                  onChange={(e)=>{
                    console.log(e.target.value)  
                    setCurrency(e.target.value)}}
                  >
                      <MenuItem value="usd" >USD</MenuItem>
                      <MenuItem value="inr" >INR</MenuItem>
                  </Select>
              </Toolbar>
          </AppBar>
      </Box>
      </ThemeProvider>
  )
}

export default Header