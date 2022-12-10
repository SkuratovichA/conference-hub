import React from "react";
import { CardActionArea, ButtonBase, Box, Card, CardContent, Typography, CardActions, Button, CardMedia} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import plus from '../plus.png'

// TODO: populate cards with data
export const MuiCard = (props) => {
    console.log(props)
    const conference_j = props.conference
    console.log(conference_j)

    return conference_j ? (
            <Box width="280px">
                <Card>
                    <CardMedia
                        component="img"
                        height="120"
                        image="https://source.unsplash.com/random"
                        alt="unsplash image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component={'div'}>{conference_j.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{conference_j.description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">{conference_j.price}</Button>
                        <Button
                            size="small"
                        >
                            Show info
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        ) :
        (
                <Box width="280px">
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="257"
                                image={plus}
                                alt=""
                            />
                        </CardActionArea>
                    </Card>
                </Box>
        )
}
