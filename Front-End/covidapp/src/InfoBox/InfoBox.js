import React from 'react'
import{Card,CardContent,Typography} from "@mui/material"

function InfoBox({title,cases,total}) {
  return (
   <Card>
    <CardContent>
        <Typography class="infoBox__title" color="TextSecondary" gutterBottom>{title}</Typography>
        <h2 className="infoBox__Cases">{cases}</h2>

    </CardContent>
   </Card>
  )
}

export default InfoBox;
