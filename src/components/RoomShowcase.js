import React, { useState } from 'react';

const ROOMS = [
  {
    id: 'classic',
    emoji: '🛏️',
    imageUrl: 'https://media.designcafe.com/wp-content/uploads/2021/11/22184448/classic-bedroom-furniture.jpg',
    name: 'Classic Room',
    price: 3500,
    size: '280 sq ft',
    guests: 2,
    badge: 'Most Popular',
    badgeColor: '#2563eb',
    desc: 'Elegantly furnished queen bed room with city views. Perfect for solo travelers and couples seeking comfort.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Room Service'],
  },
  {
    id: 'deluxe',
    emoji: '🌟',
    imageUrl: 'https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Deluxe%20Room_1920x950.webp',
    name: 'Deluxe Room',
    price: 5500,
    size: '380 sq ft',
    guests: 2,
    badge: 'Best Value',
    badgeColor: '#16a34a',
    desc: 'Premium king bed with upgraded amenities, a sitting area, and panoramic city views.',
    amenities: ['Free WiFi', 'Minibar', 'Spa Access', 'Bathrobe & Slippers'],
  },
  {
    id: 'duplex',
    emoji: '🏢',
    imageUrl: 'https://www.theholidayvilla.in/images/duplex/1.jpg',
    name: 'Duplex Suite',
    price: 8500,
    size: '650 sq ft',
    guests: 4,
    badge: 'Premium',
    badgeColor: '#9333ea',
    desc: 'A stunning two-floor suite with a private living room, dining area, and king bedroom.',
    amenities: ['Butler Service', 'Private Pool Access', 'Lounge Access', 'Airport Transfer'],
  },
  {
    id: 'penthouse',
    emoji: '👑',
    imageUrl: 'https://www.thewilliamvale.com/wp-content/uploads/sites/2/2025/08/The-William-Vale-_-Vale-Garden-Residence-5.jpg',
    name: 'Penthouse',
    price: 15000,
    size: '1200 sq ft',
    guests: 4,
    badge: 'Luxury',
    badgeColor: '#c9a84c',
    desc: 'Our crown jewel. Panoramic 360° views, private terrace, personal chef, and limousine service.',
    amenities: ['Personal Chef', 'Limo Transfer', 'Private Concierge', 'Rooftop Terrace'],
  },
  {
    id: 'family',
    emoji: '👨‍👩‍👧',
    imageUrl: 'https://image-tc.galaxy.tf/wijpeg-aqolumwjs8hakl6ryslaxcb3s/family-suite-3-2023_standard.jpg?crop=112%2C0%2C1777%2C1333',
    name: 'Family Suite',
    price: 7000,
    size: '520 sq ft',
    guests: 6,
    badge: 'Family Pick',
    badgeColor: '#ea580c',
    desc: 'Two cozy bedrooms, a kitchenette, and a large living area — everything your family needs.',
    amenities: ['Kids Club Access', 'Kitchenette', 'Two Bedrooms', 'Baby Cot Available'],
  },
  {
    id: 'studio',
    emoji: '💼',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/6515909b256ab600680bca5e/d113bb29-1a6a-4b71-a9bc-b0e592b1dfc4/studioLiving1-904.jpg',
    name: 'Business Studio',
    price: 4500,
    size: '300 sq ft',
    guests: 1,
    badge: 'Work-Ready',
    badgeColor: '#0891b2',
    desc: 'Designed for the modern professional — high-speed WiFi, ergonomic desk, and express services.',
    amenities: ['10 Gbps WiFi', 'Ergonomic Desk', 'Meeting Room Access', 'Express Laundry'],
  },
];

export default function RoomShowcase({ onBookRoom }) {
  const [active, setActive] = useState(null);

  const openModal = (room) => setActive(room);
  const closeModal = () => setActive(null);

  return (
    <section id="rooms" className="rooms-section">
      <div className="rooms-header">
        <div className="section-eyebrow">Our Accommodations</div>
        <h2 className="section-title">Choose Your Perfect Stay</h2>
        <p className="section-subtitle">
          From cozy classics to opulent penthouses — every room crafted to perfection.
        </p>
      </div>

      <div className="rooms-grid">
        {ROOMS.map(room => (
          <div key={room.id} className="room-card" onClick={() => openModal(room)}>
            <div className="room-card-emoji">
              {room.imageUrl ? (
                <img src={room.imageUrl} alt={room.name} />
              ) : (
                room.emoji
              )}
            </div>
            <div
              className="room-badge"
              style={{ background: room.badgeColor }}
            >
              {room.badge}
            </div>
            <div className="room-card-body">
              <h3 className="room-name">{room.name}</h3>
              <p className="room-desc">{room.desc}</p>
              <div className="room-meta">
                <span>📐 {room.size}</span>
                <span>👥 Up to {room.guests}</span>
              </div>
              <div className="room-footer">
                <div className="room-price">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">{room.price.toLocaleString('en-IN')}</span>
                  <span className="price-unit">/night</span>
                </div>
                <button className="btn-book-room">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-emoji">
              {active.imageUrl ? (
                <img src={active.imageUrl} alt={active.name} />
              ) : (
                active.emoji
              )}
            </div>
            <div
              className="room-badge modal-badge"
              style={{ background: active.badgeColor }}
            >
              {active.badge}
            </div>
            <h2 className="modal-title">{active.name}</h2>
            <p className="modal-desc">{active.desc}</p>
            <div className="modal-meta">
              <span>📐 {active.size}</span>
              <span>👥 Up to {active.guests} guests</span>
            </div>
            <div className="modal-amenities">
              {active.amenities.map(a => (
                <span key={a} className="amenity-tag">✓ {a}</span>
              ))}
            </div>
            <div className="modal-footer">
              <div className="room-price">
                <span className="price-currency">₹</span>
                <span className="price-amount">{active.price.toLocaleString('en-IN')}</span>
                <span className="price-unit">/night</span>
              </div>
              <button
                className="btn-primary"
                onClick={() => {
                  closeModal();
                  if (typeof onBookRoom === 'function') {
                    onBookRoom(active);
                  }
                }}
              >
                Book This Room
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}