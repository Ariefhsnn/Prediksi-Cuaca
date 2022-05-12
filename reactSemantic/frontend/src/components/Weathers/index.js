import { AiOutlineLoading } from "react-icons/ai";
import React from "react";

const Weathers = ({ weathers, loading, query }) => {
  if (loading) {
    return (
      <div className="col-span-2 text-center">
        <AiOutlineLoading className="animate-spin justify-self-center text-sky-600 w-14 h-14 my-48 mx-auto" />
      </div>
    );
  }

  const today = new Date();

  /* eslint-disable */
  function SwitchCase(props) {
    switch (props.value) {
      case "0":
        return "Cerah";
        break;
      case "1":
        return "Cerah Berawan";
        break;
      case "2":
        return "Cerah Berawan";
        break;
      case "3":
        return "Berawan";
        break;
      case "4":
        return "Berawan Tebal";
        break;
      case "5":
        return "Udara Kabur";
        break;
      case "10":
        return "Asap";
        break;
      case "45":
        return "Kabut";
        break;
      case "60":
        return "Hujan Ringan";
        break;
      case "61":
        return "Hujan Sedang";
        break;
      case "63":
        return "Hujan Lebat";
        break;
      case "80":
        return "Hujan Lokal";
        break;
      case "95":
        return "Hujan Petir";
        break;
      case "97":
        return "Hujan Petir";
        break;
      default:
        break;
    }
  }
  /* eslint-enable */

  return (
    <>
      <div className="grid col-span-2 mt-5">
        <table className="border-separate border border-sky-600 md:table-auto">
          <thead className="text-lg py-4 uppercase text-sky-600">
            <th className="text-left border border-sky-600 pl-2"> Kota </th>
            <th className="text-left border border-sky-600 pl-2"> Provinsi</th>
            <th className="border border-sky-600"> Temperatur</th>
            <th className="border border-sky-600"> Cuaca Siang</th>
            <th className="border border-sky-600"> Cuaca Malam</th>
          </thead>
          {weathers
            .filter((val) => {
              if (query === "") {
                return val;
              } else if (val.kota.toLowerCase().includes(query.toLowerCase())) {
                return val;
              }
            })
            .map((data) => {
              return (
                <>
                  <tbody className="space-y-0.5 text-slate-700">
                    <td className="border border-sky-800 pl-2">
                      {" "}
                      {data.kota}{" "}
                    </td>
                    <td className="border border-sky-800 pl-2">
                      {" "}
                      {data.provinsi}{" "}
                    </td>
                    {data.parameter
                      .filter((param) =>
                        param.date.includes(today.getDate() + 1)
                      )
                      .map((filteredDate) => {
                        return (
                          <>
                            <td className="text-center border border-sky-800">
                              {filteredDate.temp_min} - {filteredDate.temp_max}
                            </td>
                            <td className="text-center border border-sky-800">
                              <SwitchCase value={filteredDate.weather_day} />
                            </td>
                            <td className="text-center border border-sky-800">
                              <SwitchCase value={filteredDate.weather_night} />
                            </td>
                          </>
                        );
                      })}
                  </tbody>
                </>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default Weathers;
