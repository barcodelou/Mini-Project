import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const images = [
  {
    url: 'https://static.vecteezy.com/system/resources/previews/000/186/309/original/bright-colors-sale-voucher-gift-card-design-template-vector.jpg',
    title: 'Diskon 80%',
    width: '33%',
    promo:'GASKAN'
  },
  {
    url: 'https://thumbs.dreamstime.com/b/super-promo-design-seal-stamp-icon-over-yellow-background-concept-colorful-illustration-85129729.jpg',
    title: 'Super 10%',
    width: '33%',
    promo:'SEPI'
  },
  {
    url: 'https://www.ucokdurian.id/wp-content/uploads/2015/09/diskon20welcome.png',
    title: 'Sale 20%',
    width: '33%',
    promo:'TIGA'

  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

function Cek(){
    console.log('tes tombol')
}
const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBases() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (props) => {
    console.log(props)
    localStorage.setItem('kode',props);
    const kode=localStorage.getItem('kode');
    console.log(kode);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
          <>
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={()=>handleClickOpen(image.promo)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}+{image.promo}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
       
        </ImageButton>
        
           <Dialog
           open={open}
           TransitionComponent={Transition}
           keepMounted
           onClose={handleClose}
           aria-describedby="alert-dialog-slide-description"
           
         >
           <DialogTitle>{'Notif'}</DialogTitle>
           <DialogContent>
             <DialogContentText id="alert-dialog-slide-description">
               {'kode promo berhasil di copy'}
             </DialogContentText>
           </DialogContent>
           <DialogActions>
            
             <Button onClick={handleClose}>Terima</Button>
           </DialogActions>
         </Dialog>
         </>
      ))}
    </Box>
  );
}