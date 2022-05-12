const fs = require("fs");

module.exports.index = async (req, res, data) => {
  // if (rawcity) {
  //   city = rawcity
  //     .toLowerCase()
  //     .split(" ")
  //     .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  //     .join(" ");
  // } else {
  //   res.send("Parameter kota tidak boleh kosong");
  // }

  fs.readFile("cache/weather.json", (err, data) => {
    let weather = JSON.parse(data.toString());

    return res.json(weather);
  });
};
