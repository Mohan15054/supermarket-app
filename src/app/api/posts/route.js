// This API route runs on the SERVER
export async function GET() {
  try {
    // This fetch happens on the SERVER
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4', {
      cache: 'no-store'
    });
    const posts = await response.json();
    
    const processedPosts = posts.map((post, index) => ({
      title: `SSR API Post ${post.id}`,
      description: post.title.substring(0, 50) + '...',
      imageUrl: `https://picsum.photos/200/300?random=${300 + index}`,
      body: post.body.substring(0, 100) + '...',
      serverRenderedAt: new Date().toLocaleTimeString(),
      serverInfo: 'Fetched on SERVER via API route'
    }));
    
    return Response.json(processedPosts);
  } catch (error) {
    console.error('Server-side API error:', error);
    return Response.json([], { status: 500 });
  }
}
