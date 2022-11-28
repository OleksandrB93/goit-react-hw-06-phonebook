import PropTypes from "prop-types";
import React from "react";
import { DeleteBtn, List, Item, UserInfo, Avatar } from "./ContactLIst.styled";
import { HiOutlineTrash } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "redux/contactSlise";
import { getContacts, getFilter } from "redux/contactSlise";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filtered = useSelector(getFilter);

  const findContacts = () => {
    const normalizedFilter = filtered.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = findContacts();

  return (
    <List>
      {filteredContacts.map(
        ({
          id,
          name,
          phoneNumber,
          img = "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
        }) => {
          return (
            <Item key={id}>
              <Avatar src={img} alt="avatar" />
              <UserInfo>
                {name}: {phoneNumber}
              </UserInfo>
              <DeleteBtn
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                <HiOutlineTrash />
              </DeleteBtn>
            </Item>
          );
        }
      )}
    </List>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func,
};
