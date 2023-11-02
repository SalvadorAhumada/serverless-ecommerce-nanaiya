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

export default function AlertDialogSlide({ getImg, updateProducts, open, setOpen, selectedProducts, formatPrice }) {

    const handleClose = () => {
        setOpen(false)
    };
    const sendMsg = () => {
        let url = `https://api.whatsapp.com/send?phone=5213111213128&text=buen+dia+me+interesan+los+siguientes+producto%28s%29%3A`;
        Array.from(selectedProducts.values()).forEach(product => {
            const { nombre } = JSON.parse(product);
            url += ` ${nombre},`;
        })
        window.open(url, '_blank')
    }
    const getHeaders = () => {
        return []
    }
    const deleteProduct = ({ id }) => {
        let newProducts = selectedProducts.filter(product => product.id !== id);
        updateProducts(newProducts);
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
                        {selectedProducts.length !== 0 ? <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {getHeaders().map((header, index) => {
                                        return <TableCell key={index}>{header}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedProducts.map((product, index) => {
                                    return <TableRow
                                        key={index}>
                                        <TableCell component="th" scope="row">
                                            <TextField
                                                style={{ width: '100px' }}
                                                size="small"
                                                id={`cantidad-${product.id}`}
                                                defaultValue="1"
                                                variant="outlined" />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <img alt='imagen del producto' src={getImg(product.id)} style={{ width: '100px', margin: '0 auto' }} />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {product.nombre}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {formatPrice(product.precio)}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => deleteProduct(product)}>
                                            <CloseIcon />
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table> : 'Sin productos'}
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button color='warning' onClick={handleClose}>CANCELAR</Button>
                    <Button onClick={sendMsg}>CONTINUAR</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}