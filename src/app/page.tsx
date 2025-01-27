import CountriesList from "@/components/countries-list";
import { Country } from "@/types/country";

async function fetchListofCountries(): Promise<Country[]> {
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
  //console.log(getListOfCountries);

  return (
    <div className="flex flex-col w-full min-h-screen ">
      {/* header section */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
        <CountriesList countryList={getListOfCountries} />
      </div>
    </div>
  );
}
