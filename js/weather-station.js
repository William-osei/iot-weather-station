/**
 * IoT Weather Station Dashboard
 * Real-time environmental monitoring system simulation
 * Author: William Osei
 */

// ===== GLOBAL VARIABLES AND CONFIG =====

const CONFIG = {
    updateInterval: 5000, // Update every 5 seconds
    chartUpdateInterval: 30000, // Update charts every 30 seconds
    maxDataPoints: 24, // Maximum data points for charts
    location: 'Kumasi, Ghana',
    sensors: {
        temperature: { min: 18, max: 35, unit: '°C' },
        humidity: { min: 30, max: 90, unit: '%' },
        pressure: { min: 995, max: 1025, unit: 'hPa' },
        windSpeed: { min: 0, max: 25, unit: 'km/h' },
        uvIndex: { min: 0, max: 11, unit: '' },
        airQuality: { min: 0, max: 300, unit: 'AQI' }
    },
    alerts: {
        temperature: { min: 15, max: 40 },
        humidity: { min: 20, max: 95 },
        pressure: { min: 990, max: 1030 },
        windSpeed: { max: 30 },
        uvIndex: { max: 8 },
        airQuality: { max: 150 }
    }
};

// Global state
let weatherData = {
    current: {},
    historical: [],
    alerts: [],
    sensors: {},
    charts: {}
};

let updateIntervals = {};
let currentTimeRange = '24h';

// ===== UTILITY FUNCTIONS =====

/**
 * Generate random number within range
 */
function randomInRange(min, max, decimals = 1) {
    const value = Math.random() * (max - min) + min;
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Add variance to existing value
 */
function addVariance(currentValue, variance = 0.1, min, max) {
    const change = (Math.random() - 0.5) * 2 * variance * currentValue;
    const newValue = currentValue + change;
    return Math.max(min, Math.min(max, newValue));
}

/**
 * Format time for display
 */
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Format date for display
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Get weather condition based on temperature and other factors
 */
function getWeatherCondition(temp, humidity, pressure) {
    if (temp > 30 && humidity < 50) return { condition: 'Sunny', icon: 'fas fa-sun' };
    if (temp > 25 && humidity < 70) return { condition: 'Partly Cloudy', icon: 'fas fa-cloud-sun' };
    if (humidity > 80) return { condition: 'Rainy', icon: 'fas fa-cloud-rain' };
    if (pressure < 1000) return { condition: 'Stormy', icon: 'fas fa-bolt' };
    if (temp < 20) return { condition: 'Cool', icon: 'fas fa-cloud' };
    return { condition: 'Cloudy', icon: 'fas fa-cloud' };
}

/**
 * Get UV Index description
 */
function getUVDescription(uvIndex) {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
}

/**
 * Get Air Quality description
 */
function getAQIDescription(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// ===== DATA GENERATION =====

/**
 * Initialize weather data with realistic values
 */
function initializeWeatherData() {
    const now = new Date();
    
    // Initialize current readings
    weatherData.current = {
        temperature: randomInRange(CONFIG.sensors.temperature.min, CONFIG.sensors.temperature.max),
        humidity: randomInRange(CONFIG.sensors.humidity.min, CONFIG.sensors.humidity.max),
        pressure: randomInRange(CONFIG.sensors.pressure.min, CONFIG.sensors.pressure.max),
        windSpeed: randomInRange(CONFIG.sensors.windSpeed.min, CONFIG.sensors.windSpeed.max),
        uvIndex: randomInRange(CONFIG.sensors.uvIndex.min, CONFIG.sensors.uvIndex.max),
        airQuality: randomInRange(CONFIG.sensors.airQuality.min, CONFIG.sensors.airQuality.max),
        timestamp: now
    };
    
    // Generate historical data for charts
    generateHistoricalData();
    
    // Initialize alerts
    checkAndGenerateAlerts();
    
    console.log('Weather data initialized:', weatherData);
}

/**
 * Generate historical data for charts
 */
function generateHistoricalData() {
    const now = new Date();
    const dataPoints = CONFIG.maxDataPoints;
    
    weatherData.historical = [];
    
    for (let i = dataPoints - 1; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000)); // Hours ago
        
        const dataPoint = {
            timestamp,
            temperature: randomInRange(CONFIG.sensors.temperature.min, CONFIG.sensors.temperature.max),
            humidity: randomInRange(CONFIG.sensors.humidity.min, CONFIG.sensors.humidity.max),
            pressure: randomInRange(CONFIG.sensors.pressure.min, CONFIG.sensors.pressure.max),
            windSpeed: randomInRange(CONFIG.sensors.windSpeed.min, CONFIG.sensors.windSpeed.max),
            uvIndex: randomInRange(CONFIG.sensors.uvIndex.min, CONFIG.sensors.uvIndex.max),
            airQuality: randomInRange(CONFIG.sensors.airQuality.min, CONFIG.sensors.airQuality.max)
        };
        
        weatherData.historical.push(dataPoint);
    }
}

