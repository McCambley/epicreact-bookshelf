function client(endpoint, customConfig = {}) {
  // 🐨 create the config you'll pass to window.fetch
  //    make the method default to "GET"
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...customConfig,
  }
  // 💰 if you're confused by this, that's fine. Scroll down to the bottom
  // and I've got some code there you can copy/paste.
  // 🐨 call window.fetch(fullURL, config) then handle the json response
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      console.log('error', data)
      if (data.status > 400) {
        return Promise.reject(data)
      } else {
        return data
      }
    })

  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // 💰 here's how to get the full URL: `${process.env.REACT_APP_API_URL}/${endpoint}`
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
