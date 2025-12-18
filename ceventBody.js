const askingCustomer = document.getElementById("questionOfThyUser");
const addEvents = document.getElementById("addEvents");
const pip = document.getElementById("popup");
const piop = document.getElementById("popupEvent");
const title = document.getElementById("tite");
const text = document.getElementById("text");
const btn = document.getElementById("okayISeeYou");
const btnSub = document.getElementById("submits");
const btnCan = document.getElementById("cancel");
const starts = document.getElementById("startOfEvent");
const ends = document.getElementById("endOfEvent");
const themesOfCustomer = document.getElementById("themes");
const peepee = document.getElementById("popupThemes");
const themesBtn = peepee.querySelector("button[type='button']");
const offlineOrNot = document.getElementById("popupNotif");
const offlineButt = document.getElementById("okayISeeYouSoon");
//themes
themesOfCustomer.onclick = function(){
    mainPopup.style.display = 'none';
    pip.style.display = 'none';
    title.textContent = "Change Themes";
    peepee.style.display = "block";
    themesBtn.onclick = function(){peepee.style.display = "none";}
}
//stolen from My Runs (my first project 🥹)
function themeChange(theme){
    const all = ["vanta", "white"];
    document.body.classList.remove(...all);
    document.body.classList.add(theme);
    localStorage.setItem("preferredTheme", theme);
}
function isMobile() {
      return window.innerWidth <= 768;
    }
    function adjustNavLayout() {
      const topnav = document.getElementById("nav") || document.querySelector(".nav");
      if (isMobile()){
        document.body.classList.add("mobile");
        document.body.classList.remove("desktop");
        if(topnav){
          topnav.style.width = "";
          topnav.style.height = "";
          topnav.style.position = "";
          topnav.style.flexDirection = "";
        }
      } else {
        document.body.classList.add("desktop");
        document.body.classList.remove("mobile");
        if(topnav){
          topnav.style.width = "";
          topnav.style.height = "";
          topnav.style.position = "";
          topnav.style.flexDirection = "";
        }
      }
      document.body.classList.remove("desktop", "mobile");
    }
document.addEventListener("DOMContentLoaded", function(){
    const savedTheme = localStorage.getItem("preferredTheme") || "white";
    themeChange(savedTheme);
    offlineOrNot.style.display = "block";
    offlineButt.onclick = function(){offlineOrNot.style.display = "none";}
    adjustNavLayout();
});
document.addEventListener("resize", adjustNavLayout);

