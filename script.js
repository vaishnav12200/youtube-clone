// Global state
let sidebarOpen = true;

// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
    
    sidebarOpen = !sidebarOpen;
}

// Handle search functionality
function searchVideos() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log(`Searching for: ${query}`);
        alert(`Searching for: ${query}`);
        searchInput.value = '';
    }
}

// Handle category tab clicks
function switchCategory(category, element) {
    // Remove active class from all tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    element.classList.add('active');
    
    console.log(`Switched to category: ${category}`);
}

// Handle video card clicks
function playVideo(videoId, title) {
    console.log(`Playing video: ${title} (ID: ${videoId})`);
    alert(`Would play: ${title}`);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.textContent;
            switchCategory(category, this);
        });
    });
    
    // Add click handlers to video cards
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.video-title').textContent;
            const videoId = 'demo-video';
            playVideo(videoId, title);
        });
    });
    
    // Handle search on Enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchVideos();
            }
        });
    }
    
    // Handle sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Handle responsive behavior
    function handleResize() {
        const sidebar = document.getElementById('sidebar');
        const content = document.querySelector('.content');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
            sidebarOpen = false;
        } else if (window.innerWidth > 768 && sidebarOpen) {
            sidebar.classList.remove('collapsed');
            content.classList.remove('expanded');
        }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    console.log('YouTube homepage loaded successfully');
});