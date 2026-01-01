// GitHub API Integration for Live Stats
document.addEventListener('DOMContentLoaded', function() {
    async function fetchGitHubStats() {
        try {
            const response = await fetch('https://api.github.com/users/Khan-Feroz211');
            const data = await response.json();

            document.getElementById('repo-count').textContent = data.public_repos || '0';
            document.getElementById('follower-count').textContent = data.followers || '0';

            const repos = await fetch('https://api.github.com/users/Khan-Feroz211/repos?per_page=100').then(r => r.json());
            let totalStars = 0;
            let totalForks = 0;
            repos.forEach(repo => {
                totalStars += repo.stargazers_count || 0;
                totalForks += repo.forks_count || 0;
            });

            document.getElementById('star-count').textContent = totalStars;
            document.getElementById('fork-count').textContent = totalForks;

            // Render projects list (top 6 by stars)
            const projectsContainer = document.getElementById('projectsContainer');
            if (projectsContainer && Array.isArray(repos)) {
                const sorted = repos.sort((a,b) => (b.stargazers_count||0) - (a.stargazers_count||0)).slice(0,6);
                projectsContainer.innerHTML = sorted.map(repo => `
                    <div class="project-card">
                        <div class="project-header">
                            <a class="project-name" href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
                            <div class="project-stats">
                                <div class="project-stat"><i class="fas fa-star"></i> ${repo.stargazers_count||0}</div>
                                <div class="project-stat"><i class="fas fa-code-branch"></i> ${repo.forks_count||0}</div>
                            </div>
                        </div>
                        <p class="project-description">${repo.description || ''}</p>
                        <div class="project-language">${repo.language || ''}</div>
                    </div>
                `).join('');
            }

        } catch (error) {
            console.warn('GitHub API error', error);
        }
    }

    fetchGitHubStats();
});
