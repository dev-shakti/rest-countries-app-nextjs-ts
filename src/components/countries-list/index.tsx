"use client";
import { Country } from "@/types/country";
import CountryCard from "../country-card";
import { Input } from "../ui/input";
import { useState, ChangeEvent, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

interface CountriesListProp {
  countryList: Country[];
}

export default function CountriesList({ countryList }: CountriesListProp) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>(countryList);

  const pathname: string = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm: string = searchParams.get("search") || "";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value; // Capture input value
    setSearchQuery(value); // Update local state

    // Update query params in the URL
    router.push(`${pathname}?search=${value}`);
  }

  useEffect(() => {
    async function fetchCountries() {
      if (searchQuery) {
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${searchQuery}`
          );
          if (response.ok) {
            const data: Country[] = await response.json();
            setCountries(data);
          } else {
            console.log("Error fetching countries:", response.statusText);
            setCountries([]);
          }
        } catch (error) {
          console.log("Error fetching countries:", error);
          setCountries([]);
        }
      } else {
        setCountries(countryList);
      }
    }

    const debounceFn = setTimeout(fetchCountries, 500);
    return () => clearTimeout(debounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (searchTerm) {
      setSearchQuery(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="w-full flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleChange}
          className="w-full p-2 border-none outline-none text-base md:text-lg text-gray-600 placeholder:text-gray-400"
        />
        <SearchIcon className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-600 transition-all duration-300 ease-in-out" />
      </div>

      <h1 className="font-extrabold text-4xl my-8">List of countries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mg:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries && countries.length > 0 ? (
          countries.map((country) => (
            <CountryCard country={country} key={country.name.common} />
          ))
        ) : (
          <p className="text-xl text-red-500">No countries found.</p>
        )}
      </div>
    </>
  );
}
