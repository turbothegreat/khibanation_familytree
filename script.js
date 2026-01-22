document.addEventListener('DOMContentLoaded', () => {
    updateMemberCount();

    // Node Click Event
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const children = node.nextElementSibling;
            if (children && children.classList.contains('children')) {
                children.classList.toggle('show');
            }
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

// Update Statistics
function updateMemberCount() {
    const count = document.querySelectorAll('.node').length;
    document.getElementById('memberCount').textContent = count;
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
    bc.innerHTML = `<strong>Selected:</strong> ${path.join(' <i class="fas fa-chevron-right" style="font-size:0.8em"></i> ')}`;
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
            
            // Expand all parents
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

function resetSearch() {
    document.querySelectorAll('.node').forEach(n => n.classList.remove('highlight'));
}

// Global Toggle
function toggleAll(expand) {
    document.querySelectorAll('.children').forEach(child => {
        expand ? child.classList.add('show') : child.classList.remove('show');
    });
}