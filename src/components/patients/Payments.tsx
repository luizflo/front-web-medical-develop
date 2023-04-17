import React, { useEffect, useState } from 'react'
import styles from './payments.module.scss'
import { useRouter } from 'next/router'
import {
  Grid,
  Typography,
  TextField,
} from '@mui/material'
import Card from "react-credit-cards";
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../utils';

export default function Payments({ onClick }: any) {
  const [numberCard, setNumberCard] = React.useState<String>('');
  const [name, setName] = React.useState<String>('');
  const [expiry, setExpiry] = React.useState<String>('');
  const [cvc, setCvc] = React.useState<String>('');
  const [focused, setFocused] = React.useState<String>('');
  const [formData, setFormData] = React.useState<String>('');
  const [state, setState] = React.useState<String>('');

  const handleInputFocus = (target: String) => {
    setFocused(target);
  };


  const router = useRouter()
  const [isClicked, setIsClicked] = useState<any>()
  const cards = [
    'xxxx xxxx xxxx 1999',
    'xxxx xxxx xxxx 1999'
  ]


  return (

    <Grid >
      <Grid className={styles.row}>
        {cards.map((item, index) => (
          <Grid className={styles.creditCard}>
            <Typography className={styles.textCard}>
              {item}
            </Typography>
            <img src="../mastercard.png" className={styles.logoCard} />
          </Grid>

        ))}
      </Grid>

      <div key="Payment">
        <div className="App-payment">
          {/* <Card
            number={numberCard}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
          // callback={this.handleCallback}
          /> */}
          <form >
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={() => setNumberCard(formatCreditCardNumber(numberCard))}
                onFocus={() => handleInputFocus(name)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={() => setName(name)}
                onFocus={() => handleInputFocus(name)}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={() => setExpiry(formatExpirationDate(expiry))}
                  onFocus={() => handleInputFocus(name)}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={() => setCvc(formatCVC(cvc))}
                  onFocus={() => handleInputFocus(name)}
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
          {/* {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
            </div>
          )} */}

        </div>

      </div>

      {/* <Typography className={styles.labelText}>Número do cartão</Typography>
      <TextField></TextField>
      <Grid className={styles.row}>
        <Grid className={styles.spaceHorizontal}>
          <Typography className={styles.labelText}>Validade</Typography>
          <TextField></TextField>
        </Grid>
        <Grid className={styles.spaceHorizontal}>
          <Typography className={styles.labelText}>CVV</Typography>
          <TextField></TextField>
        </Grid>
      </Grid>
      <Typography className={styles.labelText}>Nome impresso no cartão</Typography>
      <TextField></TextField> */}
      <Typography className={styles.labelText}>CPF</Typography>
      <TextField></TextField>

      <a className={styles.buttonConfirm} onClick={() => onClick()}>
        <Typography variant="body1" className={styles.textButtonConfirm}>
          Confirmar pagamento
        </Typography>
      </a>
    </Grid>
  )
}
