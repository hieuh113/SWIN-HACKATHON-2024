let currentDate = new Date();
let events = {};
let currentEvent = null;

const calendarGrid = document.getElementById('calendar-grid');
const currentMonthYear = document.getElementById('current-month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const modal = document.getElementById('event-modal');
const closeModalBtn = document.querySelector('.close-btn');
const cancelEventBtn = document.getElementById('cancel-event');
const eventForm = document.getElementById('event-form');
const saveEventBtn = document.getElementById('save-event');

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    currentMonthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    calendarGrid.innerHTML = '';

    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarGrid.appendChild(createDayElement());
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dayElement = createDayElement(day, date);
        calendarGrid.appendChild(dayElement);

        const dateString = formatDate(date);
        if (events[dateString]) {
            events[dateString].forEach(event => {
                const eventElement = createEventElement(event);
                dayElement.appendChild(eventElement);
            });
        }

        const addEventBtn = document.createElement('button');
        addEventBtn.textContent = '+';
        addEventBtn.className = 'add-event-btn';
        addEventBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(date);
        });
        dayElement.appendChild(addEventBtn);
    }

    const remainingCells = 42 - calendarGrid.children.length;
    for (let i = 0; i < remainingCells; i++) {
        calendarGrid.appendChild(createDayElement());
    }
}

function createDayElement(day, date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (day) {
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        if (date.toDateString() === new Date().toDateString()) {
            dayElement.classList.add('current-day');
        }

        dayElement.addEventListener('click', () => openModal(date));
    }

    return dayElement;
}

function createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    eventElement.textContent = `${event.title} (${event.startTime})`;
    eventElement.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(new Date(event.date), event);
    });
    return eventElement;
}

function openModal(date, event = null) {
    currentEvent = event;
    modal.style.display = 'block';
    document.getElementById('event-date').value = formatDate(date);
    
    // Remove any existing delete button
    const existingDeleteBtn = document.querySelector('.btn-danger');
    if (existingDeleteBtn) {
        existingDeleteBtn.remove();
    }
    
    if (event) {
        document.getElementById('event-name').value = event.title;
        const [time, period] = event.startTime.split(' ');
        const [hour, minute] = time.split(':');
        document.getElementById('event-hour').value = parseInt(hour);
        document.getElementById('event-minute').value = minute;
        document.getElementById('event-ampm').value = period;
        document.getElementById('event-description').value = event.description;
        saveEventBtn.textContent = 'Update';
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.addEventListener('click', deleteEvent);
        document.querySelector('.modal-footer').appendChild(deleteBtn);
    } else {
        document.getElementById('event-name').value = '';
        document.getElementById('event-hour').value = '';
        document.getElementById('event-minute').value = '';
        document.getElementById('event-ampm').value = 'AM';
        document.getElementById('event-description').value = '';
        saveEventBtn.textContent = 'Save';
    }
}

function closeModal() {
    modal.style.display = 'none';
    currentEvent = null;
}

function saveEvent(e) {
    e.preventDefault();
    const date = document.getElementById('event-date').value;
    const hour = document.getElementById('event-hour').value.padStart(2, '0');
    const minute = document.getElementById('event-minute').value.padStart(2, '0');
    const ampm = document.getElementById('event-ampm').value;
    const title = document.getElementById('event-name').value;
    const description = document.getElementById('event-description').value;

    const startTime = `${hour}:${minute} ${ampm}`;

    if (!events[date]) {
        events[date] = [];
    }

    if (currentEvent) {
        // Update existing event
        Object.assign(currentEvent, { title, startTime, description });
    } else {
        // Add new event
        events[date].push({ title, date, startTime, description });
    }

    closeModal();
    renderCalendar();
}

function deleteEvent() {
    if (currentEvent) {
        const date = currentEvent.date;
        events[date] = events[date].filter(e => e !== currentEvent);
        if (events[date].length === 0) {
            delete events[date];
        }
        closeModal();
        renderCalendar();
    }
}

function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

closeModalBtn.addEventListener('click', closeModal);
cancelEventBtn.addEventListener('click', closeModal);
eventForm.addEventListener('submit', saveEvent);

// Initialize calendar
renderCalendar();