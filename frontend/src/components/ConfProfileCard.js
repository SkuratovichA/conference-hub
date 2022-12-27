// author: Shchapaniak Andrei

import * as React from 'react';
import {CardActions} from "@mui/material"
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
const ConfProfileCard = (props) => {

  return (
    <Card variant="outlined" sx={{ width: 350, backgroundColor: 'rgba('+props.color[0]+', '+props.color[1]+', '+props.color[2]+', '+props.color[3]+')' }}>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5, marginBottom: '20px', textDecoration: "underline", fontSize: "20px" }}>
              <b>{props.conf.name.length <= 35 ? props.conf.name: (props.conf.name.substr(0, 35) + "...")}</b>
          </Typography>
          <Typography level="body2">
              <b>From</b> {props.conf.date_from}
              <br/>
              <b>To</b> {props.conf.date_to}
          </Typography>

            <CardActions style={{marginTop: "15px", alignItems: "center", justifyContent: "space-evenly"}}>
                <Button style={{border: "2px solid black"}} onClick={props.callbackDetail}>
                    Details
                </Button>
                <Button style={{border: "2px solid black"}} onClick={props.callbackRefundModalDialog}>
                    Refund
                </Button>
            </CardActions>
    </Card>
  );
}

export default ConfProfileCard