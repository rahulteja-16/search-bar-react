import  { useState} from 'react'
import styled from 'styled-components';
import SearchBar from './SearchBar';
import constants, { apiStatus } from '../constants'
import useFetch from '../hooks/useFetch';


const Wrapper = styled.div`
    padding-top: 20px;
    display: flex;
    flex-flow: column;
    justify-content:center;
`;

const Container = () => {
    const [currentValue, setCurrentValue] = useState('');

    const url = currentValue && `${constants.BASE_URL}?input=${currentValue}${constants.API_KEY}`;
    const { data, status, error } = useFetch(url);
    
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