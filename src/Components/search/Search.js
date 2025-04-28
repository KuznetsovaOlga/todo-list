import {useState} from "react";

export default function Search({onChangeMarker, className}) {
    const [value, setValue] = useState('');

    const handleChangeSearch = ({ target: { value } }) => {
        setValue(value.trim());
        onChangeMarker(value.trim());
    }

    return (
        <input
            type="text"
            placeholder="покупка или задание"
            className={className}
            value={value}
            onChange={handleChangeSearch}
        />
    )
}