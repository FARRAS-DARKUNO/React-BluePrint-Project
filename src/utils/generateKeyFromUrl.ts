
const generateKeyFromUrl = (url: string): string => {
    return url.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric characters with '_'
};

export default generateKeyFromUrl