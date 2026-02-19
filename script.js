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
        // In a real implementation, this would filter or fetch videos
        alert(`Searching for: ${query}`);
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
    // In a real implementation, this would filter videos by category
}

// Handle video card clicks
function playVideo(videoId, title) {
    console.log(`Playing video: ${title} (ID: ${videoId})`);
    // In a real implementation, this would navigate to video player page
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
            const videoId = 'demo-video'; // In real app, get from data attribute
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
    
    console.log('YouTube homepage loaded successfully');
});

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.remove('collapsed');
        content.classList.remove('expanded');
    } else {
        sidebar.classList.add('collapsed');
        content.classList.add('expanded');
    }
}

// Like functionality
function toggleLike() {
    const likeBtn = document.querySelector('.action-btn');
    const likeCount = document.getElementById('likeCount');
    
    isLiked = !isLiked;
    
    if (isLiked) {
        likeBtn.classList.add('liked');
        likeCount.textContent = '12.1K';
    } else {
        likeBtn.classList.remove('liked');
        likeCount.textContent = '12K';
    }
}

// Subscribe functionality
function toggleSubscribe() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    
    isSubscribed = !isSubscribed;
    
    if (isSubscribed) {
        subscribeBtn.textContent = 'Subscribed';
        subscribeBtn.classList.add('subscribed');
    } else {
        subscribeBtn.textContent = 'Subscribe';
        subscribeBtn.classList.remove('subscribed');
    }
}

// Load new video
function loadVideo(videoId, title) {
    const iframe = document.querySelector('.video-player iframe');
    const videoTitle = document.querySelector('.video-title');
    
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    videoTitle.textContent = title;
    
    // Reset like and subscribe states
    isLiked = false;
    isSubscribed = false;
    document.querySelector('.action-btn').classList.remove('liked');
    document.getElementById('likeCount').textContent = '12K';
    document.getElementById('subscribeBtn').textContent = 'Subscribe';
    document.getElementById('subscribeBtn').classList.remove('subscribed');
}

// Search functionality
function searchVideos() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        alert(`Searching for: "${query}"`); // In real app, this would trigger search API
        searchInput.value = '';
    }
}

// Comments functionality
function renderComments() {
    const commentsList = document.getElementById('commentsList');
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <img src="${comment.avatar}" alt="${comment.author}" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-author">${comment.author} • ${comment.timeAgo}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-actions">
                    <button class="comment-action" onclick="likeComment(${comment.id})">
                        <i class="fas fa-thumbs-up"></i>
                        ${comment.likes}
                    </button>
                    <button class="comment-action">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                    <button class="comment-action">Reply</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add new comment
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const text = commentInput.value.trim();
    
    if (text) {
        const newComment = {
            id: comments.length + 1,
            author: "You",
            avatar: "https://via.placeholder.com/32",
            text: text,
            likes: 0,
            timeAgo: "Just now"
        };
        
        comments.unshift(newComment);
        renderComments();
        commentInput.value = '';
        
        // Update comment count
        const commentHeader = document.querySelector('.comments-header h3');
        commentHeader.textContent = `${comments.length} Comments`;
    }
}

// Like comment
function likeComment(commentId) {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
        comment.likes += 1;
        renderComments();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Search shortcut (Ctrl/Cmd + K)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Like shortcut (L key)
    if (event.key === 'l' || event.key === 'L') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            toggleLike();
        }
    }
    
    // Subscribe shortcut (S key)
    if (event.key === 's' || event.key === 'S') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            toggleSubscribe();
        }
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderComments();
    
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchVideos();
        }
    });

    // Comment on Enter key
    document.getElementById('commentInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });
    
    // Handle responsive sidebar
    function handleResize() {
        const sidebar = document.getElementById('sidebar');
        const content = document.querySelector('.content');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
            sidebarOpen = false;
        }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Set up sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Simulate view increment
    setTimeout(() => {
        const viewsElement = document.querySelector('.video-stats span:first-child');
        if (viewsElement) viewsElement.textContent = '1,234,568 views';
    }, 3000);
});