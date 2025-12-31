// GitHub Integration Script
document.addEventListener('DOMContentLoaded', function() {
    const username = 'Khan-Feroz211';
    
    // Function to fetch GitHub data
    async function fetchGitHubData() {
        try {
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            const userData = await userResponse.json();
            
            // Update user stats
            document.getElementById('repo-count').textContent = userData.public_repos || '0';
            document.getElementById('follower-count').textContent = userData.followers || '0';
            
            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=9`);
            const reposData = await reposResponse.json();
            
            // Calculate total stars and forks
            let totalStars = 0;
            let totalForks = 0;
            reposData.forEach(repo => {
                totalStars += repo.stargazers_count || 0;
                totalForks += repo.forks_count || 0;
            });
            
            document.getElementById('star-count').textContent = totalStars;
            document.getElementById('fork-count').textContent = totalForks;
            
            // Display repositories
            displayRepositories(reposData);
            
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            showErrorState();
        }
    }
    
    // Function to display repositories
    function displayRepositories(repos) {
        const reposList = document.getElementById('repositories-list');
        
        if (!repos || repos.length === 0) {
            reposList.innerHTML = '<div class="loading-repos">No repositories found</div>';
            return;
        }
        
        reposList.innerHTML = '';
        
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            
            // Format description (limit to 100 chars)
            const description = repo.description 
                ? (repo.description.length > 100 ? repo.description.substring(0, 100) + '...' : repo.description)
                : 'No description provided';
            
            // Format topics
            let topicsHTML = '';
            if (repo.topics && repo.topics.length > 0) {
                topicsHTML = repo.topics.slice(0, 3).map(topic => 
                    `<span class="repo-topic">${topic}</span>`
                ).join('');
            }
            
            repoCard.innerHTML = `
                <div class="repo-header">
                    <a href="${repo.html_url}" target="_blank" class="repo-name">
                        <i class="fas fa-book"></i>
                        ${repo.name}
                    </a>
                    <div class="repo-stats">
                        <span class="repo-stat">
                            <i class="fas fa-star"></i>
                            ${repo.stargazers_count || 0}
                        </span>
                        <span class="repo-stat">
                            <i class="fas fa-code-branch"></i>
                            ${repo.forks_count || 0}
                        </span>
                    </div>
                </div>
                <p class="repo-description">${description}</p>
                ${repo.language ? `<div class="repo-language" style="color: #6C63FF; font-size: 0.9rem; margin: 10px 0;">
                    <i class="fas fa-circle" style="font-size: 0.7rem;"></i> ${repo.language}
                </div>` : ''}
                ${topicsHTML ? `<div class="repo-topics">${topicsHTML}</div>` : ''}
            `;
            
            reposList.appendChild(repoCard);
        });
    }
    
    // Function to show error state
    function showErrorState() {
        const reposList = document.getElementById('repositories-list');
        if (reposList) {
            reposList.innerHTML = `
                <div class="loading-repos">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to load repositories</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">
                        <a href="https://github.com/${username}" target="_blank" style="color: #6C63FF;">
                            Visit GitHub directly
                        </a>
                    </p>
                </div>
            `;
        }
        
        // Set default values for stats
        document.querySelectorAll('.stat-card h3').forEach(el => {
            el.textContent = 'N/A';
        });
    }
    
    // Initialize
    fetchGitHubData();
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #6C63FF;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    });
});
