import React from 'react'

const SearchBar = () => {
  return (
    <div>SearchBar</div>
  )
}

export default SearchBar

/*const SearchComponent = ({ data, setData }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Filter the data array based on your search query
    const filteredData = data.filter((obj) =>
      obj.name.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  useEffect(() => {
    // Reset the data array to its original state when the query is empty
    if (query === '') {
      setData(originalData);
    }
  }, [query, setData]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

----------------

return (
    <div>
      <SearchComponent data={data} setData={setData} />
      <SortingComponent data={data} setData={setData} />
      <ul>
        {data.map((obj) => (
          <li key={obj.name}>
            {obj.name} - {obj.property1} - {obj.property2} - {obj.property3} - {obj.property4}
            <button onClick={() => handlePin(obj.name)}>Pin</button>
          </li>
        ))}
      </ul>
    </div>
  );
};*/