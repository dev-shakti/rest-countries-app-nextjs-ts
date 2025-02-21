import CountriesList from "@/components/countries-list";
import { Country } from "@/types/country";
import { Suspense } from "react";

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

  return (
    <div className="flex flex-col w-full min-h-screen ">
      {/* header section */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 md:px-6">
        <Suspense fallback={<div>Loading countries...</div>}>
          <CountriesList countryList={getListOfCountries} />
        </Suspense>
      </div>
    </div>
  );
}
