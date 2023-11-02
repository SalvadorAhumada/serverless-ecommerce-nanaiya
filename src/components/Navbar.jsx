import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShopIcon from '@mui/icons-material/Shop';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

export default function MenuAppBar({ setSearch }) {

  const pages = ['Contacto', 'Acerca de'];

  const handleCloseNavMenu = () => {
    console.log('change page')
  }

  const styles = {
    mr: { mr: 2 },
    bg: { background: 'black'}
  }
  return (
    <Box sx={styles.flexGrow}>
      <AppBar position="fixed" style={styles.bg}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={styles.mr}
          >
            <ShopIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={styles.flexGrow}>
            Venture Zone
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, ml: 3, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar en Catálogo:"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}