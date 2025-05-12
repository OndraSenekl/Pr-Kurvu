import { useEffect, useState } from 'react';

export const Prevod = () => {
    const [cislo, setCislo] = useState(0);
    const [kurzy, setKurzy] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [result, setResult] = useState(null);

    const getKurzy = async () => {
        try {
            const response = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR');
            const data = await response.json();
            setKurzy(data.rates);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getKurzy();
    }, []);

    const handleConvert = () => {
        if (cislo > 0 && kurzy[selectedCurrency]) {
            const conversionRate = kurzy[selectedCurrency];
            const convertedAmount = (cislo * conversionRate).toFixed(2);
            setResult(convertedAmount);
        }
    };

    return (
        <div>
            <h1>Prevod EUR do jine meny:</h1>
            <div>
                <input
                    type="number"
                    value={cislo}
                    onChange={(e) => setCislo(e.target.value)}
                    style={{ padding: '5px' }}
                />

                <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    style={{ padding: '5px', marginLeft: '10px' }}

                >
                    {kurzy && Object.entries(kurzy).map(([key, value]) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>

                <button style={{border: '5px', padding: '10px', marginLeft: '10px' }} onClick={handleConvert}>Preved</button>

                {result !== null && (
                    <div>
                        <h2>Výsledek:</h2>
                        <p>
                            {cislo} EUR = {result} {selectedCurrency}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
