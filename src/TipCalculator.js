import React, {useState, useEffect} from 'react';

import { Container, Grid, TextField, MenuItem, Button, makeStyles } from '@material-ui/core';

const qualities = [
  {
    quality: "Špatná",
    percentage: 2
  },
  {
    quality: "Dobrá",
    percentage: 10
  },
  {
    quality: "Perfektní, jsem nadšený",
    percentage: 15
  },
];

const addAmount = 10;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    textAlign: "center"
  },
  container: {
    marginTop: "20px"
  },
  textField: {
    width: "100%"
  }
}));


function TipCalculator(){
  const classes = useStyles();
  const [subtotal, setSubtotal] = useState("");
  const [subtotalE, setSubtotalE] = useState(false);
  const [personCount, setPersonCount] = useState(1);
  const [quality, setQuality] = useState(10);
  const [total, setTotal] = useState();

  useEffect(()=> {
    if(total)
      setTotal(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[subtotal, personCount, quality])

  const editSubtotal = (inputEvent) => {
    if(!isNaN(inputEvent.target.value)){
      setSubtotal(parseInt(inputEvent.target.value))
      setSubtotalE(false);
    }
    else
      setSubtotalE(true);
  }
  const editPersonCount = (inputEvent) => {
    let val = inputEvent.target.value;
    if(val < 1)
      val = 1;
    setPersonCount(parseInt(val));
  }
  const calculate = () => {
    let tmpTotl = subtotal + (quality/100)*subtotal + addAmount*(personCount-1);
    tmpTotl = Math.ceil(tmpTotl/10) * 10;
    setTotal(tmpTotl);
  }

  return (
  <Container maxWidth={"md"} className={classes.container}>
    <form autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={6} className={classes.gridItem}>
          <TextField
            id="subtotal"
            label="Castka na uctu"
            required
            variant={"outlined"}
            value={subtotal}
            onChange={editSubtotal}
            error={subtotalE}
            helperText={subtotalE ? "Zadavejte jenom cisla" : undefined}
            className={classes.textField}
            />
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <TextField
          id="personCount"
          label="Pocet lidi"
          variant={"outlined"}
          type={"number"}
          onChange={editPersonCount}
          className={classes.textField}
          value={personCount} />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <TextField
            id="quality"
            select
            label="Kvalita obsluhy"
            value={quality}
            onChange={(e)=>setQuality(parseInt(e.target.value))}
            variant="outlined"
            className={classes.textField}
          >
            {qualities.map((quality, index) => (
              <MenuItem key={index} value={quality.percentage}>
                {quality.quality}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} className={classes.gridItem} >
          <Button variant={"outlined"} disabled={!subtotal} onClick={calculate} color={"primary"} >Vypocet</Button>
        </Grid>
        <Grid item xs={12} className={classes.gridItem} hidden={!total} >
          K zaplaceni: {total}
        </Grid>
      </Grid>
    </form>
  </Container>
);
}

export default TipCalculator;