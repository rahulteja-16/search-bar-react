import styled from 'styled-components';
import { Item } from '../types';

const LI = styled.li`
    list-style-type: none;
    padding: 1%;
    cursor:pointer;
`;

const SearchItem = ({ result,  onSelect } : Item) => {
    return <LI onClick={() => onSelect(result)}>{ result}</LI>
}
export default SearchItem;