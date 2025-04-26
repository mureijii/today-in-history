import { useState, useEffect } from 'react'
import Header from './components/Header'
import Timeline from './components/Timeline'
import { formatDateKey } from './utils/dateUtils'
import { mockEvents } from './data/events'
import './styles/App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeFilters, setActiveFilters] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])
  
  // Format date for data lookup (MM-DD format)
  const dateKey = formatDateKey(selectedDate)
  
  // Get events for the selected date or favorites if showing favorites
  const eventsForDate = showFavorites 
    ? Object.values(mockEvents)
        .flat()
        .filter(event => favorites.includes(event.id))
    : mockEvents[dateKey] || []
  
  // Filter events based on search query and active filters
  const filteredEvents = eventsForDate.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = activeFilters.length === 0 || 
      activeFilters.includes(event.category)
    
    return matchesSearch && matchesFilter
  })
  
  // Get unique categories for the filter buttons
  const allCategories = [...new Set(
    Object.values(mockEvents)
      .flat()
      .map(event => event.category)
  )]
  
  const handleDateChange = (date) => {
    setSelectedDate(date)
    setShowFavorites(false)
  }
  
  const handleFilterToggle = (category) => {
    setActiveFilters(prevFilters => 
      prevFilters.includes(category)
        ? prevFilters.filter(c => c !== category)
        : [...prevFilters, category]
    )
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const toggleFavorite = (eventId) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(eventId)
        ? prevFavorites.filter(id => id !== eventId)
        : [...prevFavorites, eventId]
    )
  }

  const toggleShowFavorites = () => {
    setShowFavorites(prev => !prev)
    if (!showFavorites) {
      setActiveFilters([])
      setSearchQuery('')
    }
  }

  return (
    <div className="app-container">
      <Header 
        selectedDate={selectedDate} 
        onDateChange={handleDateChange} 
        categories={allCategories}
        activeFilters={activeFilters}
        onFilterToggle={handleFilterToggle}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        showFavorites={showFavorites}
        onToggleFavorites={toggleShowFavorites}
        favoritesCount={favorites.length}
      />
      <main>
        <Timeline 
          events={filteredEvents} 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        {filteredEvents.length === 0 && (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try selecting a different date, removing filters, or modifying your search</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App