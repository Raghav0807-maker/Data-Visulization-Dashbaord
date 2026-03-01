Chart.defaults.font.family = "'Archivo', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#8B92B5';
Chart.defaults.borderColor = '#1E2749';

Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.enabled = true;
Chart.defaults.plugins.tooltip.backgroundColor = '#0A0E27';
Chart.defaults.plugins.tooltip.titleColor = '#E8ECF5';
Chart.defaults.plugins.tooltip.bodyColor = '#8B92B5';
Chart.defaults.plugins.tooltip.borderColor = '#1E2749';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
Chart.defaults.plugins.tooltip.titleFont = {
    family: "'Inconsolata', monospace",
    size: 11,
    weight: '600'
};
Chart.defaults.plugins.tooltip.bodyFont = {
    family: "'Inconsolata', monospace",
    size: 11
};



const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CATEGORIES = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Beauty'];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRevenueData() {
    const revenue2024 = [];
    const revenue2023 = [];
    let base2024 = 50000;
    let base2023 = 42000;
    
    for (let i = 0; i < 12; i++) {
        base2024 *= 1.05;
        base2023 *= 1.04;
        revenue2024.push(randomInt(base2024 * 0.9, base2024 * 1.1));
        revenue2023.push(randomInt(base2023 * 0.9, base2023 * 1.1));
    }
    
    return { revenue2024, revenue2023 };
}

function generateTrafficData() {
    return {
        labels: ['Organic', 'Paid', 'Social', 'Referral', 'Direct'],
        values: [35, 28, 18, 12, 7],
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#B19CD9']
    };
}

function generateWeeklyActivity() {
    return DAYS.map(() => randomInt(15000, 35000));
}

function generateCategoryData() {
    return {
        labels: CATEGORIES,
        values: CATEGORIES.map(() => randomInt(50000, 200000)),
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#B19CD9']
    };
}

function generateUserGrowth() {
    const growth = [];
    let total = 0;
    
    for (let i = 0; i < 12; i++) {
        total += randomInt(8000, 15000);
        growth.push(total);
    }
    
    return growth;
}


let charts = {};
function createRevenueChart(data) {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    if (charts.revenue) {
        charts.revenue.destroy();
    }
    
    const gradient2024 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2024.addColorStop(0, 'rgba(255, 107, 107, 0.3)');
    gradient2024.addColorStop(1, 'rgba(255, 107, 107, 0)');
    
    const gradient2023 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2023.addColorStop(0, 'rgba(149, 165, 166, 0.2)');
    gradient2023.addColorStop(1, 'rgba(149, 165, 166, 0)');
    
    charts.revenue = new Chart(ctx, {
        type: 'line',
        data: {
            labels: MONTHS,
            datasets: [
                {
                    label: '2023',
                    data: data.revenue2023,
                    borderColor: '#95A5A6',
                    backgroundColor: gradient2023,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#95A5A6',
                    pointHoverBorderColor: '#E8ECF5',
                    pointHoverBorderWidth: 2
                },
                {
                    label: '2024',
                    data: data.revenue2024,
                    borderColor: '#FF6B6B',
                    backgroundColor: gradient2024,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#FF6B6B',
                    pointHoverBorderColor: '#E8ECF5',
                    pointHoverBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286'
                    }
                },
                y: {
                    grid: {
                        color: '#1E2749',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286',
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}


function createTrafficChart(data) {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    
    if (charts.traffic) {
        charts.traffic.destroy();
    }
    
    charts.traffic = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.colors,
                borderColor: '#141B3A',
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#8B92B5',
                        padding: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}


function createActivityChart(data) {
    const ctx = document.getElementById('activityChart').getContext('2d');
    
    if (charts.activity) {
        charts.activity.destroy();
    }
    
    charts.activity = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: DAYS,
            datasets: [{
                label: 'Sessions',
                data: data,
                backgroundColor: '#4ECDC4',
                borderRadius: 4,
                borderSkipped: false,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286'
                    }
                },
                y: {
                    grid: {
                        color: '#1E2749',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286',
                        callback: function(value) {
                            return (value / 1000).toFixed(0) + 'k';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Sessions: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}


function createCategoryChart(data) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (charts.category) {
        charts.category.destroy();
    }
    
    charts.category = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Sales',
                data: data.values,
                backgroundColor: data.colors,
                borderRadius: 4,
                borderSkipped: false,
                barPercentage: 0.7
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#1E2749',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286',
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Sales: $' + context.parsed.x.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}


function createGrowthChart(data) {
    const ctx = document.getElementById('growthChart').getContext('2d');
    
    if (charts.growth) {
        charts.growth.destroy();
    }
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(168, 230, 207, 0.3)');
    gradient.addColorStop(1, 'rgba(168, 230, 207, 0)');
    
    charts.growth = new Chart(ctx, {
        type: 'line',
        data: {
            labels: MONTHS,
            datasets: [{
                label: 'Total Users',
                data: data,
                borderColor: '#A8E6CF',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#A8E6CF',
                pointHoverBorderColor: '#E8ECF5',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286'
                    }
                },
                y: {
                    grid: {
                        color: '#1E2749',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: "'Inconsolata', monospace",
                            size: 11
                        },
                        color: '#5A6286',
                        callback: function(value) {
                            return (value / 1000).toFixed(0) + 'k';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Users: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}



function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
}

function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = 'Last updated: ' + timeString;
}

function initializeCharts() {
    const revenueData = generateRevenueData();
    const trafficData = generateTrafficData();
    const activityData = generateWeeklyActivity();
    const categoryData = generateCategoryData();
    const growthData = generateUserGrowth();
    
    createRevenueChart(revenueData);
    createTrafficChart(trafficData);
    createActivityChart(activityData);
    createCategoryChart(categoryData);
    createGrowthChart(growthData);
    
    updateLastUpdate();
}

function refreshDashboard() {
    initializeCharts();
    
    const btn = document.getElementById('refreshBtn');
    btn.style.transform = 'rotate(360deg)';
    btn.style.transition = 'transform 0.6s ease';
    
    setTimeout(() => {
        btn.style.transform = 'rotate(0deg)';
    }, 600);
}



document.addEventListener('DOMContentLoaded', function() {
    
    initializeCharts();
    
  
    updateClock();
    setInterval(updateClock, 1000);
    
   
    setInterval(refreshDashboard, 60000);
    
    
    document.getElementById('refreshBtn').addEventListener('click', refreshDashboard);
});
