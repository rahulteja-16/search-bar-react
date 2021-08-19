import React from 'react'
import styled from 'styled-components';

interface Search {
    value: string,
    onSearch: Function
}

const InputWrapper = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
`;

const Input = styled.input`
    width: 80%;
    height: 24px;
    border-radius: 5px;
    border: 1.5px solid #000;
    font-size: 15px;
    padding-left: 10px;
`;

const SearchBar = ({ value, onSearch}: Search) => {
    
    return (
        <InputWrapper>
            <Input type="text" value={value} onChange={ (e) => onSearch(e.target.value) }/>
        </InputWrapper>
    );
    
}

export default SearchBar;