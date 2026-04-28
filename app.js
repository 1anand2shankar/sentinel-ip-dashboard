// Sentinel IP - Mock Application Logic

const MOCK_ASSETS = [
    { id: 'ASSET-001', name: 'PL Match Highlights - WK 34', status: 'Authenticated', hash: '8f2b...3e1a', detections: 142 },
    { id: 'ASSET-002', name: 'Interviews: Liverpool vs City', status: 'Monitoring', hash: '4a1d...9c2b', detections: 28 },
    { id: 'ASSET-003', name: 'Stadium Behind-the-scenes', status: 'Authenticated', hash: '7e9c...1f4d', detections: 5 },
    { id: 'ASSET-004', name: 'Official Club Anthem 4K', status: 'Authenticated', hash: '2b5a...8d7e', detections: 0 },
    { id: 'ASSET-005', name: 'Live Stream: Pre-match', status: 'Monitoring', hash: '1f2d...5c8b', detections: 12 },
];

const PLATFORMS = [
    { name: 'YouTube', icon: 'youtube' },
    { name: 'TikTok', icon: 'music' },
    { name: 'Twitter/X', icon: 'twitter' },
    { name: 'Instagram', icon: 'instagram' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Telegram', icon: 'send' },
    { name: 'Unauthorized Stream Site', icon: 'globe' },
];

const COUNTRIES = ['USA', 'UK', 'China', 'Brazil', 'Germany', 'India', 'Russia', 'France', 'Nigeria', 'Japan'];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    populateAssetsTable();
    startLiveFeed();
    setupNavigation();
    setupButtons();
    
    // Add some random detection markers to the map
    setInterval(createDetectionPulse, 3000);
});

// Populate the assets library table
function populateAssetsTable() {
    const tableBody = document.getElementById('assets-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = MOCK_ASSETS.map(asset => `
        <tr>
            <td>
                <div style="font-weight: 600;">${asset.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-dim);">${asset.id}</div>
            </td>
            <td>
                <span class="status-badge ${asset.status.toLowerCase()}">${asset.status}</span>
            </td>
            <td><code style="color: var(--primary);">${asset.hash}</code></td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    ${asset.detections} 
                    <span style="font-size: 0.7rem; color: ${asset.detections > 50 ? 'var(--warning)' : 'var(--text-dim)'};">
                        ${asset.detections > 50 ? '▲ High' : '● Low'}
                    </span>
                </div>
            </td>
            <td>
                <button class="btn-text action-view" data-id="${asset.id}" title="View Details">
                    <i data-lucide="external-link" style="width: 16px;"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    lucide.createIcons();

    // Add listeners to table actions
    document.querySelectorAll('.action-view').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            alert(`Opening detailed report for ${id}`);
        });
    });
}

// Simulate real-time detections
function startLiveFeed() {
    const feed = document.getElementById('live-feed');
    if (!feed) return;

    const createFeedItem = () => {
        const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
        const asset = MOCK_ASSETS[Math.floor(Math.random() * MOCK_ASSETS.length)];
        const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        const isHighRisk = Math.random() > 0.7;

        const item = document.createElement('div');
        item.className = `feed-item ${isHighRisk ? 'high-risk' : 'med-risk'}`;
        
        item.innerHTML = `
            <div class="feed-icon">
                <i data-lucide="${platform.icon}"></i>
            </div>
            <div class="feed-content">
                <h4>${platform.name}: Match Clip Detection</h4>
                <p>Asset Match: <strong>${asset.name}</strong></p>
                <div class="feed-meta">
                    <span><i data-lucide="map-pin" style="width: 10px;"></i> ${country}</span>
                    <span><i data-lucide="clock" style="width: 10px;"></i> Just now</span>
                    <span style="color: ${isHighRisk ? 'var(--warning)' : 'var(--primary)'};">
                        ${isHighRisk ? 'Unauthorized Monetization' : 'Fair Use Verification'}
                    </span>
                </div>
            </div>
        `;

        feed.prepend(item);
        lucide.createIcons();

        // Keep only top 10 items
        if (feed.children.length > 10) {
            feed.lastElementChild.remove();
        }
    };

    // Initial items
    for(let i=0; i<4; i++) createFeedItem();
    
    // Periodic updates
    setInterval(createFeedItem, 5000);
}

// Button and Modal setup
function setupButtons() {
    const modal = document.getElementById('upload-modal');
    const registerBtn = document.getElementById('register-asset-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal, .modal .btn-primary');
    const viewAllBtn = document.getElementById('view-all-detections');
    const manageBtn = document.getElementById('manage-library-btn');

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            alert('Loading comprehensive detection logs...');
        });
    }

    if (manageBtn) {
        manageBtn.addEventListener('click', () => {
            alert('Redirecting to Media Asset Management system...');
        });
    }

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

// Navigation handling
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageContent = document.getElementById('page-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Simulate page content change
            console.log(`Navigating to ${page}`);
            
            if (page !== 'dashboard') {
                pageContent.innerHTML = `
                    <div style="padding: 2rem; text-align: center;">
                        <i data-lucide="construction" style="width: 64px; height: 64px; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h2>${page.charAt(0).toUpperCase() + page.slice(1)} Module</h2>
                        <p style="color: var(--text-dim);">This section is currently being initialized with real-time data hooks.</p>
                        <button class="btn btn-primary" style="margin-top: 2rem;" onclick="location.reload()">Return to Dashboard</button>
                    </div>
                `;
                lucide.createIcons();
            } else {
                // Return to dashboard
                location.reload();
            }
        });
    });
}

// Map interactions
function createDetectionPulse() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    const pulse = document.createElement('div');
    pulse.className = 'map-pulse';
    
    // Random position within the map
    const top = 20 + Math.random() * 60;
    const left = 10 + Math.random() * 80;
    
    pulse.style.cssText = `
        position: absolute;
        top: ${top}%;
        left: ${left}%;
        width: 10px;
        height: 10px;
        background: var(--primary);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--primary);
        animation: pulseFade 2s forwards;
        z-index: 5;
    `;
    
    mapContainer.appendChild(pulse);
    
    setTimeout(() => pulse.remove(), 2000);
}

// CSS for the pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulseFade {
        0% { transform: scale(0); opacity: 1; box-shadow: 0 0 0 0 rgba(0, 242, 255, 0.7); }
        100% { transform: scale(4); opacity: 0; box-shadow: 0 0 0 20px rgba(0, 242, 255, 0); }
    }
    .btn-text {
        background: none;
        border: none;
        color: var(--primary);
        cursor: pointer;
        font-weight: 600;
        font-size: 0.85rem;
        transition: all 0.3s ease;
    }
    .btn-text:hover { text-decoration: underline; color: white; }
`;
document.head.appendChild(style);