//question
askingCustomer.onclick = function(){
    pip.style.display = "block";
    title.textContent = "Unfamilliar?";
    text.textContent = "Cevent is a simple calendar planner that helps you keep track. Click + to add events, and if events overlap, there will be a warning if you want to continue or not!";
    btn.textContent = "Got it!";
    btn.onclick = function(){
        pip.style.display = "none";
    };
};
//event adder
addEvents.onclick = function(){
    pip.style.display = "block";
    title.textContent = "Another Event?";
    text.textContent = "Just add the year, month, day, title, and detail of your event.";
    btn.textContent = "Got it!";
    btn.onclick = function(){
        pip.style.display = "none";
        piop.style.display = "block";
    };
};
const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('previousMonth');
const nextMonthBtn = document.getElementById('nextMonth');
//claude for these declaration of vars
// popup elements (main info popup and event creation popup)
const mainPopup = document.getElementById('popup');
const mainPopupTitle = document.getElementById('tite');
const mainPopupText = document.getElementById('text');
const mainPopupOk = document.getElementById('okayISeeYou');
const eventPopup = document.getElementById('popupEvent');
const eventStart = document.getElementById('startOfEvent');
const eventEnd = document.getElementById('endOfEvent');
const eventSubmit = document.getElementById('submits');
const eventCancel = document.getElementById('cancel');
const eventTitleInput = document.getElementById('eventTitle');
const eventDetailInput = document.getElementById('eventDetail');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
function renderCalendar(month, year) {
  calendarDates.innerHTML = '';
  monthYear.textContent = `${months[month]} ${year}`;

  
  const firstDay = new Date(year, month, 1).getDay();


  const daysInMonth = new Date(year, month + 1, 0).getDate();


  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    calendarDates.appendChild(blank);
  }
  const today = new Date();

  const monthEntry = findAnnouncementsEntry(year, months[month]);
  const eventsMap = eventsMapForMonth(monthEntry);

  for (let i = 1; i <= daysInMonth; i++) {
    const cell = document.createElement('div');
    cell.className = 'date-cell';
    const weekday = new Date(year, month, i).getDay();
    //day number
    const dayNum = document.createElement('div');
    dayNum.className = 'day-num';
    dayNum.textContent = i;
    cell.appendChild(dayNum);

    //for sundays
    if (weekday === 0) cell.classList.add('weekday-sun');

    //mark current date
    if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()){
      cell.classList.add('current-date');
    }

    // attach events for styling and badges
    const evts = eventsMap.get(i) || [];
    const cls = classForEvents(evts);
    if (cls && cls !== 'evt-none') cell.classList.add(cls);

    if (evts.length > 0) {
      const badge = document.createElement('div');
      badge.className = 'event-badge';
      badge.textContent = evts.length === 1 ? (evts[0].title || 'Event') : `${evts.length} events`;
      cell.appendChild(badge);
    }

    //shows events from clicking day
    cell.addEventListener('click', () => {
      // close any open popups first
      const tempMonthPicker = eventPopup.querySelector('.month-jump-temp');
      if (tempMonthPicker) tempMonthPicker.remove();
      const origContainer = eventPopup.querySelector('.popContgent');
      if (origContainer) origContainer.style.display = '';
      eventPopup.style.display = 'none';
      mainPopup.style.display = 'none';
      
      if (evts.length === 0) {
        mainPopupTitle.textContent = `${months[month]} ${i}`;
        mainPopupText.textContent = 'No events.';
      } else {
        mainPopupTitle.textContent = `${months[month]} ${i} — ${evts.length} event(s)`;
        mainPopupText.innerHTML = evts.map(e => `• <b>${e.title || '(no title)'}</b> — ${e.detail || ''}`).join('<br>');
      }
      mainPopup.style.display = 'block';
      
      // close popup after 5 seconds or when user clicks OK
      const autoCloseTimer = setTimeout(() => {
        mainPopup.style.display = 'none';
      }, 5000);
      
      mainPopupOk.onclick = () => {
        clearTimeout(autoCloseTimer);
        mainPopup.style.display = 'none';
      };
    });

    calendarDates.appendChild(cell);
  }
}


//announcements.json fetch
function findBaseEntry(year, monthName){
  if (!window.__baseAnnouncements) return null;
  return window.__baseAnnouncements.find(e => String(e.year) === String(year) && e.month.toLowerCase() === monthName.toLowerCase());
}

//finds user plans
function findUserEntry(year, monthName){
  if (!window.__userPlans) return null;
  return window.__userPlans.find(e => String(e.year) === String(year) && e.month.toLowerCase() === monthName.toLowerCase());
}

//returns an object with merged events array (base + user)
function findAnnouncementsEntry(year, monthName){
  const base = findBaseEntry(year, monthName);
  const user = findUserEntry(year, monthName);
  const events = [];
  if (base && Array.isArray(base.events)) events.push(...base.events);
  if (user && Array.isArray(user.events)) events.push(...user.events);
  return { year: String(year), month: monthName, events };
}

//build map day->events for a month entry
function eventsMapForMonth(entry){
  const map = new Map();
  if (!entry || !Array.isArray(entry.events)) return map;
  for (const ev of entry.events){
    const days = Array.isArray(ev.day) ? ev.day : [ev.day];
    for (const d of days){
      if (typeof d !== 'number') continue;
      const arr = map.get(d) || [];
      arr.push(ev);
      map.set(d, arr);
    }
  }
  return map;
}

