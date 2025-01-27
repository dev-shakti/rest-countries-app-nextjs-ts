"use client";
import { CountryDetailType } from "@/types/countryDetail";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CountryDetail({
  countryDetails,
}: {
  countryDetails: CountryDetailType;
}) {
  const router = useRouter();
  return (
    <div className="my-12 px-4 max-w-5xl mx-auto">
      <Button onClick={() => router.push("/")}>Back to Home</Button>
      <Card className="w-full mt-6  rounded-md shadow-md border border-gray-200 ">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div>
            <img
              src={countryDetails.flags.svg}
              alt={`${countryDetails.name.common} Flag`}
              className="h-full w-full object-cover rounded-md"
            ></img>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-gray-700 mb-4">
              <strong>Name: </strong>
              {countryDetails.name.official}
            </h2>
            <p className="font-semiblod text-lg text-gray-700">
              <strong>Region: </strong>
              {countryDetails.region}
            </p>
            <p className="font-semiblod text-lg text-gray-700">
              <strong>Population:</strong>{" "}
              {countryDetails.population.toLocaleString()}
            </p>
            <p className="font-semiblod text-lg text-gray-700">
              <strong>Capital:</strong> {countryDetails.capital.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
