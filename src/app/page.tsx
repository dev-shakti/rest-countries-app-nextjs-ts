import CountriesList from "@/components/countries-list";
import { Country } from "@/types/country";


async function fetchListofCountries():Promise<Country[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data as Country[];
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}

export default async function Home() {
  const getListOfCountries = await fetchListofCountries();
  console.log(getListOfCountries);

  return (
    <div className="flex flex-col w-full min-h-screen ">
      {/* header section */}
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* search and filter section */}
        <h1 className="font-extrabold text-4xl mb-8">List of countries</h1>
        <div className="flex-1">
          <CountriesList countryList={getListOfCountries} />
        </div>
      </div>
    </div>
  );
}
