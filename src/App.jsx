import { useState } from "react";
import CustomSelect from "./Custom/CustomSelect";
import "./App.css";

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const groupedOptions = [
    { value: "Dhaka", label: "Dhaka", group: "Dhaka Division" },
    { value: "Narayanganj", label: "Narayanganj", group: "Dhaka Division" },
    { value: "Gazipur", label: "Gazipur", group: "Dhaka Division" },
    { value: "Manikgonj", label: "Manikgonj", group: "Dhaka Division" },
    { value: "Munshigonj", label: "Munshigonj", group: "Dhaka Division" },
    { value: "Narsingdi", label: "Narsingdi", group: "Dhaka Division" },
    { value: "Tangail", label: "Tangail", group: "Dhaka Division" },
    { value: "Kishorgonj", label: "Kishorgonj", group: "Dhaka Division" },
    { value: "Netrokona", label: "Netrokona", group: "Dhaka Division" },
    { value: "Faridpur", label: "Faridpur", group: "Dhaka Division" },
    { value: "Gopalgonj", label: "Gopalgonj", group: "Dhaka Division" },
    { value: "Madaripur", label: "Madaripur", group: "Dhaka Division" },
    { value: "Rajbari", label: "Rajbari", group: "Dhaka Division" },
    { value: "Shariatpur", label: "Shariatpur", group: "Dhaka Division" },

    { value: "Panchagarh", label: "Panchagarh", group: "Rangpur Division" },
    { value: "Thakurgaon", label: "Thakurgaon", group: "Rangpur Division" },
    { value: "Dinajpur", label: "Dinajpur", group: "Rangpur Division" },
    { value: "Saidpur", label: "Saidpur", group: "Rangpur Division" },
    { value: "Kurigram", label: "Kurigram", group: "Rangpur Division" },
  ];

  const handleChange = (value) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  const handleMenuOpen = () => {
    console.log("Menu opened");
  };

  const handleSearch = (searchTerm) => {
    //  search handler
    const results = groupedOptions.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(results);
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="main-app">
      <h1 className="heading">Custom Select Component</h1>
      <CustomSelect
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        options={searchResult.length > 0 ? searchResult : groupedOptions}
        value={selectedValue}
        placeholder="Select Your City"
        isGrouped={true}
        isMulti={true}
        onChangeHandler={handleChange}
        onMenuOpen={handleMenuOpen}
        onSearchHandler={handleSearch}
      />
    </div>
  );
};

export default App;
