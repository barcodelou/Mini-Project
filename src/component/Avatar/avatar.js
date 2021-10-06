import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {Typography} from "@material-ui/core";
import Alert from '@mui/material/Alert';

export default function AvatarChips() {
const contact=localStorage.getItem('user')
  return (
    <Stack direction="column"
    justifyContent="space-evenly"
    alignItems="flex-end"
    spacing={2}>
        {/* <Typography
            variant="h6"
            fontWeight="bold"
          >
            Selamat datang
          </Typography> */}
          <Alert severity="success" >Selamat Datang</Alert>
      <Chip
        avatar={<Avatar alt={contact} src="https://en.m.wikipedia.org/wiki/File:Sample_User_Icon.png" />}
        label={contact}
        variant="outlined"
      />
    </Stack>
  );
}