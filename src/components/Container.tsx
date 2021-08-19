import React from 'react'
import styled from 'styled-components';
import SearchBar from './SearchBar';


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column:
    height: 100vh;
    padding-top: 20px;
`;

const Container = () => {
    return(
        <Wrapper>
            <SearchBar />
        </Wrapper>
    )

}

export default Container;