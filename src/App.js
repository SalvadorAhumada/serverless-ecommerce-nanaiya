import { useEffect, useState } from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Modal from './components/Modal';
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
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'Manrope',
    h5: {
      fontWeight: "bolder",
      color: "white",
      opacity: 0.5
    },
    body2: {
      textAlign: 'left',  
      fontSize: '1.1rem',
      color: "white",
    },
    body3: {
      fontSize: '1.3rem'
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
  const [shoppingCart, setShoppingCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatPrice = (amount) => {
    return (
      parseInt(amount)
    ).toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });
  }

  const fetchProducts = async () => {
    let endpoint = '/.netlify/functions/google-sheet';
    if(process.env.NODE_ENV === 'development') {
      endpoint = '/.netlify/functions/google-sheet-test';
    }
    console.log('fetch:', endpoint);
    return await fetch(endpoint)
      .then(response => { return response.json() })
  }

  const getProducts = () => {
    if (search === '') return products;
    return products.filter(product => {
      return product['nombre']
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    })
  }

  const addToCar = (product) => {
    let newCar = shoppingCart;
    newCar.push(product);
    setShoppingCart([...newCar]);
  }

  useEffect(() => {
    fetchProducts().then((products) => {
      setIsLoading(false);
      setProducts(products)
    })
  }, []);

  const imgHandler = (id) => {
    try {
        const urlImg = `./img/${id}.png`;
        const img = require(urlImg);
        return urlImg;
    } catch(ex) {
        console.warn('NOTA: PRODUCTO SIN IMAGEN');
        return require(`./img/shoping.png`);
    }
};

  const showCart = shoppingCart.length !== 0 ? <Avatar onClick={() => setOpen(true)} style={styles.cartCss}>
    <StyledBadge badgeContent={shoppingCart.length} color="primary">
      <ShoppingCartIcon />
    </StyledBadge></Avatar> : ''

  const showElements = isLoading ? <div style={styles.loading}><img alt='loading' src={require('./icons/Loading.gif')} width="300px" height="300px" /></div> : <Main getImg={imgHandler} formatPrice={formatPrice} products={getProducts()} addProduct={addToCar} />

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Navbar setSearch={setSearch}/>
        </header>
        {showCart}
        {showElements}
        <Modal getImg={imgHandler} updateProducts={setShoppingCart} formatPrice={formatPrice} open={open} setOpen={setOpen} selectedProducts={shoppingCart} />
      </div>
    </ThemeProvider>
  );
}

export default App;
