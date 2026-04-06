// App State
let currentDate = new Date(); 
currentDate.setDate(1); // Set to 1st of current month

// Categories array holding state
const categories = [
    { id: 0, color: '#2A75D3', label: 'Attended' },
    { id: 1, color: '#FF5E4D', label: 'Absent' },
    { id: 2, color: '#FFAA00', label: 'Seminar / Approval for Overtime Schedule' },
    { id: 3, color: '#4EAA54', label: 'Holiday / Suspended' }
];

const MONTH_NAMES = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

// Map: ISO Date string (YYYY-MM-DD) -> category object ID (integer)
const highlightsMap = new Map();

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
    const currentId = highlightsMap.get(dateStr);
    let nextId = undefined;
    
    if (currentId === undefined) {
        nextId = categories[0].id;
    } else {
        const idx = categories.findIndex(c => c.id === currentId);
        if (idx < categories.length - 1) {
            nextId = categories[idx + 1].id;
        }
    }
    
    // No transitions/animations, instant change
    if (nextId !== undefined) {
        highlightsMap.set(dateStr, nextId);
        const color = categories.find(c => c.id === nextId).color;
        cellElement.style.backgroundColor = color;
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
            const catId = highlightsMap.get(dateStr);
            const category = categories.find(c => c.id === catId);
            if(category) {
                cell.style.backgroundColor = category.color;
            } else {
                cell.style.backgroundColor = '#fff';
            }
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
    
    categories.forEach(category => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'legend-item';
        
        // --- Color Swatch Customizer ---
        const swatchWrapper = document.createElement('div');
        swatchWrapper.style.position = 'relative';
        
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = category.color;
        swatch.title = "Click to change color";
        swatch.style.cursor = "pointer";
        
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = category.color;
        colorInput.style.position = 'absolute';
        colorInput.style.opacity = '0';
        colorInput.style.width = '0';
        colorInput.style.height = '0';
        colorInput.style.pointerEvents = 'none';
        
        swatch.addEventListener('click', () => {
            colorInput.click();
        });
        
        colorInput.addEventListener('input', (e) => {
            const newColor = e.target.value;
            category.color = newColor;
            swatch.style.backgroundColor = newColor;
            renderCalendar(); // Instantly update all cells in the grid with this category
        });
        
        swatchWrapper.appendChild(swatch);
        swatchWrapper.appendChild(colorInput);
        
        // --- Editable Label ---
        const labelContainer = document.createElement('div');
        labelContainer.className = 'legend-label';
        labelContainer.textContent = category.label;
        labelContainer.title = "Double-click to edit";
        
        // Double click to edit functionality
        labelContainer.addEventListener('dblclick', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'legend-input';
            input.value = category.label;
            
            const commitLabelChange = () => {
                const newLabelText = input.value.trim() || 'Unlabeled';
                category.label = newLabelText;
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
        
        itemContainer.appendChild(swatchWrapper);
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
