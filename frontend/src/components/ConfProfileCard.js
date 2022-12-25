// author: Shchapaniak Andrei

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import {Delete} from "@mui/icons-material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ConfProfileCard = (props) => {

  return (
    <Card variant="outlined" sx={{ width: 220 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5, marginBottom: '20px' }}>
          <b>{props.conf.name.length <= 22 ? props.conf.name: (props.conf.name.substr(0, 22) + "...")}</b>
      </Typography>
      <Typography level="body2">
          <b>From</b> {props.conf.date_from}
          <br/>
          <b>To</b> {props.conf.date_to}
      </Typography>
      {/*<IconButton*/}
      {/*  aria-label="bookmark Bahamas Islands"*/}
      {/*  variant="plain"*/}
      {/*  color="neutral"*/}
      {/*  size="sm"*/}
      {/*  onClick={props.callbackBuy}*/}
      {/*  sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}*/}
      {/*>*/}
      {/*    <HighlightOffIcon*/}
      {/*      style={{ color: 'red' }}*/}
      {/*    />*/}
      {/*</IconButton>*/}
    </Card>
  );
}

export default ConfProfileCard