/**
 * Update current weather data with realistic variations
 */
function updateWeatherData() {
    const sensors = CONFIG.sensors;
    const current = weatherData.current;
    
    // Update with small variations
    current.temperature = addVariance(
        current.temperature, 0.05, 
        sensors.temperature.min, sensors.temperature.max
    );
    
    current.humidity = addVariance(
        current.humidity, 0.03, 
        sensors.humidity.min, sensors.humidity.max
    );
    
    current.pressure = addVariance(
        current.pressure, 0.002, 
        sensors.pressure.min, sensors.pressure.max
    );
    
    current.windSpeed = addVariance(
        current.windSpeed, 0.1, 
        sensors.windSpeed.min, sensors.windSpeed.max
    );
    
    current.uvIndex = addVariance(
        current.uvIndex, 0.05, 
        sensors.uvIndex.min, sensors.uvIndex.max
    );
    
    current.airQuality = addVariance(
        current.airQuality, 0.02, 
        sensors.airQuality.min, sensors.airQuality.max
    );
    
    current.timestamp = new Date();
    
    // Update historical data
    weatherData.historical.push({ ...current });
    if (weatherData.historical.length > CONFIG.maxDataPoints) {
        weatherData.historical.shift();
    }
    
    // Check for new alerts
    checkAndGenerateAlerts();
    
    console.log('Weather data updated:', current);
}

// ===== ALERT SYSTEM =====

/**
 * Check current readings and generate alerts if needed
 */
function checkAndGenerateAlerts() {
    const current = weatherData.current;
    const alerts = CONFIG.alerts;
    const newAlerts = [];
    
    // Temperature alerts
    if (current.temperature < alerts.temperature.min) {
        newAlerts.push({
            id: 'temp-low',
            type: 'warning',
            title: 'Low Temperature Alert',
            message: `Temperature has dropped to ${current.temperature}°C`,
            timestamp: new Date(),
            sensor: 'Temperature Sensor'
        });
    } else if (current.temperature > alerts.temperature.max) {
        newAlerts.push({
            id: 'temp-high',
            type: 'critical',
            title: 'High Temperature Alert',
            message: `Temperature has risen to ${current.temperature}°C`,
            timestamp: new Date(),
            sensor: 'Temperature Sensor'
        });
    }
    
    // Humidity alerts
    if (current.humidity > alerts.humidity.max) {
        newAlerts.push({
            id: 'humidity-high',
            type: 'warning',
            title: 'High Humidity Alert',
            message: `Humidity level at ${current.humidity}%`,
            timestamp: new Date(),
            sensor: 'Humidity Sensor'
        });
    }
    
    // Wind speed alerts
    if (current.windSpeed > alerts.windSpeed.max) {
        newAlerts.push({
            id: 'wind-high',
            type: 'critical',
            title: 'High Wind Speed Alert',
            message: `Wind speed reached ${current.windSpeed} km/h`,
            timestamp: new Date(),
            sensor: 'Wind Sensor'
        });
    }
    
    // UV Index alerts
    if (current.uvIndex > alerts.uvIndex.max) {
        newAlerts.push({
            id: 'uv-high',
            type: 'warning',
            title: 'High UV Index Alert',
            message: `UV Index at dangerous level: ${current.uvIndex}`,
            timestamp: new Date(),
            sensor: 'UV Sensor'
        });
    }
    
    // Air quality alerts
    if (current.airQuality > alerts.airQuality.max) {
        newAlerts.push({
            id: 'aqi-high',
            type: 'critical',
            title: 'Poor Air Quality Alert',
            message: `Air Quality Index: ${current.airQuality} - ${getAQIDescription(current.airQuality)}`,
            timestamp: new Date(),
            sensor: 'Air Quality Sensor'
        });
    }
    
    // Add new alerts to the beginning of the array
    weatherData.alerts = [...newAlerts, ...weatherData.alerts.slice(0, 10)];
}

