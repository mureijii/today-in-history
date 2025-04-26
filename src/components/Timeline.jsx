import { motion } from 'framer-motion'
import EventCard from './EventCard'
import '../styles/Timeline.css'

function Timeline({ events, favorites, onToggleFavorite }) {
  // Sort events by year (oldest to newest)
  const sortedEvents = [...events].sort((a, b) => a.year - b.year)
  
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      
      {sortedEvents.map((event, index) => (
        <motion.div
          key={event.id}
          className="timeline-item"
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="timeline-marker"></div>
          <EventCard 
            event={event} 
            position={index % 2 === 0 ? 'left' : 'right'} 
            isFavorite={favorites.includes(event.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default Timeline