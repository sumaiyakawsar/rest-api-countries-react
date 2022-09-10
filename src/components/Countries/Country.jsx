import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { baseURL } from "../../api/api";
import Axios from "axios";
import { BiArrowBack } from "react-icons/bi";

import Loading from "../../utils/Loading";
import Error from "../../utils/Error";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Country = () => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(``);
  const [borderC, setBorderC] = useState([]);

  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const countryRes = await Axios.get(`${baseURL}/alpha/${countryName}`);

        console.log("Country:::", countryRes.data);
        
        setCountry(countryRes.data);

        if (countryRes.data[0].borders !== undefined) {
          getBorderCountryByName(countryRes.data[0].borders);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getCountryByName();
  }, [countryName]);

  const getBorderCountryByName = async (borderName) => {
    
    try {
      const bordersRes = await Axios.get(
        `${baseURL}/alpha?codes=${borderName.join(",")}`
      );
      setBorderC(bordersRes.data);
   
    } catch (error) {
      setError(error.message);
    }
 
  };

  // console.log("borderC", borderC);

  return (
    <section className="country__info my-20">
      <div className="container w-4/5 mx-auto my-0">
        <div className="py-8">
          <button>
            <Link
              to="/rest-api-countries-react"
              className="bg-neutral-50 dark:bg-[#2b3945] flex items-center shadow-md gap-4 px-4 py-2 rounded-md"
            >
              <BiArrowBack />
              Back
            </Link>
          </button>
        </div>
        {loading && !error && <Loading />}
        {error && <Error error={error} />}
        {/* Country with 
        Flag 
        Name
        Native Name
        Population
        Region
        Sub Region
        Capital

        Top Level Domain
        Currencies
        Languages

        Border Countries
        */}

        {country?.map((country, index) => {
          return (
            <div
              className="country__info grid grid-cols-1  lg:grid-cols-2 gap-12 py-8 items-center "
              key={index}
            >
              <div className="country__info-img h-[350px]  ">
                <LazyLoadImage
                  src={country.flags.svg}
                  alt={country.name.common}
                  className=" w-full h-full object-cover shadow-lg"
                />
              </div>

              <div className="country__info-details flex flex-col  gap-10 ">
                <h2 className="font-bold text-lg ">{country.name.common}</h2>
                <div className="more__info flex flex-col sm:flex-row gap-16 text-sm ">
                  <div className="info-left flex flex-col gap-2 ">
                    <p className="font-bold  flex flex-wrap">
                      Native Name:
                      <span className="ml-1 ">
                        {country.name.nativeName !== undefined
                          ? Object.values(country.name.nativeName).map(
                              (nName, id) => (
                                <span
                                  key={id}
                                  className=" font-semibold dark:text-neutral-50/80"
                                >
                                  {(id ? ", " : "") + nName.common}
                                </span>
                              )
                            )
                          : country.name.official}
                      </span>
                    </p>
                    <p className="font-bold">
                      Population:
                      <span className=" font-semibold dark:text-neutral-50/80 ml-1">
                        {country.population !== undefined
                          ? new Intl.NumberFormat().format(country.population)
                          : "No Population info"}
                      </span>
                    </p>
                    <p className="font-bold">
                      Region:
                      <span className="dark:text-neutral-50/80  font-semibold ml-1">
                        {country.region ? country.region : "No region info"}
                      </span>
                    </p>
                    <p className="font-bold">
                      Sub Region:
                      <span className="dark:text-neutral-50/80  font-semibold ml-1">
                        {country.subregion !== undefined
                          ? country.subregion
                          : "No subregion info"}
                      </span>
                    </p>
                    <p className="font-bold">
                      Capital:
                      <span className="dark:text-neutral-50/80  font-semibold ml-1">
                        {country.capital !== undefined
                          ? Object.values(country.capital).join(", ")
                          : "No capital info"}
                      </span>
                    </p>
                  </div>
                  <div className="info-right flex flex-col gap-2 ">
                    <p className="font-bold">
                      Top Level domain:
                      <span className="dark:text-neutral-50/80 font-semibold ml-1">
                        {country.tld !== undefined
                          ? Object.values(country.tld).join(", ")
                          : "No tld info"}
                      </span>
                    </p>
                    <p className="font-bold">
                      Currencies:
                      {country.currencies !== undefined ? (
                        Object.values(country.currencies).map(
                          (currency, id) => (
                            <span
                              className="dark:text-neutral-50/80 font-semibold ml-1"
                              key={id}
                            >
                              {currency.name}
                            </span>
                          )
                        )
                      ) : (
                        <span className="dark:text-neutral-50/80 font-semibold ml-1">
                          No currencies info
                        </span>
                      )}
                    </p>
                    <p className="font-bold">
                      Languages:
                      <span className="dark:text-neutral-50/80 font-semibold ml-1">
                        {country.languages !== undefined
                          ? Object.values(country.languages).join(", ")
                          : "No languages info"}
                      </span>
                    </p>
                  </div>
                </div>

                {country.borders !== undefined ? (
                  <div className="border__countries ">
                    <h4 className="text-sm font-bold flex flex-wrap gap-4">
                      Border Countries:
                      {borderC?.map((border, id) => (
                        <Link
                          to={`/rest-api-countries-react/countries/${border.cca3}`}
                          key={id}
                        >
                          <span className="bg-neutral-50 dark:bg-[#2b3945] dark:text-neutral-50/80 font-semibold py-1 px-4 shadow-lg  rounded-md">
                            {border.name.common}
                          </span>
                        </Link>
                      ))}
                    </h4>
                  </div>
                ) : (
                  <div className=" ">
                    <h4 className="text-sm font-bold flex flex-wrap gap-4">
                      This country has no borders
                    </h4>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Country;
