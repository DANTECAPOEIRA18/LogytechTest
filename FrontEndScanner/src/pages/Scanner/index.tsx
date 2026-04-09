/* eslint-disable react-hooks/set-state-in-effect */
import React, {FC, useCallback, useEffect, useState} from 'react'
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    InputAdornment,
    TablePagination
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FeedBackModal from '../../Components/FeedBackModal'
import { faBarcode} from '@fortawesome/free-solid-svg-icons'
import { listCodes, createCodeRegister } from '../../Api/ApiScannerService'
import { ScannerCreateInput } from '../../Api/ApiScanner.types'


const Scanner : FC = () => {
    const [inputCode, setInputCode] = useState('');
    const [registeredCodes, setRegisteredCodes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [typeModal, setTypeModal] = useState<'error' | 'success'>('error')

    const handleClose = () => setOpenModal(false);

    const isButtonDisabled = !inputCode.trim();

    const handleListCodes = useCallback(async () => {
        try{
            const response = await listCodes();
            setRegisteredCodes(response.data); 
        }
        catch {
            console.error('error adquiriendo datos')
            setMessageModal('error adquiriendo datos');
            setTypeModal('error')
            setOpenModal(true);
        }
    }, [])

    useEffect(()=>{
        handleListCodes();
    },[handleListCodes])

    const handleRegister = async() => {
        if(!isButtonDisabled){
            try{
                const newRegister : ScannerCreateInput = {
                    serial: inputCode.trim()
                } 
                const response = await createCodeRegister(newRegister);
                if(response.status === 201){
                    setRegisteredCodes([...registeredCodes, inputCode.trim()])
                    setInputCode('')
                    setTypeModal('success')
                    setMessageModal('Guardado con Éxito')
                    setOpenModal(true)
                }
            }
            catch(e){
                console.error(e)
                setTypeModal('error')
                const fullError = e.response.data;

                const regex = /serial:\s*(.*?)\s*Severity/;

                const matchResponse = fullError.match(regex)
                setMessageModal(matchResponse[1])
                setOpenModal(true)
            }
        }
    }

    const handleChangePage = (_event: unknown, numberPage: number) => {
        setPage(numberPage);
    }

    const handleChangerowsPerPage = (_event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(_event.target.value))
        setPage(0)
    }

    return(
        <>
            <FeedBackModal 
                message={messageModal}
                open={openModal}
                onClose={handleClose}
                type={typeModal}
            />
            <Container maxWidth='lg' sx={{ mt: 10, background: 'white'}}>
                <Typography 
                    variant='h4' 
                    component='h1' 
                    gutterBottom 
                    align='center' 
                    sx={{
                        fontWeight: 'bold',
                        color: 'blue'
                    }}>
                    Registrar Código
                </Typography>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        my: 4
                    }}
                >
                    <TextField 
                        fullWidth
                        label="Código del producto"
                        variant='outlined'
                        required
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder='EJ: PRD123456789'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FontAwesomeIcon icon={faBarcode} color='blue' />
                                    </InputAdornment>
                                ),
                                sx: {borderRadius: 3, bgcolor: 'white'}
                            }
                        }}
                    />

                    <Button
                        fullWidth
                        variant='contained'
                        disabled={isButtonDisabled}
                        onClick={handleRegister}
                        sx={{
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 'bold',
                            textTransform: 'none'
                        }}
                    >
                        Registrar Código
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{mt:4, mb:10, boxShadow: 3}}>
                        <Table>
                            <TableHead sx={{backgroundColor: '#1972D2'}}>
                                <TableRow>
                                    <TableCell 
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        Código del producto
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    registeredCodes.length > 0 ? (
                                        registeredCodes.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((item, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell>{item}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={
                                                {
                                                    py: 3, color: 'text.secondary'
                                                }
                                            }>
                                                No hay Códigos Registrados aún.
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                        <TablePagination 
                            rowsPerPageOptions={[5,10,25]}
                            component='div'
                            count={registeredCodes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangerowsPerPage}
                            labelRowsPerPage="Filas:"
                            labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
                        />
                </TableContainer>
            </Container>
        </>
    )
}

export default Scanner;
