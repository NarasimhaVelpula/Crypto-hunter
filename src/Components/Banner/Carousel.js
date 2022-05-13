/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import {css} from '@emotion/react'
import axios from 'axios'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'

export const numberWithCommas=(x)=> {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
  const [trending, setTrending] = useState([])
  
  
  const styles={
      carousel: css`
      height: 50%;
      display: flex;
      align-items:center;
      `,
      carouseItem: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        text-transform: uppercase;
        color: gold;
      `
  }
  const {currency,symbol}=CryptoState()

  const fetchTrendingCoins=async ()=>{
      const {data}=await axios.get(TrendingCoins(currency))
      setTrending(data)
      console.log(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
    
  }, [currency])

  const responsive={
      0:{
          items:2
      },
      512: {
          items: 5
      }
  }
  
  const items= trending.map((coin)=>{
    let profit = coin?.price_change_percentage_24h >= 0;

      return(
          <Link to={`/coin/${coin.id}`} css={styles.carouseItem}>
              <img
               height="80"
               alt={coin.name}
               style={{marginBottom: 10}}
               src={coin.image}
                />
                <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
       
          </Link>
      )
  })

  return (
    <div css={styles.carousel}>
        <AliceCarousel mouseTracking infinite 
        autoPlayInterval={1000} 
        animationDuration={1500} 
        disableDotsControls 
        disableButtonsControls
        items={items}
        autoPlay
        responsive={responsive}/>
    </div>
  )
}

export default Carousel