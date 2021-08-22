import React, { useState} from 'react'
import styled from 'styled-components';
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
    const [status, setStatus] = useState(apiStatus.IDLE)
    const [data, setData] = useState([]);
    const [error, setError] = useState(null)
    
    const onSearchValue = async (val: string) => {
        const url = val && `${constants.BASE_URL}?input=${val}${constants.API_KEY}`;
        try {
            setStatus(apiStatus.LOADING);
            const response = await fetch(url);
            const data = await response.json();
            setData(data.predictions);
            setStatus(apiStatus.FETCHED);
        } catch(err){
            setStatus(apiStatus.ERROR);
            setData([]);
            const errMessage:any = 'Error Fetching data.'
            setError(errMessage);
        }
    }


    return(
        <Wrapper>
            <SearchBar requests={ onSearchValue}/>
            {status === apiStatus.IDLE && <MessageWrapper>Search for a place.</MessageWrapper>}
            {status === apiStatus.LOADING && <MessageWrapper><Loader /></MessageWrapper>}
            {status === apiStatus.ERROR && <MessageWrapper>{error}</MessageWrapper>}
            {status === apiStatus.FETCHED && data.length === 0 && <MessageWrapper>No Results found.</MessageWrapper>}
            {status === apiStatus.FETCHED && data.length !== 0  && <ListWrapper>
                {data.map((item: any) => {
                    return (
                        <SearchItem result={item.description} key={item.place_id} />
                    )
                })}
            </ListWrapper>}
        </Wrapper>
    )

}

export default Container;