// Simple Portfolio JS
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded!');
    
    // Update year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Load saved data
    loadSavedData();
    
    // Load GitHub stats
    loadGitHub();
});

function loadSavedData() {
    // Profile
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    if (profile.name) {
        const nameEl = document.querySelector('.hero-text h1 .highlight');
        if (nameEl) nameEl.textContent = profile.name;
    }
    
    // Skills
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    if (skills.length) {
        const container = document.getElementById('skillsContainer');
        if (container) {
            container.innerHTML += `
                <div class="skill-category">
                    <h3><i class="fas fa-star"></i> Custom Skills</h3>
                    <div class="skill-items">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
        }
    }
    
    // Projects
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (projects.length) {
        const container = document.getElementById('projectsContainer');
        if (container) {
            container.innerHTML = projects.map(project => `
                <div class="project-card">
                    <div class="project-image">
                        <div class="project-badge">Project</div>
                    </div>
                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div style="margin: 1rem 0;">
                            ${project.technologies ? project.technologies.split(',').map(tech => 
                                `<span style="background: #e2e8f0; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">${tech.trim()}</span>`
                            ).join('') : ''}
                        </div>
                        ${project.url ? `
                            <a href="${project.url}" target="_blank" style="color: #2563eb;">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }
    }
}

async function loadGitHub() {
    try {
        const response = await fetch('https://api.github.com/users/Khan-Feroz211');
        const data = await response.json();
        
        document.getElementById('repo-count').textContent = data.public_repos || 0;
        document.getElementById('follower-count').textContent = data.followers || 0;
        
        // Get stars
        const repos = await fetch('https://api.github.com/users/Khan-Feroz211/repos').then(r => r.json());
        const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
        
        document.getElementById('star-count').textContent = stars;
        document.getElementById('fork-count').textContent = forks;
        
    } catch (error) {
        console.log('GitHub data loaded');
    }
}
