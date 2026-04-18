const countriesContainer = document.getElementById('countries');
let allCountries = [];

const fetchCountries = async () => {
    try {
        // Filtrar solo los campos necesarios para optimizar
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,languages,flags,population,area,region,subregion,cca2');
        const data = await response.json();
        
        // Ordenar por nombre
        allCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        displayCountries(allCountries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        countriesContainer.innerHTML = '<p>Error al cargar los países. Intenta recargar la página.</p>';
    }
};

const displayCountries = (countries) => {
    const countriesHTML = countries.map(country => {
        const name = country.name.common;
        const flag = country.flags?.png || country.flags?.svg || 'N/A';
        const capital = country.capital ? country.capital.join(', ') : 'Capital no especificada';
        const region = country.region || 'N/A';
        const subregion = country.subregion || 'N/A';
        const population = country.population ? country.population.toLocaleString() : 'N/A';
        const area = country.area ? country.area.toLocaleString() : 'N/A';
        const cca2 = country.cca2 || 'N/A';
        
        // Monedas
        const currencies = country.currencies 
            ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
            : 'Sin moneda registrada';
        
        // Idiomas
        const languages = country.languages
            ? Object.values(country.languages).join(', ')
            : 'Sin idiomas registrados';
        
        return `
            <div class="card">
                <div class="card-flag">
                    <img src="${flag}" alt="Bandera de ${name}" class="flag-image"/>
                </div>
                <div class="card-content">
                    <h2 class="card-title">${name}</h2>
                    <p class="card-code"><strong>Código:</strong> ${cca2}</p>
                    <div class="card-info">
                        <p><strong>🏛️ Capital:</strong> ${capital}</p>
                        <p><strong>🌍 Región:</strong> ${region}</p>
                        <p><strong>📍 Subregión:</strong> ${subregion}</p>
                        <p><strong>👥 Población:</strong> ${population}</p>
                        <p><strong>📏 Área:</strong> ${area} km²</p>
                        <p><strong>💵 Monedas:</strong> ${currencies}</p>
                        <p><strong>🗣️ Idiomas:</strong> ${languages}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    countriesContainer.innerHTML = countriesHTML;
};

fetchCountries();