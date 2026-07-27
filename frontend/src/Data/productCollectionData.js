export const productCollectionData = async (gender) => {
    try {
        const url = gender
            ? `${import.meta.env.VITE_API_URL}/products?gender=${encodeURIComponent(gender)}`
            : `${import.meta.env.VITE_API_URL}/products`;

        const result = await fetch(url)

        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}