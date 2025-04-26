import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/Header.css'

function Header({ 
  selectedDate, 
  onDateChange, 
  categories, 
  activeFilters, 
  onFilterToggle,
  searchQuery,
  onSearch,
  showFavorites,
  onToggleFavorites,
  favoritesCount
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  
  // Format the date for display
  const formattedDate = format(selectedDate, 'MMMM d')
  
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }
  
  const handleDateSelection = (date) => {
    onDateChange(date)
    setIsCalendarOpen(false)
  }

  const handleSearchChange = (e) => {
    onSearch(e.target.value)
  }
  
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Today in History</h1>
        
        <div className="header-actions">
          <div className="date-selector">
            <button 
              className="date-button" 
              onClick={handleCalendarToggle}
              aria-label="Select date"
              disabled={showFavorites}
            >
              <span className="current-date">{formattedDate}</span>
              <span className="calendar-icon">📅</span>
            </button>
            
            {isCalendarOpen && (
              <div className="date-picker-container">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelection}
                  inline
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
            )}
          </div>

          <button 
            className={`favorites-button ${showFavorites ? 'active' : ''}`}
            onClick={onToggleFavorites}
          >
            <span className="favorites-icon">⭐</span>
            <span className="favorites-label">
              Favorites ({favoritesCount})
            </span>
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-container">
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-button ${activeFilters.includes(category) ? 'active' : ''}`}
              onClick={() => onFilterToggle(category)}
              data-category={category.toLowerCase()}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header