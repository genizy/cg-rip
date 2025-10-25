const servers = [
    'usa-1.growden.io',
    'usa-2.growden.io',
    'usa-3.growden.io',
    'usa-4.growden.io',
    'fra-1.growden.io',
    'fra-2.growden.io',
    'asia-1.growden.io',
    'asia-2.growden.io'
];

function getRandomServer() {
    return servers[Math.floor(Math.random() * servers.length)];
}

async function fetchBestRegion() {
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const randomServer = getRandomServer();
        try {
            const response = await fetch(`https://${randomServer}/api/init`);
            if (response.ok) {
                const data = await response.json();
                const bestRegion = data.region; // use the "region" from the response JSON
                console.log(`Attempt ${attempt}: Best region from server ${randomServer}: ${bestRegion}`);
                return bestRegion;
            } else {
                console.error(`Attempt ${attempt}: Server ${randomServer} responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Attempt ${attempt}: Error fetching best region from ${randomServer}:`, error);
        }
    }
    console.error('All attempts failed. Falling back to default: USA');
    return 'USA';
}

const cachedBestServer = localStorage.getItem('bestServer');

if (!cachedBestServer) {
    fetchBestRegion().then(bestRegion => {
        console.log('Best region to connect (Saving to localStorage):', bestRegion);
        localStorage.setItem('bestServer', bestRegion);
    }).catch(error => {
        console.error('Error during region fetching:', error);
    });
} else {
    console.log('Using cached best server:', cachedBestServer);
}
