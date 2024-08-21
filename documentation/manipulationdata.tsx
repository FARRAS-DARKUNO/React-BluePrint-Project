import React from 'react';
import useManipulatuionData from '../src/hooks/useManipulationData';

interface example {
    name : string
}

const MyComponent: React.FC = () => {
    const [data, loading, error, manipulateData] = useManipulatuionData<example>('/api/resource', 'post', 'application/json');
    const [dataA, loadingB, errorC, manipulateDataA] = useManipulatuionData<example>('', 'post', 'application/json');

    const handleSubmit = async () => {
        const formData = new URLSearchParams();
        formData.append('key', 'value');

        const [success, err] = await manipulateData(formData);
        if (err) {
            console.error(err);
        } else {
            console.log(success);
        }
    };

    return (
        <div>
            <button onClick={handleSubmit} disabled={loading}>
                Submit
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <p>Success: {JSON.stringify(data.data.name)}</p>}
        </div>
    );
};

export default MyComponent;