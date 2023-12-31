import {
  ListItem,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { delContactThunk } from '../../api/fetchContacts';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SpinerDel } from 'components/Loader/Loader';
import { listItemStyle } from './StyleContactsList';

export const ContactItem = ({ contact }) => {
  const [load, setLoad] = useState(false);
  const { id, name, number } = contact;
  const dispatch = useDispatch();

  const deleteContact = contactId => {
    setLoad(true);
    dispatch(delContactThunk(contactId));
  };

  return (
    <ListItem
      key={id}
      sx={listItemStyle}
      secondaryAction={
        <IconButton onClick={() => deleteContact(id)} aria-label="delete">
          {load ? <SpinerDel /> : <DeleteIcon />}
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemText>
          {name}: {number}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
