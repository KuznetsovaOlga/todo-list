import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import dropdownModules from "./dropdown.module.css";
import {fetchAllCart, fetchCartByCategory} from "../../../slices/listNotesSlices";

function DropdownShop() {
  const [selectedValue, setSelectedValue] = useState('');
  const [optionValue, setOptionValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const data =  await response.json();
        setOptionValue(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  },[])

  useEffect(() => {
    if (selectedValue?.length > 0 && selectedValue !== 'Выберите категорию') {
      dispatch(fetchCartByCategory(selectedValue));
    } else {
      dispatch(fetchAllCart());
    }
  }, [dispatch, selectedValue]);

  return (
    <div>
      <select
          value={selectedValue}
          onChange={handleChange}
          className={dropdownModules.dropdown}
      >
        <option>Выберите категорию</option>
        {optionValue.length > 0 && optionValue.map((item, index) => (
            <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default DropdownShop;