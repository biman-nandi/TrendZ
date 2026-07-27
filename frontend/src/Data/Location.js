export const pinLocation = async (pin) => {
    try {
        const result = await fetch(`https://api.postalpincode.in/pincode/${pin}`)

        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}