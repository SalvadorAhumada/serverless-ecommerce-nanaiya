import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './Main.css';


function Main({ products, addProduct, formatPrice, getImg }) {
    const styles = {
        button: {
            background: 'black',
            '&:hover':{
                background: 'black'
             }
        },
        size: {
            xs: 12,
            sm: 6,
            md: 5,
            lg: 4
        },
        cardStyle: {
            position: 'relative',
            minWidth: 400,
            transition: "0.3s",
            minHeight: 500,
            backgroundColor: "#545454",
            '&:hover': {
                transform: "scale(1.05)",
                transition: "0.3s",
                cursor: "pointer"
            }
        },
        cardFooter: {
            position: "absolute",
            bottom: '1rem',
            left: '1rem'
        }
    }

    return <div className="card-wrapper">
        <Grid container spacing={5}>
            {products.map((product, index) => {
                return <Grid key={index} item {...styles.size}>
                    <Card sx={styles.cardStyle} raised>
                        <CardContent style={{ textAlign: 'center' }}>
                            <img src={getImg(product.id)} alt='imagen del producto' style={{ width: '50%', margin: '0 auto' }} />
                            <Typography variant="h5" component="div">
                                {product.nombre}
                            </Typography>
                            <Typography variant="body3">
                                <b>{formatPrice(product.precio)}</b>
                            </Typography>
                            <Typography variant="body2">
                                {product.descripcion}
                            </Typography>
                        </CardContent>
                        <CardActions style={styles.cardFooter}>
                            <Button variant="contained" sx={styles.button} size="small" onClick={() => addProduct(product)}>Agregar al carrito</Button>
                        </CardActions>
                    </Card>
                </Grid>
            })}
        </Grid>

    </div>
}

export default Main;