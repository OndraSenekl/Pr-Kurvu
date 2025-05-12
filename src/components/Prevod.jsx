import { useEffect } from 'react';
import { useState } from 'react'

export const Prevod = () => {
    const [cislo, setCislo] = useState(0);

    const [kurzy, setKurzy] = useState([]);

    const getKurzy = async () => {
        try {
            const response = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR');
            const data = await response.json();
            setKurzy(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getKurzy();
    }, [])

    return(
        <div>
            <h1>
                Prevod EUR do jine meny:
            </h1>
            <div>
                <input type="text" value={cislo} onChange={(e) => setCislo(e.target.value)} style={{padding: '5px'}}/>

                <select>
                {kurzy && 
                        Object.entries(kurzy.rates).map(([key, value]) => (
                            <option key={key} value={value}>{key}</option>
                        ))
                    }
                    
                </select>

                <button>Preved</button>
            </div>
        </div>
    )
}