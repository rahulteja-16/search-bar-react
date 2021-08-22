import React from 'react'
import styled from 'styled-components';

interface item {
    result: string
}

const LI = styled.li`
    list-style-type: none;
    padding: 1%;
`;

const SearchItem = ({ result,  } : item) => {
    return <LI >{ result}</LI>
}
export default SearchItem;