// ===== UI UPDATE FUNCTIONS =====

/**
 * Update the main weather display
 */
function updateMainWeatherDisplay() {
    const current = weatherData.current;
    const weather = getWeatherCondition(current.temperature, current.humidity, current.pressure);
    
    // Update main temperature
    document.getElementById('current-temp').textContent = Math.round(current.temperature);
    
    // Update weather condition and icon
    document.getElementById('weather-condition').textContent = weather.condition;
    document.getElementById('weather-icon').className = weather.icon;
    
    // Update current time
    document.getElementById('current-time').textContent = formatTime(new Date());
    
    // Update last update time
    document.getElementById('last-update').querySelector('span').textContent = 'Just now';
}

/**
 * Update metric cards
 */
function updateMetricCards() {
    const current = weatherData.current;
    
    // Temperature
    document.getElementById('temp-metric').textContent = current.temperature.toFixed(1);
    
    // Humidity
    document.getElementById('humidity-metric').textContent = Math.round(current.humidity);
    
    // Pressure
    document.getElementById('pressure-metric').textContent = Math.round(current.pressure);
    
    // Wind Speed
    document.getElementById('wind-metric').textContent = Math.round(current.windSpeed);
    
    // UV Index
    document.getElementById('uv-metric').textContent = Math.round(current.uvIndex);
    document.querySelector('#uv-metric').nextElementSibling.textContent = getUVDescription(current.uvIndex);
    
    // Air Quality
    document.getElementById('aqi-metric').textContent = Math.round(current.airQuality);
    document.querySelector('#aqi-metric').nextElementSibling.textContent = getAQIDescription(current.airQuality);
}

/**
 * Update alerts display
 */
function updateAlertsDisplay() {
    const alertsContainer = document.getElementById('alerts-container');
    const alertCount = document.getElementById('alert-count');
    
    // Update alert count
    alertCount.textContent = weatherData.alerts.length;
    
    // Clear existing alerts
    alertsContainer.innerHTML = '';
    
    // Add alerts or show no alerts message
    if (weatherData.alerts.length === 0) {
        alertsContainer.innerHTML = `
            <div class="alert-item info">
                <div class="alert-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="alert-content">
                    <h4>All Systems Normal</h4>
                    <p>No active alerts. All sensors are operating within normal parameters.</p>
                    <div class="alert-time">${formatTime(new Date())}</div>
                </div>
            </div>
        `;
    } else {
        weatherData.alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `alert-item ${alert.type}`;
            alertElement.innerHTML = `
                <div class="alert-icon">
                    <i class="fas fa-${
                        alert.type === 'critical' ? 'exclamation-triangle' : 
                        alert.type === 'warning' ? 'exclamation-circle' : 'info-circle'
                    }"></i>
                </div>
                <div class="alert-content">
                    <h4>${alert.title}</h4>
                    <p>${alert.message}</p>
                    <div class="alert-time">Sensor: ${alert.sensor} • ${formatTime(alert.timestamp)}</div>
                </div>
            `;
            alertsContainer.appendChild(alertElement);
        });
    }
}

// ===== CHART FUNCTIONS =====

/**
 * Initialize charts
 */
function initializeCharts() {
    initializeTemperatureChart();
    initializeMultiMetricChart();
}

/**
 * Initialize temperature chart
 */
function initializeTemperatureChart() {
    const ctx = document.getElementById('temperature-chart').getContext('2d');
    
    weatherData.charts.temperature = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                borderColor: '#66b2ff',
                backgroundColor: 'rgba(102, 178, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#66b2ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b8c5d6',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b8c5d6'
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#66b2ff'
                }
            }
        }
    });
}

/**
 * Initialize multi-metric chart
 */
