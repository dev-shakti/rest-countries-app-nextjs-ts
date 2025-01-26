import { Country } from "@/types/country";
import CountryCard from "../country-card";


interface CountriesListProp {
  countryList: Country[];
}

export default function CountriesList({ countryList }: CountriesListProp) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mg:grid-cols-3 lg:grid-cols-4 gap-6">
      {countryList && countryList.length > 0 ? (
        countryList.map((country) => (
          <CountryCard country={country} key={country.name.common}/>
        ))
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
}
