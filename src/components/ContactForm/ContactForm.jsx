import * as React from 'react';
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsContactAdd,
  selectPhoneBookValue,
} from '../../redux/phoneBook/phoneSelector';
import { postContactThunk } from '../../api/fetchContacts';
import { Avatar, Button, TextField, Box, Typography } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import { LoadAdd } from 'components/Loader/Loader';
import { avatarStyle } from '../../pages/StylePages';

export const options = {
  width: '300px',
  position: 'right-bottom',
  timeout: 2000,
  fontSize: '20px',
};

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();
  const phoneBook = useSelector(selectPhoneBookValue);
  const isContactAdd = useSelector(selectIsContactAdd);

  useEffect(() => {
    setAdd(false);
  }, [phoneBook]);

  useEffect(() => {
    if (isContactAdd) {
      reset();
    }
  }, [isContactAdd]);

  const onSubmitAddContact = evt => {
    evt.preventDefault();
    const newObj = { name, number };

    if (isNameNew(phoneBook, newObj) !== undefined) {
      Notify.warning(`${newObj.name} is already in contacts`, options);
      return;
    }
    dispatch(postContactThunk(newObj));
  };

  const isNameNew = (phoneBook, newObj) => {
    return phoneBook.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };

  const onChangeInput = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Avatar sx={avatarStyle}>
        <ContactsIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add Contact
      </Typography>
      <Box component="form" onSubmit={onSubmitAddContact} sx={{ mt: 1 }}>
        <TextField
          sx={{ backgroundColor: 'rgba(208, 224, 241, 0.822)' }}
          inputProps={{
            inputMode: 'text',
            pattern: '^[a-zA-Zа-яА-Я]+(([a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$',
          }}
          margin="normal"
          fullWidth
          label="Name"
          type="text"
          name="name"
          value={name}
          title="Name may contain only letters and spaces."
          required
          onChange={onChangeInput}
        />
        <TextField
          sx={{ backgroundColor: 'rgba(208, 224, 241, 0.822)' }}
          inputProps={{ inputMode: 'tel', pattern: '[0-9]*' }}
          margin="normal"
          fullWidth
          label="Phone number"
          type="tel"
          name="number"
          value={number}
          title="Phone number must be only digits"
          required
          onChange={onChangeInput}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, display: 'flex', gap: 3 }}
        >
          {add && <LoadAdd />}
          <p>Add contact</p>
        </Button>
      </Box>
    </>
  );
};
