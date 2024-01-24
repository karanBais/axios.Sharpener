// GET REQUEST
function getTodos() {
  axios
  .get('https://reqres.in/api/users?page=2')
  .then(res => showOutput(res))
  .catch(err => console.log(err))
}
// POST REQUEST
function addTodo() {
  axios.post('https://reqres.in/api/users', {
    title: 'Userdetails',
    userName: 'karan bais',
    email: 'karanb479@gmail.com'
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
  .patch('https://reqres.in/api/users/841',{
    title: 'userDetails Updated',
    userName: 'karan Bais',
    email: 'karanbais305@gmail.com'
  })
  .then( res => showOutput(res))
  .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios
  .delete('https://reqres.in/api/users/841')
  .then( res => showOutput(res))
  .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://reqres.in/api/users?page=2'),
    axios.get('https://reqres.in/api/unknown')
  ])
  .then(axios.spread((users, unknown) => showOutput(unknown)))
  .catch(err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'My Token'
    }
  };
  axios
  .post('https://reqres.in/api/users',{
    title: "User Details",
    UserName: "Karan Bais"
  },config)

  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method:"post",
    url: 'https://reqres.in/api/users?page=2',
    data: {
      title: "HELLO SHARPENER"
    },
    transformResponse:  axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios
  .get('https://reqres.in/api/users')
  .then(res => showOutput(res))
  .catch(err => {
    if(err.respone){
      console.log(err.respone.data);
      console.log(err.respone.status);
      console.log(err.respone.headers);

      if(err.respone.data === 404){
        alert("Error: Page not found");
      }
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
 const source = axios.cancelToken.source();

 axios
 .get('https://reqres.in/api/users?page=2')
 cancelToken: source.token
 .then(res => showOutput(res))
 .catch(thrown =>{
  if(axios.isCance(thrown)){
    console.log("Request Canceled", thrown.message);
  }
 });
 if(true){
  source.cancel("Request cancel")
 }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(`${config.method.toUpperCase()} Request sent to ${config.url} at ${new Date().getTime}`);
    return config;
  },
  error => {
    return Promise.reject(error)
  }
  );

// AXIOS INSTANCES
// const axiosInstance = axios.create({
//   baseURl: 'https://reqres.in/api/users?page=2'
// });
// axiosInstance.get('/comments').then(res => showOutput(res))

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
