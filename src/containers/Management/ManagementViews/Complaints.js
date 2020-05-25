import {Box} from '@material-ui/core';
import {formatDistanceToNow, isValid} from 'date-fns';
import * as React from 'react';

import RemoteTable from '../../../components/RemoteTable';
const columns = [
  {
    title: 'Created at',
    id: 'createdAt',
    render: function (value) {
      const createdAt = new Date(value);
      return isValid(createdAt)
        ? `${formatDistanceToNow(createdAt, {addSuffix: true})} ago`
        : '--N/A--';
    },
  },
  {
    title: 'Status',
    id: 'status',
  },
  {
    title: 'Description',
    id: 'description',
  },
];

export const Complaints = props => {
  return (
    <Box display="flex" flexDirection="row" flex="1">
      <Box flex="1">
        <RemoteTable
          columns={columns}
          columnKey="id"
          title="Complaints"
          remoteURL="/complaints"
          rowKey="_id"
        />
      </Box>
    </Box>
  );
};
