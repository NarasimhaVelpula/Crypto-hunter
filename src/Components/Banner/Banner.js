/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'
import { Container, Typography } from '@mui/material'
import Carousel from './Carousel'

function Banner() {
  const styles={
    banner: css`
      background-image: url(./banner.jpg)
    `,
    bannerContent: css`
      height: 400px;
      display: flex;
      flex-direction: column;
      padding-top: 25px;
      justify-content: space-around;
    `,
    title: css`
      font-weight: bold;
      margin-bottom: 15px;
      font-family: Montserrat;
    `,
    subtitle: css`
      color: darkgrey;
      text-tranform: captilize;
      font-family: Montserrat;
    `,
    tagline: css`
      display: flex;
      height: 40%;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    `
  }
  return (
    <div css={styles.banner} >
      <Container sx={styles.bannerContent}>
          <div css={styles.tagline}>
            <Typography variant="h2" sx={styles.title}>
                Crypto Hunter
            </Typography>
            <Typography variant="subtitle2" sx={styles.subtitle}>
              Get all the info regarding your favorite Crypto Currency
            </Typography>
          </div>
          <Carousel />
      </Container>
    </div>
  )
}

export default Banner