function initializeMultiMetricChart() {
    const ctx = document.getElementById('multi-metric-chart').getContext('2d');
    
    weatherData.charts.multiMetric = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Humidity (%)',
                    data: [],
                    borderColor: '#00cc66',
                    backgroundColor: 'rgba(0, 204, 102, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Pressure (hPa)',
                    data: [],
                    borderColor: '#ff8800',
                    backgroundColor: 'rgba(255, 136, 0, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y1'
                },
                {
                    label: 'Wind Speed (km/h)',
                    data: [],
                    borderColor: '#8800cc',
                    backgroundColor: 'rgba(136, 0, 204, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y2'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#b8c5d6',
                        usePointStyle: true
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b8c5d6',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#00cc66'
                    }
                },
                y1: {
                    type: 'linear',
                    display: false,
                    position: 'right'
                },
                y2: {
                    type: 'linear',
                    display: false,
                    position: 'right'
                }
            }
        }
    });
}

/**
 * Update charts with current data
 */
function updateCharts() {
    const historical = weatherData.historical;
    
    // Prepare labels
    const labels = historical.map(point => formatTime(point.timestamp));
    
    // Update temperature chart
    if (weatherData.charts.temperature) {
        weatherData.charts.temperature.data.labels = labels;
        weatherData.charts.temperature.data.datasets[0].data = historical.map(point => point.temperature);
        weatherData.charts.temperature.update();
    }
    
    // Update multi-metric chart
    if (weatherData.charts.multiMetric) {
        weatherData.charts.multiMetric.data.labels = labels;
        weatherData.charts.multiMetric.data.datasets[0].data = historical.map(point => point.humidity);
        weatherData.charts.multiMetric.data.datasets[1].data = historical.map(point => point.pressure);
        weatherData.charts.multiMetric.data.datasets[2].data = historical.map(point => point.windSpeed);
        weatherData.charts.multiMetric.update();
    }
}

// ===== EVENT HANDLERS =====

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Time range selector
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTimeRange = e.target.dataset.range;
            // In a real app, this would fetch different data ranges
            console.log('Time range changed to:', currentTimeRange);
        });
    });
    
    // Chart metric buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.target.closest('.chart-options');
            parent.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const metric = e.target.dataset.metric;
            console.log('Chart metric changed to:', metric);
        });
    });
}

// ===== LOADING AND INITIALIZATION =====

/**
 * Show loading screen
 */
function showLoadingScreen() {
    document.getElementById('loading-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }, 2000);
}

/**
 * Start real-time updates
 */
function startRealTimeUpdates() {
    // Update sensor data every 5 seconds
    updateIntervals.data = setInterval(() => {
        updateWeatherData();
        updateMainWeatherDisplay();
        updateMetricCards();
        updateAlertsDisplay();
    }, CONFIG.updateInterval);
    
    // Update charts every 30 seconds
    updateIntervals.charts = setInterval(() => {
        updateCharts();
    }, CONFIG.chartUpdateInterval);
    
    console.log('Real-time updates started');
}

/**
 * Stop real-time updates
 */
function stopRealTimeUpdates() {
    Object.values(updateIntervals).forEach(interval => clearInterval(interval));
    updateIntervals = {};
    console.log('Real-time updates stopped');
}

/**
 * Initialize the weather station application
 */
function initializeApp() {
    console.log('Initializing IoT Weather Station...');
    
    // Show loading screen
    showLoadingScreen();
    
    // Initialize data
    initializeWeatherData();
    
    // Setup UI
    setTimeout(() => {
        initializeCharts();
        updateMainWeatherDisplay();
        updateMetricCards();
        updateAlertsDisplay();
        updateCharts();
        setupEventListeners();
        
        // Hide loading screen
        hideLoadingScreen();
        
        // Start real-time updates
        setTimeout(() => {
            startRealTimeUpdates();
        }, 3000);
        
        console.log('IoT Weather Station initialized successfully!');
    }, 1000);
}

// ===== APPLICATION STARTUP =====

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopRealTimeUpdates();
    } else {
        startRealTimeUpdates();
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    stopRealTimeUpdates();
});

// Export for debugging
window.weatherStation = {
    data: weatherData,
    config: CONFIG,
    functions: {
        updateData: updateWeatherData,
        updateDisplay: updateMainWeatherDisplay,
        updateCharts: updateCharts
    }
};

