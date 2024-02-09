function loaddata(){
    fetch('/api/musicpage')
    .then(response => response.json())
    .then(data => {
    console.log(data)       
    })
}
loaddata()