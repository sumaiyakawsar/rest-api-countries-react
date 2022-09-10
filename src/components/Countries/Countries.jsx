import React, { useEffect, useState } from "react";
import Axios from "axios";
import SearchFilter from "../SearchFilter/SearchFilter";
import { Link } from "react-router-dom";
import { baseURL } from "../../api/api";
import Loading from "../../utils/Loading";
import Error from "../../utils/Error";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(``);

  // Gets all the countries from the API
  const getAllCountries = async () => {
    try {
      const res = await Axios.get(`${baseURL}/all`);

      // console.log("All:::::", res.data);

      //to sort title Alphabetically
      setCountries(
        res.data.sort((a, b) => a.name.common.localeCompare(b.name.common))
      );
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const searchCountryByName = async (countryName) => {
    try {
      const countryRes = await Axios.get(`${baseURL}/name/${countryName}`);

      // console.log("Country:::", countryRes);

      setCountries(
        countryRes.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const countryRes = await Axios.get(`${baseURL}/region/${regionName}`);

      // console.log("Region:::", countryRes.data);

      setCountries(
        countryRes.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const clearResults = () => getAllCountries();

  return (
    <section className="h-full my-20">
      <SearchFilter
        getCountryByName={searchCountryByName}
        onSelect={getCountryByRegion}
        clearResults={clearResults}
      />
      {loading && !error && <Loading />}
      {error && !loading && <Error error={error} />}
      <div className="countries-container container grid grid-cols-1 sm:grid-cols-2 justify-center md:grid-cols-3 lg:grid-cols-4 gap-10  w-4/5 mx-auto my-0">
        {/* Each country with Population, Region and Capital City */}

        {!error &&
          countries?.map((country, id) => (
            <Link
              to={`/rest-api-countries-react/countries/${country.cca3}`}
              key={id}
            >
              <div className="card rounded-md overflow-hidden flex flex-col flex-nowrap shadow-lg h-full dark:bg-[#2b3945] max-h-full">
                <div className="country__img flex-1">
                  <LazyLoadImage
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="country__img w-full  h-[150px] object-cover rounded-sm "
                  />
                </div>

                <div className="country__info p-4">
                  <h2 className="font-bold text-sm pb-4">
                    {country.name.common.length < 25
                      ? `${country.name.common}`
                      : `${country.name.common.substring(0, 25)}...`}
                  </h2>
                  <p className="text-base font-medium">
                    Population:
                    <span className="text-sm font-light ml-1">
                      {new Intl.NumberFormat().format(country.population)}
                    </span>
                  </p>
                  <p className="text-base font-medium">
                    Region:
                    <span className="text-sm font-light ml-1">
                      {country.region}
                    </span>
                  </p>
                  <p className="text-base font-medium">
                    Capital:
                    <span className="text-sm font-light ml-1">
                      {country.capital !== undefined
                        ? Object.values(country.capital).join(", ")
                        : "No capital info"}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Countries;
