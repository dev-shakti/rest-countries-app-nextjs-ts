import CountryDetail from "@/components/country-details";
import { CountryDetailType } from "@/types/countryDetail";

type ParamsType = {
  details: string;
};

async function fetchCountryDetail(
  countryCode: string
): Promise<CountryDetailType> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch country details: ${response.statusText}`
      );
    }
    const [country] = await response.json();
    return country;
  } catch (error) {
    console.log("Error fetching country detail", error);
    throw error;
  }
}
export default async function CountryDetailsPage({
  params,
}: {
  params: ParamsType;
}) {
  const countryDetails = await fetchCountryDetail(params.details);

  return (
    <CountryDetail
      countryDetails={countryDetails}
      key={countryDetails.name.common}
    />
  );
}
