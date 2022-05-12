import { useMemo } from "react";

const Pagination = ({
  weatherPerPage,
  totalWeather,
  paginate,
  currentPage,
}) => {
  const pageNumbers = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalWeather / weatherPerPage); i++) {
      pages.push(i);
    }
    return pages;
  });

  console.log(currentPage);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number, i) => (
          <div
            key={i}
            className="space-x-5 mx-auto mt-10 col-span-2 justify-center"
          >
            <li
              key={number}
              className="float-left mb-4 rounded-full mx-0.5 border-2 border-sky-600"
            >
              <button
                onClick={() => paginate(number)}
                className={`${
                  number !== currentPage
                    ? "bg-white page px-5 text-center rounded-full hover:bg-sky-600 hover:text-white"
                    : "bg-sky-600 text-white px-5 text-center rounded-full hover:bg-sky-600 hover:text-white"
                }`}
              >
                {number}
              </button>
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
