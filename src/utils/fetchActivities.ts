export const fetchActivities = async() => {
    const cache = await caches.open("my-cache");
    const request = new Request("./lib/activities.json");

    try{
        let cachedResponse = await cache.match(request);
        if(cachedResponse){
            const cachedData = await cachedResponse.json();
            return cachedData;
        }

        const response = await fetch(request);
        await cache.put(request, response);

        const data = await response.json();
        console.log("Data added to cache:", data);
        return data;
    }catch(error){
        console.error("Error handling cache:", error);
        throw error;
    }
};