import React, {FC} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
    Button,
    Box
} from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

interface Props {
    open: boolean;
    type: 'success' | 'error';
    message: string;
    onClose: () => void
}

const FeedBackModal: FC<Props> = ({ open, message, onClose, type }) =>{
    const isSuccess = type === 'success';

    return(
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx:{
                        borderRadius: 4,
                        p: 3,
                        minWidth: '320px',
                        textAlign: 'center',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                    }
                }
            }}
        >
            <DialogContent>
                <Box sx={{ mb: 2}}>
                    <FontAwesomeIcon icon={
                        isSuccess ? faCheckCircle : faTimesCircle
                    }
                    color={isSuccess ? 'green' : 'red'}
                    />
                </Box>
                <Typography variant='h6' sx={{mb:1}}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center', pb: 2}}>
                    <Button variant='contained' onClick={onClose} sx={{borderRadius: 2, px: 4}}>
                        Aceptar
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FeedBackModal;