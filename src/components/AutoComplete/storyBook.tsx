import React, { useState } from 'react';
import AutoComplete, { DataSourceType } from './autoComplete'

const helloTo = (str: string, repeat: number = 1):DataSourceType => ({
  value: 'hello ' + str.repeat(repeat),
});

const Complete:React.FC = () => {
  const [options, setOptions] = useState<DataSourceType[]>([]);

  const onSearch = (searchText:string) => {
    setOptions(
      !searchText ? [] : [helloTo(searchText), helloTo(searchText, 2), helloTo(searchText, 3)],
    );
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{
          width: 300,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
    </>
  );
};

export default Complete