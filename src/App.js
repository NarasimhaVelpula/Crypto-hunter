/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import CoinPage from './Pages/HomePage/CoinPage';
import HomePage from './Pages/HomePage/HomePage';
import {jsx,css} from '@emotion/react'

// const usestyles=makeStyles(()=>(
//   {
//     App:{
//       backgroundColor: '#14161a'
//       color: 'white',
//       minHeight: '100vh'
//     }
//   }
// )
// )

function App() {

  const styles= {
    app: css`
        background-color: #14161a;
        color: white;
        min-height: 100vh;
         `
  }
  
  

  return (
    
    <BrowserRouter>
    <div css={styles.app}>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
