import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import RoomShowcase from './components/RoomShowcase';
import ChatBot from './components/chatbot';
import './styles/App.css';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrefill, setChatPrefill] = useState('');

  return (
    <div className="app">
      <HeroSection />
      <RoomShowcase
        onBookRoom={room => {
          setChatPrefill(`Book a ${room.name}`);
          setChatOpen(true);
        }}
      />

      {/* Features strip */}
      <section className="features-strip">
        <div className="feature">
          <span className="feature-icon">🤖</span>
          <div>
            <div className="feature-title">AI-Powered Booking</div>
            <div className="feature-sub">Amazon Lex chatbot — just type naturally</div>
          </div>
        </div>
        <div className="feature">
          <span className="feature-icon">⚡</span>
          <div>
            <div className="feature-title">Instant Confirmation</div>
            <div className="feature-sub">Email sent the moment you book</div>
          </div>
        </div>
        <div className="feature">
          <span className="feature-icon">🔒</span>
          <div>
            <div className="feature-title">Secure & Serverless</div>
            <div className="feature-sub">Built on AWS Lambda + DynamoDB</div>
          </div>
        </div>
        <div className="feature">
          <span className="feature-icon">📱</span>
          <div>
            <div className="feature-title">24/7 Concierge</div>
            <div className="feature-sub">Always available, never on hold</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">🏨 LuxeStay Hotels</div>
        <div className="footer-tech">
          Powered by Amazon Lex · AWS Lambda · DynamoDB · SNS · SES
        </div>
        <div className="footer-copy">
          Built by Yashaswini · IIT Dharwad · Cloud Computing Major Project
        </div>
      </footer>

      {/* Floating chatbot — always visible */}
      <ChatBot
        isOpen={chatOpen}
        setIsOpen={setChatOpen}
        prefillMessage={chatPrefill}
        onClearPrefill={() => setChatPrefill('')}
      />
    </div>
  );
}