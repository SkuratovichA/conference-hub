import React from 'react';
import {Button, Card, CardContent, Grid, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import Box from "@mui/joy/Box";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {format, parseISO} from "date-fns";

const Notification = (l) => {

    console.log(l.invite.message)

    return (

             <Paper sx={{ width: "100%", fullWidth: true }} elevation={3}>
                 <Grid container>
                     <Grid item md={10} px={2} py={2}>

                          <Typography gutterBottom variant="h5">
                              The {l.invite.type} invite
                          </Typography>
                          <Typography variant="body1" color="text.primary">
                              {l.invite.message}
                          </Typography>
                         <Typography variant="body2"  color="text.secondary">
                            Send on: {l.invite.date.toLocaleDateString(undefined, date_format)}
                         </Typography>

                     </Grid>
                     <Grid item md={2} py={2}>
                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 , flexDirection: 'column' }}>
                             <TooltipStyled
                                 title="Accept invitation"
                                 color="success"
                                 icon={<AssignmentTurnedInIcon/>}
                             />
                             <TooltipStyled
                                 title="Reject invitation"
                                 color="error"
                                 icon={<DeleteForeverIcon sx={{ height: 30, width: 30 }} />}
                             />
                              <TooltipStyled
                                 title="Mark read"
                                 color="info"
                                 icon={l.invite.status === false ? <MarkEmailReadIcon /> : <MarkEmailUnreadIcon/>}
                             />
                        </Box>
                     </Grid>
                 </Grid>



            </Paper>
    );
};

let date_format = {
    month: "short",
    day: "2-digit",
    year: 'numeric'
}

const TooltipStyled = ({title, color, icon}) => {
    return (
        <Tooltip title={
                <Typography variant="subtitle2">
                    {title}
                </Typography>
            }
                 placement="right"
        >
             <IconButton color={color}>
                 {icon}
              </IconButton>
         </Tooltip>

    )

}

export default Notification;
