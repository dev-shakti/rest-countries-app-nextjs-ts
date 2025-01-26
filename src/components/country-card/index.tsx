import { Card, CardContent } from "@/components/ui/card";
import { Country } from "@/types/country";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Card
      key={country.name.common}
      className="p-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer"
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
          <strong>Region:</strong> {country.population.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
