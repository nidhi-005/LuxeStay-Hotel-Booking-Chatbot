# 🏨 LuxeStay Hotel Booking Chatbot

LuxeStay is a full-stack serverless hotel booking application that allows users to explore luxury rooms and interact with an AI-powered chatbot to make and manage reservations. The application is hosted on AWS and integrates multiple cloud services to provide a real-world hotel booking experience.

## 🚀 Live Demo

🌐 Website: https://d38qxfq766jrye.cloudfront.net

---

## ✨ Features

### 🏨 Hotel Website
- Responsive React-based hotel booking interface
- Explore multiple room categories:
  - Classic Room
  - Deluxe Room
  - Duplex Suite
  - Family Suite
  - Penthouse Suite
  - Business Studio
- Detailed room descriptions, amenities, pricing, and images

### 🤖 AI Concierge Chatbot
- Conversational hotel booking experience using Amazon Lex V2
- Book hotel rooms interactively
- Cancel existing bookings
- View available room types
- Smart slot-filling for:
  - Guest Name
  - Room Type
  - Check-In Date
  - Check-Out Date
  - Number of Guests

### 📅 Booking Management
- Prevents overbooking by checking room capacity and availability
- Stores booking details securely
- Provides booking confirmations

### 📧 Notifications
- Sends email confirmations using Amazon SES
- Sends administrative alerts using Amazon SNS

---

## 🏗️ Architecture

```text
User Browser
      ↓
React Frontend (Amazon S3 + CloudFront)
      ↓
Amazon Cognito Identity Pool
      ↓
Amazon Lex V2 (LuxeStayBot)
      ↓
AWS Lambda (HotelBookingHandler)
      ↓
┌────────────┬─────────────┬────────────┐
│ DynamoDB   │ Amazon SES │ Amazon SNS │
│ Bookings   │ Email      │ Alerts     │
└────────────┴─────────────┴────────────┘
```

---

## ☁️ AWS Services Used

| Service | Purpose |
|---------|----------|
| Amazon S3 | Static website hosting |
| Amazon CloudFront | CDN and HTTPS delivery |
| Amazon Lex V2 | Conversational chatbot |
| Amazon Cognito | Guest authentication and temporary AWS credentials |
| AWS Lambda | Booking logic and fulfillment |
| Amazon DynamoDB | Booking storage |
| Amazon SES | Booking confirmation emails |
| Amazon SNS | Administrative notifications |

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript (ES6)

### Cloud & Backend
- Amazon Lex V2
- AWS Lambda (Python)
- Amazon DynamoDB
- Amazon Cognito
- Amazon SES
- Amazon SNS
- Amazon S3
- Amazon CloudFront

---

## 📂 Project Structure

```text
luxestay-frontend/
│
├── public/
├── src/
│   ├── components/
│   │   ├── chatbot.js
│   │   ├── HeroSection.js
│   │   └── RoomShowcase.js
│   │
│   ├── styles/
│   │   ├── App.css
│   │   └── chatbot.css
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone https://github.com/nidhi-005/LuxeStay-Hotel-Booking-Chatbot.git
cd LuxeStay-Hotel-Booking-Chatbot/luxestay-frontend
```

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm start
```

Application will run on:

```text
http://localhost:3000
```

### Build Production Version

```bash
npm run build
```

---

## 📸 Screenshots

### Home Page
- Luxury hotel landing page
- Room showcase cards
- Responsive design

### AI Chatbot
- Hotel booking conversation
- Room recommendations
- Booking confirmations

---

## 🎯 Learning Outcomes

This project demonstrates:

- Building conversational interfaces using Amazon Lex V2
- Implementing serverless architectures on AWS
- Integrating multiple AWS services
- Secure authentication using Amazon Cognito
- Hosting React applications on S3 and CloudFront
- Designing scalable cloud-native applications

---

## 👩‍💻 Author

**Yashaswini L**  
B.Tech Computer Science and Engineering  
Indian Institute of Technology Dharwad

GitHub: https://github.com/nidhi-005

---

## 📜 License

This project is developed for educational and learning purposes.
