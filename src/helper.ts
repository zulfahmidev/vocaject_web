import axios from "axios"
import FileDownload from "js-file-download"

export default {
  downloadFile(data) {
    axios.get(`/document/view/${data.filename}`, {
      responseType: 'arraybuffer'
    })
    .then(response => {
      FileDownload(response.data, data.origin_filename)
    })
  },
  async getFile(data) {
    let response = await axios.get(`/document/view/${data.filename}`, {
      responseType: 'arraybuffer'
    })
    return response.data
  }
}