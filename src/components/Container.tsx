import  { useState} from 'react'
import styled from 'styled-components';
import SearchBar from './SearchBar';
import constants, { apiStatus } from '../constants'


const Wrapper = styled.div`
    padding-top: 20px;
    display: flex;
    flex-flow: column;
    justify-content:center;
`;

const Container = () => {
    const [status, setStatus] = useState(apiStatus.IDLE)
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    
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
            <SearchBar request={onSearchValue} data={data} placeholder='Search for a place.' status={status} error={ error}/>
        </Wrapper>
    )

}

export default Container;