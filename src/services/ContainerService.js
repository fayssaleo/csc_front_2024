import { months } from "../utils/fixtures";
import { checkStatus } from "../utils/http";
import axios from "axios";

class ConstainerService {
  loadContainers(
    excelFile,
    transshipment,
    exportContainer,
    importContainer,
    depotContainer,
    fullContainer,
    emptyContainer
  ) {
    const form_data = new FormData();
    form_data.append("file", excelFile.files[0]);
    const token = localStorage.getItem("token");
    axios.defaults.headers.post = {
      Authorization: `Bearer ${token}`,
    };
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://localhost:8082/api/loadContainers?transshipment=" +
            transshipment +
            "&exportContainer=" +
            exportContainer +
            "&importContainer=" +
            importContainer +
            "&depotContainer=" +
            depotContainer +
            "&fullContainer=" +
            fullContainer +
            "&emptyContainer=" +
            emptyContainer,
          form_data
        )
        .then((response) => {
          resolve(checkStatus);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  }
  /*loadContainers(excelFile){
    console.log(excelFile.files[0])
    const data = new FormData()
    data.append('file',excelFile)
    return this.authFetchPost('/api/loadContainers','POST',data)
    .then(checkStatus)
}*/

  loadContainersFromDb(
    month,
    year,
    transshipment,
    exportContainer,
    importContainer,
    depotContainer,
    fullContainer,
    emptyContainer
  ) {
    return this.authFetch(
      "/api/loadFromDb?month=" +
        month +
        "&year=" +
        year +
        "&transshipment=" +
        transshipment +
        "&exportContainer=" +
        exportContainer +
        "&importContainer=" +
        importContainer +
        "&depotContainer=" +
        depotContainer +
        "&fullContainer=" +
        fullContainer +
        "&emptyContainer=" +
        emptyContainer,
      "POST"
    ).then(checkStatus);
  }

  loadShippingLineNames() {
    return this.authFetch(`/api/shippingLines`)
      .then(checkStatus)
      .then((response) => response.json());
  }

  containersExist() {
    return this.authFetch("/api/containers/exist")
      .then(checkStatus)
      .then((response) => response.json());
  }

  deleteContainers() {
    return this.authFetch("/api/containers", "DELETE").then(checkStatus);
  }

  generateExcelFile(shippingLine, month, year) {
    return this.authFetch(
      `/api/excel?shippingLine=${shippingLine}&month=${month}&year=${year}`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download =
          "Storage_" +
          shippingLine +
          "_" +
          months[parseInt(month) - 1] +
          "_" +
          year +
          ".xlsx";
        a.click();
      });
    });
  }
  getContainerDetails(shippingLine, month, year) {
    return this.authFetch(
      `/api/containers/details?month=${month}&year=${year}&shippingLine=${shippingLine}`
    )
      .then(checkStatus)
      .then((response) => response.json());
  }
  getEmptyContainerDetails(shippingLine, month, year) {
    return this.authFetch(
      `/api/containers/empty?month=${month}&year=${year}&shippingLine=${shippingLine}`
    )
      .then(checkStatus)
      .then((response) => response.json());
  }

  authFetch(url, method = "get", body = null) {
    const token = localStorage.getItem("token");
    const requestParams = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    };
    return fetch(url, requestParams);
  }
  authFetchPost(url, method = "post", body = null) {
    const token = localStorage.getItem("token");
    const requestParams = {
      method: method,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    };
    return fetch(url, requestParams);
  }
}

const containerService = new ConstainerService();

export default containerService;
