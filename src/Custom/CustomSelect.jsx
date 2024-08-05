import { useState, useEffect, useRef } from 'react';
import './CustomStyle.css';

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState(isMulti ? [] : null);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  useEffect(() => {
    if (value) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearchHandler) {
      onSearchHandler(event.target.value);
    }
  };

  const handleOptionClick = (option) => {
    if (isMulti) {
      setSelectedValues((prev) => {
        const newValues = prev.includes(option)
          ? prev.filter((val) => val !== option)
          : [...prev, option];
        onChangeHandler(newValues);
        return newValues;
      });
    } else {
      setSelectedValues(option);
      onChangeHandler(option);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    if (isMulti) {
      setSelectedValues([]);
      onChangeHandler([]);
    } else {
      setSelectedValues(null);
      onChangeHandler(null);
    }
  };

  const handleRemoveSelectedOption = (option) => {
    if (isMulti) {
      setSelectedValues((prev) => {
        const newValues = prev.filter((val) => val !== option);
        onChangeHandler(newValues);
        return newValues;
      });
    }
  };

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const renderOptions = () => {
    if (isGrouped) {
      const groups = filteredOptions.reduce((acc, option) => {
        const group = acc.find((g) => g.label === option.group);
        if (group) {
          group.options.push(option);
        } else {
          acc.push({ label: option.group, options: [option] });
        }
        return acc;
      }, []);

      return groups.map((group) => (
        <div key={group.label} className="group">
          <div className="group-label">{group.label}</div>
          {group.options.map((option) => (
            <div
              key={option.value}
              className={`option ${
                selectedValues.includes(option) ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      ));
    }

    return filteredOptions.map((option) => (
      <div
        key={option.value}
        className={`option ${
          selectedValues.includes(option) ? 'selected' : ''
        }`}
        onClick={() => handleOptionClick(option)}
      >
        {option.label}
      </div>
    ));
  };

  const toggleOpen = () => {
    if (!isDisabled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      if (newIsOpen && onMenuOpen) {
        onMenuOpen();
      }
    }
  };

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className={`select-input ${isDisabled ? 'disabled' : ''}`}
        onClick={toggleOpen}
      >
        {isMulti
          ? selectedValues.length
            ? selectedValues.map((val) => (
                <div key={val.value} className="selected-option">
                  {val.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSelectedOption(val);
                    }}
                    className="remove-btn"
                  >
                    &times;
                  </button>
                </div>
              ))
            : placeholder
          : selectedValues
          ? selectedValues.label
          : placeholder}
        {isClearable && selectedValues && (
          <button onClick={handleClear} className="clear-btn">
            &times;
          </button>
        )}
      </div>
      {isOpen && (
        <div className="select-menu">
          {isSearchable && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              className="search-input"
            />
          )}
          <div className="options">{renderOptions()}</div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
