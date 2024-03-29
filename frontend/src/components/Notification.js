import React, {useContext, useEffect, useState} from 'react';
import {Grid, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import Box from "@mui/joy/Box";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {getToken, updateInvite} from "../actions/UserFunctions";
import {InviteContext} from './Navbar'

export const NotificationItem = ({invite}) => {

  let [invites, setStatus] = useContext(InviteContext)

  let token = getToken()

  const reactToInvitation = (method, invite_id) => {
    updateInvite(token,invite_id, method)
      .then(response => {
        if (response === true){
          setStatus(invite_id)
        }
      })
  }
    return (

             <Paper sx={{ width: "100%", fullWidth: true, opacity: invite.status === true? 0.35 : 1 }} elevation={3}>
                 <Grid container>
                     <Grid item md={10} px={2} py={2}>

                          <Typography gutterBottom variant="h5">
                              Membership invite from {invite.org_name}
                          </Typography>
                          <Typography variant="body1" color="text.primary">
                              {invite.brief}
                          </Typography>
                         <Typography variant="body2"  color="text.secondary">
                            Send on: {new Date(invite.date_sent).toLocaleDateString(undefined, date_format)}
                         </Typography>

                     </Grid>
                   {invite.status === true ? (
                     <Grid item md={2} py={2}>
                       <Typography variant="body2"  color="text.secondary" sx={{opacity: 1}}>
                         {invite.approved? "APPROVED" : invite.rejected? "REJECTED" : "ERROR"}
                         </Typography>
                     </Grid>
                     ) : (
                     <Grid item md={2} py={2}>
                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 , flexDirection: 'column' }}>
                             <TooltipStyled
                                 onclickHandler={() => {reactToInvitation('PUT',invite.inv_id); invite.approved = true}}
                                 title="Accept invitation"
                                 color="success"
                                 icon={<AssignmentTurnedInIcon/>}
                             />
                             <TooltipStyled
                                 onclickHandler={() => {reactToInvitation('DELETE',invite.inv_id); invite.rejected = true}}
                                 title="Reject invitation"
                                 color="error"
                                 icon={<DeleteForeverIcon sx={{ height: 30, width: 30 }} />}
                             />
                        </Box>
                     </Grid>
                   )}

                 </Grid>
            </Paper>
    );
};

export const MemberItem = ({member}) => {
  let [status, setStatus] = useState({color:"info.main", text: "Pending"})

  useEffect(()=>{
      if (member.approved){
        setStatus({color: "success.main",text:"Approved"})
      }
      else if (member.rejected){
        setStatus({color: "error.main",text:"Rejected"})
      }
    }

  ,[member])



    return (
        <Paper sx={{ width: "100%", fullWidth: true }} elevation={3}>
             <Grid container direction="row" justifyContent="space-between" alignItems="center">
                 <Grid item md={8} px={2} py={2}>

                      <Typography gutterBottom variant="h5">
                          {member.res_name} {member.res_surname}
                      </Typography>
                   <Typography variant={"body1"}>
                     Email: {member.res_email}
                   </Typography>
                     <Typography variant="body2"  color="text.secondary">
                        Membership request send on: {member.date_sent}
                     </Typography>

                 </Grid>
               <Grid item md={3} px={2} py={2}>
                 <Typography variant="button" color={status.color}>
                   Status: <strong>{status.text}</strong>
                 </Typography>
               </Grid>
             </Grid>
        </Paper>
    )
}

let date_format = {
    month: "short",
    day: "2-digit",
    year: 'numeric'
}

export const TooltipStyled = ({title, color, icon, onclickHandler}) => {
    return (
        <Tooltip title={
                <Typography variant="subtitle2">
                    {title}
                </Typography>
            }
                 placement="right"
        >
             <IconButton color={color} onClick={onclickHandler}>
                 {icon}
              </IconButton>
         </Tooltip>

    )

}

