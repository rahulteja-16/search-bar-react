import React, { useState} from 'react'
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';
import constants, { apiStatus } from '../constants'
import SearchItem from './SearchItem';
import { Loader } from '../styles/Loader';


const Wrapper = styled.div`
    padding-top: 20px;
    display: flex;
    flex-flow: column;
    justify-content:center;
`;

const MessageWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: row;
    padding-top: 20px;
`;

const ListWrapper = styled.div`
    padding-left: 10%;
    padding-top: 10px;
    width: 80%;
`;


const Container = () => {
    const [searchKey, setSearchKey] = useState('');
    const url = searchKey && `${constants.BASE_URL}?input=${searchKey}${constants.API_KEY}`;
    const { status, data, error } = useFetch(url);
    

    const onSearchValue = (val: string) => {
        setSearchKey(val);
    }

    return(
        <Wrapper>
            <SearchBar value={searchKey} onSearch={onSearchValue} />
            {status === apiStatus.IDLE && <MessageWrapper>Search for a place.</MessageWrapper>}
            {status === apiStatus.LOADING && <MessageWrapper><Loader /></MessageWrapper>}
            {status === apiStatus.ERROR && <MessageWrapper>{error}</MessageWrapper>}
            {status === apiStatus.FETCHED && data.length === 0 && <MessageWrapper>No Results found.</MessageWrapper>}
            {status === apiStatus.FETCHED && data.length !== 0 && <ListWrapper>
                {data.map((item: any) => {
                    return (
                        <SearchItem result={item.description} key={item.place_id} onSelect={onSearchValue}/>
                    )
                })}
            </ListWrapper>}
        </Wrapper>
    )

}

export default Container;