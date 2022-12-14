import React, {useEffect} from 'react';
import './styles/Other.css'
import {EditableTypography} from "./EditableTypography";
import { useContext } from "react";
import authContext from "../context/AuthContext";
import {setProperty} from "../actions/OtherFunctions"
/* eslint-disable no-useless-escape */
/* eslint-disable no-unexpected-multiline */
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';
import {getToken} from "../actions/UserFunctions";
import {useState} from "react";
import {userCRUDHandler} from "../actions/UserFunctions";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";
import Grid from '@mui/material/Unstable_Grid2'
import {MuiCard} from "./ConferenceCard";
import {getInfoUser} from "../actions/UserFunctions";
import Conference from "./Conference";
import ConferenceModal from "./ConferenceModal";
import {getUsers} from "../actions/UserFunctions";
import BucketCard from "./BucketCard";
import {Delete, ShoppingCart} from "@mui/icons-material";
import { Paper } from '@mui/material';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';

function getBase64FromImageUrl(url) {
    let img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        let dataURL = canvas.toDataURL("image/png");

        // alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;
}

async function createFile(){
  let response = await fetch('http://127.0.0.1:8000/media/static/conf_default.jpg');
  let data = await response.blob();
  let metadata = {
    type: 'image/jpeg'
  };
  let file = new File([data], "test.jpg", metadata);
  console.log(file)
  // ... do something with the file or return it
}

const Bucket = ( props ) => {

    let [conferences_tickets, changeConfs] = useState([])
    let [user, changeUserInfo] = useState(null)
    let [loaded, setLoad] = useState(false)
    let {authTokens} = useContext(authContext)
    let token = authTokens?.access ? "Bearer " + authTokens.access : null
    let [totalPrice, changeTotalPrice] = useState(0)


    useEffect(() => {
        conferenceCRUDHandler("fetch_all", null, null, null)
            .then(confs => {
                changeConfs(confs)
                return getInfoUser(token)
            })
            .then(userinfo => {
                changeUserInfo(userinfo)
                setLoad(true)
            })

        //createFile()
        //getBase64FromImageUrl("http://localhost:8000/media/static/default.png")

    }, [])

    if (loaded === false) {
        return ""
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="my-div">
                <div className="colorful-head-bucket">
                    Your Bucket
                </div>
                <Grid container justifyContent="center">
                    <Paper style={{maxHeight: "75vh", overflow: 'auto', width: "70%"}}>
                        <List>
                            {conferences_tickets.map(conference => (
                                <ListItem alignItems="center" key={conference.name}>
                                    <BucketCard
                                        conf={conference}
                                        button={<ShoppingCart />}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Button variant="contained" disableElevation style={{marginTop: '30px'}}>
                    Search conferences
                </Button>
            </div>
            <div className="my-div">
                <div className="colorful-head-buy">
                    Buy Tickets
                </div>
                <Grid container justifyContent="center">
                    <Paper style={{maxHeight: "75vh", overflow: 'auto', width: "70%"}}>
                        <List>
                            {conferences_tickets.map(conference => (
                                <ListItem alignItems="center" key={conference.name}>
                                    <BucketCard
                                        conf={conference}
                                        button={<Delete />}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Button variant="contained" color="success" style={{marginTop: '30px'}}>
                    Buy
                </Button>
                <div style={{color: "black"}}>
                    <b>Total price:</b> {totalPrice} $
                </div>
            </div>
        </section>
    );
}

export default Bucket