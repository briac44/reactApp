import {Input} from "antd"
const { Search } = Input;


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const onSearch = () => {
    fetch("", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const SearchBar = (props) => {
    return (
        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />            
    );
};

export default SearchBar;