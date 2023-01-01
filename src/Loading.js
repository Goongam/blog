import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useIsFetching, useIsMutating } from 'react-query';

export default function Loading(){

    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    
    const isLoading = isFetching || isMutating ? true : false;

    return <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </>;
}