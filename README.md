# 🌤️ IoT Weather Station

**A sophisticated real-time environmental monitoring dashboard simulating an IoT weather station network with advanced data visualization and alert systems.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-4CAF50?style=for-the-badge)](https://william-osei.github.io/iot-weather-station)
[![Repository](https://img.shields.io/badge/📁_Repository-2196F3?style=for-the-badge)](https://github.com/William-osei/iot-weather-station)

![Portfolio Project](https://img.shields.io/badge/Portfolio-Project-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white)
![IoT](https://img.shields.io/badge/IoT-Simulation-green)

## 🌟 Project Overview

This IoT Weather Station Dashboard demonstrates a comprehensive environmental monitoring system that simulates real-world IoT sensor networks. Built with modern web technologies, it provides real-time data visualization, intelligent alerting, and historical analytics for weather and environmental parameters.

## ✨ Key Features

### 🔴 Real-time Sensor Monitoring
- **Live Data Simulation**: Real-time updates every 5 seconds
- **Multiple Sensors**: Temperature, Humidity, Pressure, Wind Speed, UV Index, Air Quality
- **Realistic Variations**: Intelligent data generation with natural fluctuations
- **Sensor Network Status**: Live monitoring of individual sensor nodes

### 📊 Advanced Data Visualization
- **Interactive Charts**: Dynamic line charts with Chart.js integration
- **Historical Trends**: 24-hour historical data tracking
- **Multi-metric Displays**: Overlay multiple environmental parameters
- **Responsive Graphs**: Auto-scaling charts with smooth animations

### 🚨 Intelligent Alert System
- **Threshold Monitoring**: Automatic alerts when parameters exceed safe ranges
- **Alert Categories**: Critical, Warning, and Info level notifications
- **Real-time Notifications**: Instant alerts for environmental hazards
- **Alert History**: Complete log of system notifications

### 🎛️ Modern Dashboard Interface
- **Dark Theme Design**: Professional IoT control room aesthetic
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Animated Elements**: Smooth transitions and hover effects
- **Status Indicators**: Real-time connection and update status

### 🔧 Technical Features
- **Modular Architecture**: Well-organized, maintainable codebase
- **Performance Optimized**: Efficient rendering and data updates
- **Error Handling**: Robust error management and fallbacks
- **Accessibility**: Screen reader friendly and keyboard navigable

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Chart.js for interactive charts
- **Styling**: CSS Custom Properties, CSS Grid, Flexbox
- **Fonts**: Google Fonts (Roboto, Orbitron)
- **Icons**: Font Awesome 6
- **Animation**: CSS3 animations and transitions

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs completely client-side

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/William-osei/iot-weather-station.git
   cd iot-weather-station
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server for the best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Explore the dashboard**
   - Wait for the loading sequence to complete
   - Watch real-time data updates
   - Interact with charts and controls

## 📁 Project Structure

```
iot-weather-station/
├── index.html              # Main application file
├── css/
│   └── style.css          # Complete styling with CSS variables
├── js/
│   └── weather-station.js # Main application logic
├── assets/                # Additional resources (if needed)
└── README.md             # Project documentation
```

## 🎯 Features in Detail

### Environmental Sensors

| Sensor | Range | Unit | Alert Thresholds |
|--------|-------|------|------------------|
| **Temperature** | 18-35°C | °C | < 15°C or > 40°C |
| **Humidity** | 30-90% | % | > 95% |
| **Pressure** | 995-1025 | hPa | < 990 or > 1030 hPa |
| **Wind Speed** | 0-25 | km/h | > 30 km/h |
| **UV Index** | 0-11 | Index | > 8 |
| **Air Quality** | 0-300 | AQI | > 150 |

### Dashboard Sections

1. **Main Weather Display**
   - Large temperature reading with weather condition
   - Dynamic weather icons based on current conditions
   - Location and timestamp information

2. **Sensor Metrics Grid**
   - Six detailed metric cards with trends
   - Visual indicators for data changes
   - Color-coded status indicators

3. **Historical Charts**
   - Temperature trend over 24 hours
   - Multi-metric environmental overview
   - Interactive time range selection

4. **Alert Management**
   - Real-time alert notifications
   - Alert severity classification
   - Sensor-specific alert details

5. **Sensor Network Status**
   - Individual sensor node monitoring
   - Connection status indicators
   - Maintenance scheduling display

## 🔧 Customization

### Modifying Sensor Parameters

Edit the `CONFIG` object in `js/weather-station.js`:

```javascript
const CONFIG = {
    updateInterval: 5000,        // Update frequency
    sensors: {
        temperature: { min: 18, max: 35, unit: '°C' },
        // Add or modify sensors
    },
    alerts: {
        temperature: { min: 15, max: 40 },
        // Customize alert thresholds
    }
};
```

### Styling Customization

Modify CSS custom properties in `css/style.css`:

```css
:root {
    --primary-blue: #0066cc;     /* Primary color */
    --accent-green: #00cc66;     /* Accent color */
    --background-dark: #0a0e1a;  /* Background */
    /* Customize theme colors */
}
```

## 📱 Responsive Design

- **Desktop**: Full dashboard with all features
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Stacked layout with simplified navigation
- **Print**: Clean, printer-friendly styles

## 🔮 Future Enhancements

- [ ] **Real IoT Integration**: Connect to actual sensor hardware
- [ ] **Historical Database**: Store long-term environmental data
- [ ] **Weather API Integration**: Combine with real weather services
- [ ] **Machine Learning**: Predictive analytics for weather patterns
- [ ] **Export Functionality**: PDF reports and CSV data export
- [ ] **User Accounts**: Personalized dashboards and preferences
- [ ] **Geolocation**: Multiple weather station locations
- [ ] **Mobile App**: Native mobile application
- [ ] **Voice Alerts**: Audio notifications for critical alerts
- [ ] **Smart Home Integration**: Connect with home automation systems

## 🎯 Learning Outcomes

This project demonstrates proficiency in:

✅ **Frontend Development**
- Advanced CSS with custom properties and modern layouts
- JavaScript ES6+ features and async programming
- Real-time data handling and visualization

✅ **IoT Concepts**
- Sensor network simulation
- Real-time monitoring systems
- Alert and notification systems

✅ **Data Visualization**
- Chart.js integration and customization
- Real-time chart updates
- Interactive data exploration

✅ **User Experience Design**
- Responsive and accessible design
- Professional dashboard interfaces
- Intuitive navigation and controls

## 🔧 Technical Implementation

### Real-time Data Simulation
- Realistic sensor value generation with natural variations
- Time-based historical data creation
- Intelligent alert threshold monitoring

### Performance Optimization
- Efficient DOM manipulation
- Optimized chart rendering
- Memory-conscious data management

### Modern JavaScript Features
- ES6+ modules and arrow functions
- Async/await patterns
- Object destructuring and spread operators

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About the Developer

**William Osei Aborah**
- 🎓 Computer Engineering Student at KNUST, Ghana
- 💼 Bloomberg Accelerator Intern
- 🌟 Passionate Full-Stack Developer with IoT Interest

### Connect with me:
- 🌐 [Portfolio](https://william-osei.github.io/portfolio)
- 💼 [LinkedIn](https://linkedin.com/in/william-osei)
- 📧 [Email](mailto:trickskidwilliam@gmail.com)
- 🐙 [GitHub](https://github.com/William-osei)

---

## 🏆 Project Highlights

- **Real-time Simulation**: Sophisticated environmental data modeling
- **Professional UI**: Dark theme with modern IoT dashboard design
- **Interactive Charts**: Dynamic data visualization with Chart.js
- **Alert System**: Intelligent threshold monitoring and notifications
- **Responsive Design**: Works seamlessly across all devices
- **Performance**: Optimized for smooth real-time updates

---

⭐️ **If you found this project interesting, please consider giving it a star!**

*Built with passion for IoT technology and environmental monitoring by William Osei* 🌍

## 📊 Demo Features

Try these features when exploring the dashboard:

1. **Watch Real-time Updates**: Observe how sensor values change naturally over time
2. **Trigger Alerts**: Wait for environmental parameters to exceed thresholds
3. **Explore Charts**: Interact with the historical data visualization
4. **Responsive Testing**: Resize your browser to see the responsive design
5. **Sensor Network**: Check the status of individual sensor nodes

*Experience the future of environmental monitoring technology!* 🚀

