// Config values
// Using direct hue strings to avoid any CSS variable usage
const RAW_COLORS = ['#2A75D3', '#FF5E4D', '#FFAA00', '#4EAA54'];
const DEFAULT_LABELS = ['Attended', 'Absent', 'Seminar / Approval for Overtime Schedule', 'Holiday / Suspended'];
const MONTH_NAMES = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

// App State
let currentDate = new Date(); 
currentDate.setDate(1); // Set to 1st of current month

// Map: ISO Date string (YYYY-MM-DD) -> Color value string
const highlightsMap = new Map();

// Map: Color string -> Label name
const legendLabels = new Map();
RAW_COLORS.forEach((color, i) => {
    legendLabels.set(color, DEFAULT_LABELS[i]);
});

// DOM Elements
const calendarGrid = document.getElementById('calendar-grid');
const monthYearDisplay = document.getElementById('month-year-display');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const legendContainer = document.getElementById('legend-container');
const exportPdfBtn = document.getElementById('export-btn');

// Utility formatting Date -> YYYY-MM-DD
function getISODateString(year, month, day) {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
}

// Handles cycling of day cell highlights
function handleDayClick(dateStr, cellElement) {
    const currentColor = highlightsMap.get(dateStr);
    let nextColor = undefined;
    
    if (currentColor === undefined) {
        nextColor = RAW_COLORS[0];
    } else {
        const idx = RAW_COLORS.indexOf(currentColor);
        if (idx < RAW_COLORS.length - 1) {
            nextColor = RAW_COLORS[idx + 1];
        }
    }
    
    // No transitions/animations, instant change
    if (nextColor) {
        highlightsMap.set(dateStr, nextColor);
        cellElement.style.backgroundColor = nextColor;
    } else {
        highlightsMap.delete(dateStr);
        cellElement.style.backgroundColor = '#fff';
    }
}

// Renders the Calendar View
function renderCalendar() {
    // Clear all previous cells
    calendarGrid.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    monthYearDisplay.textContent = `${MONTH_NAMES[month]} ${year}`;
    
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Render Empty cells for days before start of current month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Render current month days
    for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement('div');
        cell.className = 'day-cell valid-day';
        
        const numLabel = document.createElement('span');
        numLabel.className = 'day-number';
        numLabel.textContent = d;
        
        cell.appendChild(numLabel);
        
        const dateStr = getISODateString(year, month, d);
        
        // Reapply existing highlights if they exist in state Map
        if (highlightsMap.has(dateStr)) {
            cell.style.backgroundColor = highlightsMap.get(dateStr);
        } else {
            cell.style.backgroundColor = '#fff';
        }
        
        // Using AddEventListener (No Inline listeners in HTML)
        cell.addEventListener('click', () => {
            handleDayClick(dateStr, cell);
        });
        
        calendarGrid.appendChild(cell);
    }
}

// Renders Legend Labels and interactions
function renderLegend() {
    legendContainer.innerHTML = '';
    
    RAW_COLORS.forEach(color => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'legend-item';
        
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        
        const labelContainer = document.createElement('div');
        labelContainer.className = 'legend-label';
        labelContainer.textContent = legendLabels.get(color);
        labelContainer.title = "Double-click to edit";
        
        // Double click to edit functionality
        labelContainer.addEventListener('dblclick', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'legend-input';
            input.value = legendLabels.get(color);
            
            const commitLabelChange = () => {
                const newLabelText = input.value.trim() || 'Unlabeled';
                legendLabels.set(color, newLabelText);
                renderLegend(); // Re-render to show updated text
            };
            
            input.addEventListener('blur', commitLabelChange);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });
            
            itemContainer.replaceChild(input, labelContainer);
            input.focus();
            
            // Select all text natively for quick edits
            input.select();
        });
        
        itemContainer.appendChild(swatch);
        itemContainer.appendChild(labelContainer);
        legendContainer.appendChild(itemContainer);
    });
}

// Attach Event Listeners
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Image Export configuration
exportPdfBtn.addEventListener('click', () => {
    const captureArea = document.getElementById('calendar-capture-area');
    
    // Prevent scaling bugs with html2canvas and standard brutalist box-shadow wrapping padding
    html2canvas(captureArea, {
        scale: 2,           // Double resolution for sharp export
        useCORS: true, 
        backgroundColor: '#F5F0E8', // Match background color
    }).then(canvas => {
        const downloadLink = document.createElement('a');
        downloadLink.download = `calendar-export-${new Date().getTime()}.png`;
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.click();
    });
});

// Boot execution
renderLegend();
renderCalendar();
