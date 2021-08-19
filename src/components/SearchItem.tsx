import React from 'react'
import styled from 'styled-components';

interface item {
    result: string
    onSelect: Function
}

const LI = styled.li`
    list-style-type: none;
    padding: 1%;
`;

const SearchItem = ({ result, onSelect } : item) => {
    return <LI onClick={ () => onSelect(result)}>{ result}</LI>
}
export default SearchItem;