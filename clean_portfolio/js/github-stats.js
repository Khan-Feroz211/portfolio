// GitHub API Integration for Live Stats
document.addEventListener('DOMContentLoaded', function() {
    async function fetchFromStatic() {
        try {
            const res = await fetch('data/github-stats.json', {cache: 'no-store'});
            if (!res.ok) throw new Error('No static stats');
            return await res.json();
        } catch (e) {
            return null;
        }
    }

    async function fetchFromApi() {
        try {
            const userResp = await fetch('https://api.github.com/users/Khan-Feroz211');
            const user = await userResp.json();
            const repos = await fetch('https://api.github.com/users/Khan-Feroz211/repos?per_page=100').then(r => r.json());
            const totalStars = (repos || []).reduce((s, r) => s + (r.stargazers_count || 0), 0);
            const totalForks = (repos || []).reduce((s, r) => s + (r.forks_count || 0), 0);
            return {
                user,
                total_stars: totalStars,
                total_forks: totalForks,
                top_repos: (repos || []).sort((a,b) => (b.stargazers_count||0)-(a.stargazers_count||0)).slice(0,6).map(r=>({name:r.name, html_url:r.html_url, stargazers_count:r.stargazers_count||0, forks_count:r.forks_count||0, language:r.language, description:r.description}))
            };
        } catch(e) { console.warn('public API error', e); return null; }
    }

    async function fetchGitHubStats() {
        const staticData = await fetchFromStatic();
        let payload = null;
        if (staticData) {
            payload = staticData;
        } else {
            payload = await fetchFromApi();
        }

        if (!payload) return;

        // Populate UI
        const user = payload.user || payload.user;
        if (user) {
            const repoCountEl = document.getElementById('repo-count');
            if (repoCountEl) repoCountEl.textContent = payload.public_repos || payload.public_repos === 0 ? payload.public_repos : (user.public_repos || '0');
            const followerEl = document.getElementById('follower-count');
            if (followerEl) followerEl.textContent = payload.followers || (user.followers || '0');
        }

        const starEl = document.getElementById('star-count');
        if (starEl) starEl.textContent = payload.total_stars ?? payload.total_stars ?? 0;
        const forkEl = document.getElementById('fork-count');
        if (forkEl) forkEl.textContent = payload.total_forks ?? payload.total_forks ?? 0;

        const projectsContainer = document.getElementById('projectsContainer');
        const repos = payload.top_repos || [];
        if (projectsContainer) {
            if (!repos.length) {
                projectsContainer.innerHTML = '<div class="loading">No projects available</div>';
            } else {
                projectsContainer.innerHTML = repos.map(repo => `
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
        }
    }

    fetchGitHubStats();
});
