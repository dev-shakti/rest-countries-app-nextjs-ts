"use client";
import { CountryDetailType } from "@/types/countryDetail";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function CountryDetail() {
  const [countryDetails, setCountryDetails] =
    useState<CountryDetailType | null>(null);
  const { details } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!details) {
      setError("Country code is missing.");
      setLoading(false);
      return;
    }
    async function fetchCountryDetail() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${details}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch country details: ${response.statusText}`
          );
        }
        const [country] = await response.json();
        setCountryDetails(country);
      } catch (error) {
        console.error("Error fetching country detail", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchCountryDetail();
  }, [details]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex flex-col justify-center items-center">
        <Loader className="animate-spin text-gray-700" size={40} />
        <p className="text-lg font-semibold text-gray-700 mt-3">
          Loading... Please wait
        </p>
      </div>
    );
  }
  if (error !== null) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <p className="text-lg font-semibold text-red-500 mt-3">{error}</p>
      </div>
    );
  }

  if (!countryDetails) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-700 mt-3">{error}</p>
      </div>
    );
  }

  return (
    <div className=" px-4 md:px-6 py-12 max-w-6xl  mx-auto">
      <Link href="/">
        {" "}
        <Button>Back to Home</Button>
      </Link>

      <Card className="w-full h-auto mt-6  rounded-xl shadow-xl bg-white border border-gray-200 ">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="h-full w-full flex items-center justify-center">
            <img
              src={countryDetails?.flags?.svg || "/placeholder.png"}
              alt={`${countryDetails?.name?.common || "Unknown"} Flag`}
              className="h-full w-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-gray-700 mb-4">
              <strong>Name: </strong>
              {countryDetails?.name?.official || "N/A"}
            </h2>
            <p className="font-semiblod text-lg text-gray-700">
              <strong>Region: </strong>
              {countryDetails?.region || "Unknown"}
            </p>
            <p className="font-semiblod text-lg text-gray-700">
              <strong>Population:</strong>{" "}
              {countryDetails?.population?.toLocaleString() || "N/A"}
            </p>
            <p className="font-semiblod text-lg text-gray-700">
              <strong>Capital:</strong>{" "}
              {countryDetails?.capital?.join(", ") || "N/A"}
            </p>
            <p className="font-semiblod text-lg text-gray-700">
              <strong>Continent:</strong>{" "}
              {countryDetails?.continents?.join(", ") || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