//css coloring
function classForEvents(evts){
  if (!evts || evts.length === 0) return 'evt-none';
  const text = evts.map(x => ((x.detail||'') + ' ' + (x.title||'')).toString().toLowerCase()).join(' ');
  if (text.includes('final')) return 'evt-finals';
  if (text.includes('midterm')) return 'evt-midterm';
  if (text.includes('holiday')) return 'evt-holiday';
  if (text.includes('check') || text.includes('grade consultation')) return 'evt-check';
  return 'evt-none';
}
renderCalendar(currentMonth, currentYear);
prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});
//allow user to click the month-year to jump to any month (accepts number 1-12 or month name, optional year) -Claude. modified for a popup instead of an alert to not make it look ugly -flekia
monthYear.addEventListener('click', () => {
  // create a temporary month-picker overlay without destroying existing popup content
  const container = eventPopup.querySelector('.popContgent');
  const temp = document.createElement('div');
  temp.className = 'month-jump-temp';
  temp.style.textAlign = 'center';
  temp.style.padding = '20px';
  temp.style.display = 'flex';
  temp.style.flexDirection = 'column';
  temp.style.alignItems = 'center';
  temp.style.gap = '10px';
  const label = document.createElement('label');
  label.textContent = 'Where to, traveller?';
  const monthInput = document.createElement('input');
  monthInput.type = 'month';
  const mm = String(currentMonth + 1).padStart(2,'0');
  monthInput.value = `${currentYear}-${mm}`;
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '10px';
  buttonContainer.style.justifyContent = 'center';
  const submit = document.createElement('button');
  submit.type = 'button';
  submit.textContent = 'Go';
  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.textContent = 'Cancel';
  buttonContainer.appendChild(submit);
  buttonContainer.appendChild(cancel);
  temp.appendChild(label);
  temp.appendChild(monthInput);
  temp.appendChild(buttonContainer);
  // hide original container visually but keep in DOM
  container.style.display = 'none';
  eventPopup.querySelector('.popung').appendChild(temp);
  eventPopup.style.display = 'block';

  submit.addEventListener('click', () => {
    const val = monthInput.value; //format YYYY-MM
    if (!val) return;
    const [y, m] = val.split('-').map(s => parseInt(s,10));
    if (!isNaN(y) && !isNaN(m)){
      currentYear = y;
      currentMonth = m - 1;
      renderCalendar(currentMonth, currentYear);
    }
    // remove temp and restore container
    temp.remove();
    container.style.display = '';
    eventPopup.style.display = 'none';
  });
  cancel.addEventListener('click', () => {
    temp.remove();
    container.style.display = '';
    eventPopup.style.display = 'none';
  });
});

