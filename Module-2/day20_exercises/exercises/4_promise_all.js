

async function fetchPostDetails(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
    return res.json();
}

async function loadFirstTwoPosts() {
    try {
        // fetch the list first
        const listRes = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!listRes.ok) throw new Error("Failed to fetch post list");
        const posts = await listRes.json();

        const firstTwoIds = posts.slice(0, 2).map(post => post.id);

        // fetch both details in parallel instead of one after another
        const details = await Promise.all(
            firstTwoIds.map(id => fetchPostDetails(id))
        );

        details.forEach(post => {
            console.log(`#${post.id}: ${post.title}`);
        });
    } catch (err) {
        console.error("Error loading posts:", err.message);
    }
}

loadFirstTwoPosts();
