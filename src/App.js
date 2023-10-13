import { useState } from 'react';
import './App.css';
import { apiKey, sheetId } from './api';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import useGoogleSheets from 'use-google-sheets';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Modal from './components/Modal';
import selectedData from './selectedData.json';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const styles = {
  cartCss: {
    position: "fixed",
    right: "4rem",
    bottom: "4rem",
    width: "80px",
    height: "80px",
    boxShadow: "2px 2px #00000061",
    cursor: "pointer",
    zIndex: "2"
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'Manrope',
    h5: {
      fontWeight: "bolder",
      color: "#545454"
    },
    body2: {
      textAlign: 'left'
    }
  },
});

const StyledBadge = styled(Badge)(() => ({
  color: 'white',
  '& .MuiBadge-badge': {
    backgroundColor: '#F05D5E',
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}));
function App() {
  const [search, setSearch] = useState('');
  const [car, setCar] = useState(new Map());
  const [open, setOpen] = useState(false);
  const formatPrice = (amount) => {
    return (
      parseInt(amount)
    ).toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });

  }
  const getProducts = () => {
    if (search === '') return data[1].data;
    return data[1].data.filter(product => {
      return product['nombre']
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    })
  }
  const addToCar = (product) => {
    setCar(new Map(car.set(product.id, JSON.stringify(product))));
  }
/*   const { data, loading, error } = useGoogleSheets({
    apiKey,
    sheetId,
  }); */

    const loading = false;
    const data = [
      '',
      {
        data: selectedData
      }
    ]

  const showCart = car.size !== 0 ? <Avatar onClick={() => setOpen(true)} style={styles.cartCss}>
    <StyledBadge badgeContent={car.size} color="primary">
      <ShoppingCartIcon />
    </StyledBadge></Avatar> : ''
  const showElements = loading ? 'Cargando...' : <Main formatPrice={formatPrice} products={getProducts()} addProduct={addToCar} />
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Navbar setSearch={setSearch} products={car.size} openCart={setOpen} />
        </header>
        {showCart}
        {
          showElements
        }
        <Modal formatPrice={formatPrice} open={open} setOpen={setOpen} selectedProducts={car} />
      </div>
    </ThemeProvider>
  );
}

export default App;
