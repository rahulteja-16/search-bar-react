import  { useState} from 'react'
import styled from 'styled-components';
import SearchBar from './SearchBar';
import constants from '../constants'
import useFetch from '../hooks/useFetch';
import { useMemo } from 'react';


const Wrapper = styled.div`
    padding-top: 20px;
    display: flex;
    flex-flow: column;
    justify-content:center;
`;

const Container = () => {
    const [currentValue, setCurrentValue] = useState('');

    const url = currentValue && `${constants.BASE_URL}?input=${currentValue}${constants.API_KEY}`;
    const headers = useMemo(() => ({method: 'GET'}), [])
    const { data, status, error } = useFetch(url, headers);
    
    const onSearchValue = async (val: string) => {
        setCurrentValue(val);
    }


    return(
        <Wrapper>
            <SearchBar request={onSearchValue} data={data} placeholder='Search for a place.' status={status} error={ error}/>
        </Wrapper>
    )

}

export default Container;