import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/EventCard.css'

function EventCard({ event, position, isFavorite, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false)
  
  const toggleExpand = () => {
    setExpanded(!expanded)
  }
  
  return (
    <motion.div 
      className={`event-card ${position} ${expanded ? 'expanded' : ''}`}
      data-category={event.category.toLowerCase()}
      layout
    >
      <div className="event-year">{event.year}</div>
      
      <button 
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(event.id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? '★' : '☆'}
      </button>
      
      <div className="event-content" onClick={toggleExpand}>
        <h3 className="event-title">{event.title}</h3>
        
        <div className="event-category">
          <span className="category-label">{event.category}</span>
        </div>
        
        {expanded && (
          <motion.div 
            className="event-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="event-description">{event.description}</p>
            
            {event.imageUrl && (
              <div className="event-image-container">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="event-image" 
                />
              </div>
            )}
            
            {event.source && (
              <div className="event-source">
                Source: <span>{event.source}</span>
              </div>
            )}
          </motion.div>
        )}
        
        <button className="expand-button" onClick={toggleExpand} aria-label={expanded ? "Show less" : "Show more"}>
          {expanded ? '▲' : '▼'}
        </button>
      </div>
    </motion.div>
  )
}

export default EventCard