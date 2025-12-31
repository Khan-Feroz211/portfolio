// GitHub API Integration for Live Stats
document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch GitHub stats
    async function fetchGitHubStats() {
        try {
            const response = await fetch('https://api.github.com/users/Khan-Feroz211');
            const data = await response.json();
            
            // Update the stats
            document.getElementById('repo-count').textContent = data.public_repos || '0';
            document.getElementById('follower-count').textContent = data.followers || '0';
            
            // Note: For stars and forks, we need to fetch all repos
            fetch('https://api.github.com/users/Khan-Feroz211/repos')
                .then(res => res.json())
                .then(repos => {
                    let totalStars = 0;
                    let totalForks = 0;
                    
                    repos.forEach(repo => {
                        totalStars += repo.stargazers_count || 0;
                        totalForks += repo.forks_count || 0;
                    });
                    
                    document.getElementById('star-count').textContent = totalStars;
                    document.getElementById('fork-count').textContent = totalForks;
                });
                
        } catch (error) {
            console.log('GitHub API error:', error);
            // Set default values if API fails
            document.querySelectorAll('.stat-card h3').forEach(el => {
                el.textContent = 'N/A';
            });
        }
    }
    
    // Call the function
    fetchGitHubStats();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
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
        z-index: 100;
        box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.alignItems = 'center';
            backToTopBtn.style.justifyContent = 'center';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
});