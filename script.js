fetch('https://api.github.com/repos/january1073/january1073.github.io/commits/main')
    .then(r => r.json())
    .then(data => {
        const lastCommit = new Date(data.commit.committer.date);
        document.getElementById('last-updated').textContent = 
            lastCommit.toISOString().split('T')[0];
    });