// Load base announcements (read-only) from announcements.json and load user's plans from localStorage
window.__baseAnnouncements = [];
window.__userPlans = [];
function loadUserPlansFromStorage(){
  try{
    const raw = localStorage.getItem('cevent_user_plans');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch(e){ console.warn('user plans parse error', e); return []; }
}
function saveUserPlansToStorage(){
  try{
    localStorage.setItem('cevent_user_plans', JSON.stringify(window.__userPlans));
  } catch(e){ console.warn('user plans save failed', e); }
}

// load user plans first (so they are available immediately)
window.__userPlans = loadUserPlansFromStorage();

// fetch base announcements (do not overwrite user plans)
fetch('announcements.json').then(r => r.ok ? r.json() : Promise.reject('failed')).then(data => {
  window.__baseAnnouncements = data;
  renderCalendar(currentMonth, currentYear);
}).catch(err => {
  console.warn('Could not load announcements.json', err);
  renderCalendar(currentMonth, currentYear);
});

//To add events
eventSubmit.onclick = function() {
  // query inputs fresh to handle dynamic content safely
  const title = (document.getElementById('eventTitle') && document.getElementById('eventTitle').value) ? document.getElementById('eventTitle').value.trim() : '';
  const detail = (document.getElementById('eventDetail') && document.getElementById('eventDetail').value) ? document.getElementById('eventDetail').value.trim() : '';
  const startVal = document.getElementById('startOfEvent') ? document.getElementById('startOfEvent').value : '';
  const endVal = document.getElementById('endOfEvent') ? document.getElementById('endOfEvent').value : '';
  if (!startVal || !endVal){
    pip.style.display = 'block';
    title.textContent = "Incomplete...";
    text.textContent = "Please provide both start and end dates.";
    btn.textContent = "Okay";
    btn.addEventListener("click",function(){
        pip.style.display = "none";
    });
    return;
  }
  const startDate = new Date(startVal);
  const endDate = new Date(endVal);
  if (endDate < startDate){
    pip.style.display = 'block';
    title.textContent = "Are you a time traveller?"; //bernardo
    text.textContent = "Unless you are Sir Odranreb Guillermo, you're not a time traveler! (Your end date is before the start date)";
    btn.textContent = "Okay";
    btn.addEventListener("click",function(){
        pip.style.display = "none";
    });
    return;
  }
  //compute all days spanned)
  const daysSpanned = [];
  const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const last = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  while (d <= last){
    daysSpanned.push({ year: d.getFullYear(), month: d.getMonth(), day: d.getDate() });
    d.setDate(d.getDate() + 1);
  }

  //check conflicts against BASE announcements (midterms/finals) AND user's other plans
  const conflicts = [];
  for (const item of daysSpanned){
    // check base announcements (focus on midterm/final/holiday/check)
    const baseEntry = findBaseEntry(item.year, months[item.month]);
    if (baseEntry){
      const evts = (baseEntry.events || []).filter(ev => {
        const days = Array.isArray(ev.day) ? ev.day : [ev.day];
        return days.includes(item.day);
      });
      for (const ev of evts){
        const txt = ((ev.detail||'') + ' ' + (ev.title||'')).toLowerCase();
        if (txt.includes('midterm') || txt.includes('final') || txt.includes('holiday') || txt.includes('check')){
          conflicts.push({ when: `${months[item.month]} ${item.day} ${item.year}`, event: ev, type: 'base' });
        }
      }
    }
    // check user's existing plans for ANY collision
    const userEntry = findUserEntry(item.year, months[item.month]);
    if (userEntry){
      const userEvts = (userEntry.events || []).filter(ev => {
        const days = Array.isArray(ev.day) ? ev.day : [ev.day];
        return days.includes(item.day);
      });
      for (const ev of userEvts){
        conflicts.push({ when: `${months[item.month]} ${item.day} ${item.year}`, event: ev, type: 'personal' });
      }
    }
  }
  //check any conflicts
  if (conflicts.length > 0){
    const baseConflicts = conflicts.filter(c => c.type === 'base').map(c => `${c.when}: ${c.event.title} (${c.event.detail})`);
    const personalConflicts = conflicts.filter(c => c.type === 'personal').map(c => `${c.when}: ${c.event.title} (${c.event.detail})`);
    let msg;
    if (baseConflicts.length > 0) msg += "This has conflict on NU's dates/holidays:\n" + baseConflicts.join('\n') + '\n';
    if (personalConflicts.length > 0) msg += 'Your other events:\n' + personalConflicts.join('\n') + '\n';
    msg += 'Do you want to continue?';
    eventPopup.style.display = 'none';
    pip.style.zIndex = "5";
    pip.style.display = "block";
    title.textContent = "More than 1 event?!";
    text.textContent = msg;
    btn.textContent = "Continue";
    //cancel button
    let cancel = document.getElementById('__pip_cancel');
    if (cancel){
        cancel.remove();
    }
    cancel = document.createElement("button");
    cancel.type = "button";
    cancel.id = "__pip_cancel";
    cancel.textContent = "No";
    cancel.style.padding = "5px 10px";
    cancel.style.border = "none";
    if (btn.parentNode){
        btn.parentNode.appendChild(cancel);
    }
    btn.onclick = function(){
        if (cancel && cancel.parentNode){
            cancel.parentNode.removeChild(cancel);
        }
        eventPopup.style.display = "none";
        pip.style.display = "none";
        btn.onclick = null;
        cancel.onclick = null;
        commitAddEvent();
    };
    cancel.onclick = function(){
        if (cancel && cancel.parentNode){
            cancel.parentNode.removeChild(cancel);
        }
        pip.style.display = "none";
        btn.onclick = null;
        cancel.onclick = null;
    };
    return;
  }

  //add event into user's plans (localStorage) grouped by month-year
  function commitAddEvent() {
    const groups = {};
    for (const item of daysSpanned){
      const key = `${item.year}::${months[item.month]}`;
      groups[key] = groups[key] || [];
      groups[key].push(item.day);
    }
    for (const key in groups){
      const [y, mName] = key.split('::');
      let entry = window.__userPlans.find(e => String(e.year) === String(y) && e.month === mName);
      if (!entry){
        entry = { year: String(y), month: mName, events: [] };
        window.__userPlans.push(entry);
      }
      const days = groups[key];
      const dayField = days.length === 1 ? days[0] : days.slice().sort((a,b)=>a-b);
      entry.events.push({ day: dayField, title: title || 'Personal Event', detail: detail || 'None' });
    }
    //put user plans to localStorage (cache, please don't tell the user to delete their cache if they want their plans saved)
    try{ saveUserPlansToStorage(); } catch(e){ console.warn('save user plans error', e); }
    eventPopup.style.display = 'none';
    if (eventTitleInput) eventTitleInput.value = '';
    if (eventDetailInput) eventDetailInput.value = '';
    if (eventStart) eventStart.value = '';
    if (eventEnd) eventEnd.value = '';
    renderCalendar(currentMonth, currentYear);
    renderEventsBoard();
    pip.style.display = "block";
    title.textContent = "Done!";
    text.textContent = "Your event is now saved!";
    btn.textContent = "Great!";
    btn.onclick = function(){
      pip.style.display = "none";
    };
  }
  
  commitAddEvent();
};

eventCancel.addEventListener('click', () => {
  const container = eventPopup.querySelector('.popContgent');
  const temp = eventPopup.querySelector('.month-jump-temp');
  if (temp) temp.remove();
  container.style.display = '';
  eventPopup.style.display = 'none';
  // clear form inputs
  if (eventTitleInput) eventTitleInput.value = '';
  if (eventDetailInput) eventDetailInput.value = '';
  if (eventStart) eventStart.value = '';
  if (eventEnd) eventEnd.value = '';
});

// Render user events board at bottom
function renderEventsBoard() {
  let board = document.getElementById('user-events-board');
  if (!board) {
    board = document.createElement('div');
    board.id = 'user-events-board';
    board.className = 'events-board';
    document.body.appendChild(board);
    
  }
  board.innerHTML = '';

  if (!window.__userPlans || window.__userPlans.length === 0) {
    board.innerHTML = '<p style="text-align: center; color: #999;">No personal events yet.</p>';
    return;
  }

  const title = document.createElement('h3');
  title.textContent = 'Your Events (User)';
  title.style.marginBottom = '10px';
  board.appendChild(title);

  for (let monthIdx = 0; monthIdx < window.__userPlans.length; monthIdx++) {
    const monthEntry = window.__userPlans[monthIdx];
    if (!monthEntry.events || monthEntry.events.length === 0) continue;

    for (let eventIdx = 0; eventIdx < monthEntry.events.length; eventIdx++) {
      const ev = monthEntry.events[eventIdx];
      const eventRow = document.createElement('div');
      eventRow.className = 'event-row';
      eventRow.style.display = 'flex';
      eventRow.style.justifyContent = 'space-between';
      eventRow.style.alignItems = 'center';
      eventRow.style.padding = '8px';
      eventRow.style.marginBottom = '4px';

      const eventInfo = document.createElement('span');
      const days = Array.isArray(ev.day) ? ev.day.join(', ') : ev.day;
      eventInfo.textContent = `${ev.title} (${ev.detail}) - ${monthEntry.month} ${days}, ${monthEntry.year}`;
      eventInfo.style.flex = '1';
      eventRow.appendChild(eventInfo);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.textContent = '\u2715';
      deleteBtn.style.backgroundColor = '#d9534f';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = 'none';
      deleteBtn.style.padding = '4px 8px';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.onclick = () => {
        // Remove event from array
        window.__userPlans[monthIdx].events.splice(eventIdx, 1);
        // Save to localStorage
        saveUserPlansToStorage();
        // Refresh calendar and board
        renderCalendar(currentMonth, currentYear);
        renderEventsBoard();
      };
      eventRow.appendChild(deleteBtn);
      board.appendChild(eventRow);
    }
  }
}

// Initial render of events board
renderEventsBoard();
//to run the service worker
      navigator.serviceWorker.register('/Cevent/sw.js', {scope: '/Cevent/'});
      console.log("sw.js now working.");
