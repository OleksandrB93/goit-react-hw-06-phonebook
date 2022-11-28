import React from "react";
import PropTypes from 'prop-types';
import { SearchInputSt } from "./SearchInput.styled";
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from "redux/contactSlise"; 
import { setFilter } from "redux/contactSlise"; 


export default function SearchInput() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <SearchInputSt
        type="text"
        name={filter}
        value={filter}
        onChange={onChange}
        placeholder="Please write name"
      />
    </div>
  );
}

SearchInput.propTypes = {
  filter: PropTypes.string,
  changeFilterInput: PropTypes.func,
};