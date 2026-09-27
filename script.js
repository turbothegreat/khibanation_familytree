document.addEventListener('DOMContentLoaded', () => {
    updateMemberCount();

    // Node Click Event
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Toggle children visibility
            const children = node.nextElementSibling;
            if (children && children.classList.contains('children')) {
                children.classList.toggle('show');
            }

            // NEW: Highlight the line of descent
            highlightLineage(node);
            
            showBreadcrumbs(node);
        });
    });

    // Gallery Events
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('show');
        });
    });

    document.querySelector('.close-lightbox').addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('show');
    });
});

// NEW: Function to track and highlight the lineage path
function highlightLineage(node) {
    // Clear any previous active paths first
    document.querySelectorAll('.active-branch').forEach(el => {
        el.classList.remove('active-branch');
    });

    // Travel up from the clicked node to the root
    let current = node.closest('li'); 
    while (current) {
        current.classList.add('active-branch');
        // Find the next parent <li> by going up the DOM
        let parentUl = current.parentElement;
        current = parentUl ? parentUl.closest('li') : null;
    }
}

// Update Statistics
function updateMemberCount() {
    const count = document.querySelectorAll('.node').length;
    const countEl = document.getElementById('memberCount');
    if(countEl) countEl.textContent = count;
}

// Breadcrumb logic
function showBreadcrumbs(node) {
    let path = [];
    let current = node;

    while (current) {
        path.unshift(current.childNodes[0].textContent.trim());
        let parentLi = current.closest('ul').closest('li');
        if (!parentLi) break;
        current = parentLi.querySelector('.node');
    }

    const bc = document.getElementById('breadcrumbs');
    if(bc) {
        bc.innerHTML = `<strong>Selected:</strong> ${path.join(' <i class="fas fa-chevron-right" style="font-size:0.8em"></i> ')}`;
    }
}

// Search Functionality
function searchMember() {
    const value = document.getElementById('searchInput').value.toLowerCase();
    if (value === "") return;

    resetSearch();

    let found = false;
    document.querySelectorAll('.node').forEach(n => {
        if (n.textContent.toLowerCase().includes(value)) {
            n.classList.add('highlight');
            found = true;
            
            // NEW: Highlight the lineage for search results
            highlightLineage(n);
            
            // Expand all parents so the searched name isn't hidden
            let parent = n.parentElement;
            while (parent) {
                if (parent.classList.contains('children')) {
                    parent.classList.add('show');
                }
                parent = parent.parentElement;
            }
            n.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    if (!found) alert("Family member not found.");
}

// Updated to also clear the lineage lines
function resetSearch() {
    document.querySelectorAll('.node').forEach(n => n.classList.remove('highlight'));
    document.querySelectorAll('.active-branch').forEach(el => el.classList.remove('active-branch'));
}

// Global Toggle
function toggleAll(expand) {
    document.querySelectorAll('.children').forEach(child => {
        expand ? child.classList.add('show') : child.classList.remove('show');
    });
    // Optional: Clear paths when collapsing all for a clean look
    if (!expand) resetSearch();
}

/* ============================
   FAMILY GATHERINGS / EVENTS
   ============================ */

// Add your events here — easiest place to update them
const familyEvents = [
    {
        title: "Annual Khibanation Family Reunion",
        location: "Maseru, Lesotho",
        date: "2024-12-15",
        description: "End of year gathering with all branches."
    },
    {
        title: "Memorial Service",
        location: "Leribe, Lesotho",
        date: "2024-06-08",
        description: "Honoring our ancestors."
    },
    {
        title: "Wedding Celebration",
        location: "Maseru, Lesotho",
        date: "2023-11-25",
        description: "Family wedding for the Khiba branch."
    },
    {
        title: "Christmas Gathering",
        location: "Teyateyaneng, Lesotho",
        date: "2023-12-25",
        description: "Festive season family meetup."
    }
];

// Render the events
function renderEvents() {
    const grid = document.getElementById("eventsGrid");
    const countSpan = document.getElementById("eventCount");

    if (!grid) return;

    // Update total counter
    countSpan.textContent = familyEvents.length;

    if (familyEvents.length === 0) {
        grid.innerHTML = `<p class="no-events">No gatherings recorded yet.</p>`;
        return;
    }

    // Sort newest first
    const sorted = [...familyEvents].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    grid.innerHTML = sorted.map(ev => {
        const d = new Date(ev.date);
        const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
        const month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
        const year = d.getFullYear();

        return `
            <div class="event-card">
                <div class="event-date">
                    <span class="event-day">${day}</span>
                    <span class="event-month">${month}</span>
                    <span class="event-year">${year}</span>
                </div>
                <div class="event-info">
                    <h3>${ev.title}</h3>
                    <p class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${ev.location}
                    </p>
                    <p class="event-desc">${ev.description || ""}</p>
                </div>
            </div>
        `;
    }).join("");
}

document.addEventListener("DOMContentLoaded", renderEvents);s