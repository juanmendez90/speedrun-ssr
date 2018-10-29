import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import styles from './styles';

const SimpleTable = ({ classes, dataSource, headers }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {
            headers.map(header => <TableCell key={header}>{header}</TableCell>)
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {dataSource.map(data => (
          <TableRow key={data.id}>
            <TableCell component="th" scope="row">
              <Link to={`/game/${data.id}`}>
                <img alt="logo" src={data.assets['cover-tiny'].uri} />
              </Link>
            </TableCell>
            <TableCell component="th" scope="row">
              <Link to={`/game/${data.id}`}>
                {data.names.international}
              </Link>
            </TableCell>
          </TableRow>
        ))
      }
      </TableBody>
    </Table>
  </Paper>
);

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    assets: PropTypes.shape({
      'cover-tiny': PropTypes.shape({
        uri: PropTypes.string,
      }),
    }),
    names: PropTypes.shape({
      international: PropTypes.string,
    }),
  })).isRequired,
};

export default withStyles(styles)(SimpleTable);
