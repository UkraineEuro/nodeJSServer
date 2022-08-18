
function sendRequest(method,url, body = null){
  return fetch(url).then(response =>{
    return response.json()
  })
}

module.exports = {sendRequest}
