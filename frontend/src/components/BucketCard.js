// author: Shchapaniak Andrei

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Tooltip from '@mui/material/Tooltip';

const BucketCard = (props) => {

  return (
    <Card variant="outlined" sx={{ width: 520 }}>
        <Tooltip title={props.textButton}  placement="top-end">
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                onClick={props.callbackBuy}
                sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              >
                  {props.button}
              </IconButton>
        </Tooltip>

        <Tooltip title="Delete from the bucket"  placement="top-start">
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                onClick={props.callbackDeleteFromBucket}
                sx={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}
              >
                  <CancelPresentationIcon />
              </IconButton>
        </Tooltip>

        <Typography level="h2" fontSize="md" sx={{ mb: 0.5, marginTop: '30px', fontSize: "20px" }}>
          <b>{props.conf.name.length <= 30 ? props.conf.name: (props.conf.name.substr(0, 30) + "...")}</b>
      </Typography>
      <Typography level="body2">
          <b>From</b> {props.conf.date_from} <b>To</b> {props.conf.date_to}
      </Typography>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img
          src={"http://localhost:8000/media/static/conf_default.jpg"}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {props.conf.price} $
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
          onClick={props.callbackDetail}
        >
          Details
        </Button>
      </Box>
    </Card>
  );
}

export default BucketCard