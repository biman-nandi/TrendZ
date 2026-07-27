export const productData = async (id) => {
    try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)

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