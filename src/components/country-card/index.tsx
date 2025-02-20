import { Card, CardContent } from "@/components/ui/card";
import { Country } from "@/types/country";
import Link from "next/link";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/${country.cca2}`}>
     <Card
      key={country.name.common}
      className="p-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
    >
      <img
        src={country.flags.svg}
        alt={`${country.name.common} Flag`}
        className="w-full h-40 object-cover rounded-md"
      />
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">{country.name.common}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Official Name:</strong> {country.name.official}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Region:</strong> {country.region}
        </p>
        <p className="text-gray-700">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
      </CardContent>
    </Card>
    </Link>
   
  );
}
