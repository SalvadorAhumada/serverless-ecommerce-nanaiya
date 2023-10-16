import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, selectedProducts, formatPrice }) {
    const handleClose = () => { setOpen(false); };
    const getHeaders = () => {
        let firstProduct = [...selectedProducts][0][1];
        firstProduct = JSON.parse(firstProduct);
        delete firstProduct.id;
        delete firstProduct.inventario;
        delete firstProduct.descripcion;
        firstProduct = Object.keys(firstProduct);
        firstProduct.unshift('Cantidad');
        firstProduct.push('Eliminar')
        return firstProduct;
    }
    const formatProducts = () => {
        const products = [...selectedProducts].map(product => {
            const selectedProduct = JSON.parse(product[1]);
            selectedProduct.cantidad = 1;
            return selectedProduct;
        })
        return products;
    }
    return (
        <div>
            <Dialog
                maxWidth='md'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Mi Carrito"}</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        {selectedProducts.size !== 0 ? <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {getHeaders().map((header, index) => {
                                        return <TableCell key={index}>{header}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formatProducts().map((product, index) => {
                                    return <TableRow
                                        key={index}>
                                        <TableCell component="th" scope="row">
                                            <TextField 
                                            style={{width: '100px'}} 
                                            size="small"
                                            id={`cantidad-${product.id}`}
                                            defaultValue="1"
                                            variant="outlined" />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <img alt='imagen del producto' src={product.imagen} style={{ width: '100px', margin: '0 auto' }} />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {product.nombre}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {formatPrice(product.precio)}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={{textAlign: 'center', cursor: 'pointer'}}>
                                            <CloseIcon/>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table> : 'Sin productos'}
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button color='warning' onClick={handleClose}>CANCELAR</Button>
                    <Button onClick={handleClose}>CONTINUAR</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}