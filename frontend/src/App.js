import React, { useEffect, useState } from "react";

import Footer from "./components/footer";
import Pagination from "./components/Pagination";
import Weathers from "./components/Weathers";
import axios from "axios";
import bmkgLogo from "./assets/bmkg.png";

const baseUrl = "http://localhost:4000/weather";

const App = () => {
  const [weathers, setWeathers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weathersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [select, setSelect] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchWeathers = async () => {
      setLoading(true);
      const res = await axios.get(baseUrl);
      setWeathers(res.data);
      setLoading(false);
    };
    fetchWeathers();
  }, []);

  const today = new Date();
  const indexOfLastWeather = currentPage * weathersPerPage;
  const indexOfFirstWeather = indexOfLastWeather - weathersPerPage;
  const currentWeather = weathers
    .filter((val) => {
      if (q === "") {
        return val;
      } else if (
        val.parameter[1].weather_day === q ||
        val.parameter[1].weather_night === q
      ) {
        return val;
      }
    })
    .filter((val) => {
      if (select === "") {
        return val;
      } else if (val.provinsi.includes(select)) {
        return val;
      }
    })
    .filter((val) => {
      if (query === "") {
        return val;
      } else if (val.kota.toLowerCase().includes(query.toLowerCase())) {
        return val;
      }
    })
    .slice(indexOfFirstWeather, indexOfLastWeather);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const provinsi = [
    {
      provinsi: "Jawa Barat",
    },
    { provinsi: "Jawa Tengah" },
    { provinsi: "Jawa Timur" },
  ];

  const cuaca = [
    {
      cuaca: "Cerah",
      code: "0",
    },
    {
      cuaca: "Cerah Berawan",
      code: "1",
    },
    {
      cuaca: "Cerah Berawan",
      code: "2",
    },
    {
      cuaca: "Berawan",
      code: "3",
    },
    {
      cuaca: "Berawan Tebal",
      code: "4",
    },
    {
      cuaca: "Udara Kabur",
      code: "5",
    },
    {
      cuaca: "Asap",
      code: "10",
    },
    {
      cuaca: "Kabut",
      code: "45",
    },
    {
      cuaca: "Hujan Ringan",
      code: "60",
    },
    {
      cuaca: "Hujan Sedang",
      code: "61",
    },
    {
      cuaca: "Hujan Lebat",
      code: "63",
    },
    {
      cuaca: "Hujan Lokal",
      code: "80",
    },
    {
      cuaca: "Hujan Petir",
      code: "95",
    },
    {
      cuaca: "Hujan Petir",
      code: "97",
    },
  ];

  function getDateToday(params) {
    if (params === 0) {
      return "Januari";
    } else if (params === 1) {
      return "Februari";
    } else if (params === 2) {
      return "Maret";
    } else if (params === 3) {
      return "April";
    } else if (params === 4) {
      return "Mei";
    } else if (params === 5) {
      return "Juni";
    } else if (params === 6) {
      return "Juli";
    } else if (params === 7) {
      return "Agustus";
    } else if (params === 8) {
      return "September";
    } else if (params === 9) {
      return "Oktober";
    } else if (params === 10) {
      return "November";
    } else if (params === 11) {
      return "Desember";
    }
  }

  return (
    <div className="App container mx-auto">
      <div className="grid grid-cols-2 md:col-span-2">
        <div className="justify-self-start my-10">
          <h1 className="text-4xl font-semibold font-serif text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-white to-green-500">
            {" "}
            Prediksi Cuaca{" "}
          </h1>
        </div>
        <div className="justify-self-end my-12 flex text-lg">
          <div>
            <a
              href=""
              className="py-2 mt-2 px-4 text-white hover:text-black hover:bg-white hover:font-bold rounded hover:shadow-lg"
            >
              About
            </a>
          </div>
        </div>
      </div>
      <hr className="mb-10"></hr>
      <div className="mb-5 col-span-2 text-center">
        <p className="text-3xl font-bold font-serif">
          {" "}
          Prediksi Cuaca di Pulau Jawa{" "}
        </p>
        {/* {console.log(today)} */}
        <p className="text-lg mt-4 mb-10">
          {" "}
          {/* {today.getDate() + 1} */}
          {today.getDate() +
            1 +
            " " +
            getDateToday(today.getMonth()) +
            " " +
            today.getFullYear()}
          {/* {today.getFullYear()}{" "} */}
        </p>
      </div>
      <div className="flex flex-wrap">
        {/* <p className="mb-2 block">Filter Provinsi :</p> */}
        <div className="flex border-2 text-sky-600 rounded mt-8">
          <input
            type="text"
            className="px-4 w-56 inline-block"
            placeholder="Cari berdasarkan kota..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex-none">
          <p className="mb-2">Filter Provinsi :</p>
          <select
            className="form-select appearance-none
                inline
                w-56
                px-3
                py-2
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border-2 border-solid border-gray-300
                rounded
                transition
                ease-in-out
                align-middle
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option selected> </option>
            {provinsi.map((prov) => {
              return <option value={prov.provinsi}>{prov.provinsi}</option>;
            })}
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2">Filter Cuaca :</p>
          <select
            className="form-select appearance-none
                inline
                w-56
                px-3
                py-2
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border-2 border-solid border-gray-300
                rounded
                transition
                ease-in-out
                align-middle
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            onChange={(e) => setQ(e.target.value)}
          >
            a<option selected> </option>
            {cuaca.map((c) => {
              return <option value={c.code}>{c.cuaca}</option>;
            })}
          </select>
        </div>
      </div>

      <Weathers weathers={currentWeather} loading={loading} query={query} />
      <Pagination
        weatherPerPage={weathersPerPage}
        totalWeather={weathers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Footer className="col-span-2" />
    </div>
  );
};

export default App;
