import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import gameModel from '../../models/gameModel';

const GameDetails = ({ classes, game }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={game.logo}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {game.name}
        </Typography>
        <Typography component="p">
          {`Record by ${game.player.name} done in ${game.time}`}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        <a href={game.video} target="_blank" rel="noreferrer noopener">See Video</a>
      </Button>
    </CardActions>
  </Card>
);

GameDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  game: gameModel.isRequired,
};

export default withStyles(styles)(GameDetails);
