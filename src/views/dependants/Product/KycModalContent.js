import React from 'react';
import PropTypes from 'prop-types';
import { Grid, ImageList, ImageListItem, ListItemText, ListItem, List, Typography } from '@mui/material';

export const KycModalContent = (props) => {

  return (<React.Fragment>
    <Grid container spacing={1} justifyContent='center' alignItems='flex-start'>
      <Grid item xs={12} sm={12} lg={12}>
        <ImageList cols={2} gap={10}>
          <ImageListItem key={`kycSignature_${props.id}`}>
            <img
              src={`${props.kyc.kycSignature}`}
              alt={props.name}
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem key={`documentUrl_${props.id}`}>
            <img
              src={`${props.kyc.documentUrl}`}
              alt={props.name}
              loading="lazy"
            />
          </ImageListItem>
        </ImageList>
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    {props.kyc.sectionA.a1}
                  </Typography>
                </React.Fragment>
              }
              secondary={'Cognome e nome/Ragione sociale'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    {props.kyc.sectionA.a2}
                  </Typography>
                </React.Fragment>
              }
              secondary={'Codice fiscale/p.iva'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    {props.kyc.sectionA.a3}
                  </Typography>
                </React.Fragment>
              }
              secondary={'Nazionalità'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    {props.kyc.sectionA.a4}
                  </Typography>
                </React.Fragment>
              }
              secondary={'Sede fiscale'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    {props.kyc.sectionA.a5 ? "yes" : "no"}
                  </Typography>
                </React.Fragment>
              }
              secondary={'Già raccolti in occasione di precedente prestazione professionale (specificare)'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    {props.kyc.sectionA.a6}
                  </Typography>
                </React.Fragment>
              }
              secondary={''}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    {props.kyc.sectionA.a7 ? "yes" : "no"}
                  </Typography>
                </React.Fragment>
              }
              secondary={'Come da copia dei documenti di identificazione e di codice fiscale allegati.'}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  </React.Fragment>);
};

KycModalContent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  kyc: PropTypes.shape({
    kycSignature: PropTypes.string,
    documentUrl: PropTypes.string,
    sectionA: PropTypes.shape({
      a1: PropTypes.string,
      a2: PropTypes.number,
      a3: PropTypes.string,
      a4: PropTypes.string,
      a5: PropTypes.bool,
      a6: PropTypes.string,
      a7: PropTypes.bool,
    })
  })
};
