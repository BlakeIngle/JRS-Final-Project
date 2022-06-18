import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Search.css'

export default function Search({ onSubmit, onChange }) {

  const [searchQuery, setSearchQuery] = useState('');

  /**
   * 
   * @param {input} e 
   * @returns searchQuery as a string
   * 
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(searchQuery);
    }
    return;
  }

  return (
    <div className="search-container-root">
      <form className="search-form-root"
        onSubmit={handleFormSubmit}>

        <input className="search-input"
          type="text"
          name="search"
          placeholder="Search and Shop"
          onChange={(e) => {
            setSearchQuery(e.target.value)
            onChange(e.target.value)
          }}
        />

        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}



