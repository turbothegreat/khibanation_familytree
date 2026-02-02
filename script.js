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