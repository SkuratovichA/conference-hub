import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import {Delete} from "@mui/icons-material";

const BucketCard = (props) => {

  return (
    <Card variant="outlined" sx={{ width: 520 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          <b>{props.conf.name}</b>
      </Typography>
      <Typography level="body2">
          <b>From</b> {props.conf.date_from} <b>To</b> {props.conf.date_to}
      </Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
          {props.button}
      </IconButton>
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
        >
          Details
        </Button>
      </Box>
    </Card>
  );
}

export default BucketCard