const fName = document.getElementById("nm");
const mail = document.getElementById("mail");
const message = document.getElementById("message");
const submit = document.getElementById('submit');

submit.addEventListener('submit', async function(e){
    e.preventDefault();

    addMessage()
})

async function addMessage(){
    const messageData = {
        Names: null,
        email: null,
        message: null
    }

    messageData.Names = fName.value;
    messageData.email = mail.value;
    messageData.message = message.value;

    console.log(messageData)

    try{
        const token = sessionStorage.getItem('token');
        const response = await axios({
            method:'POST',
            url: 'http://localhost:1000/messages/create',
            data: messageData,
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        });
        alert(response.data.message)
        location.reload()
    }catch(error){
        return alert(error.response.data.error)
    }

}

// async function load(){
//     let holder = document.getElementById("blogTable")
//     const res = await axios({
//         method: 'GET',
//         url: 'http://localhost:1000/articles/all'
//     })
//     let records = ` <tr>
//     <th>Photo</th>
//     <th>Title</th>
//     <th>Content</th>
//     <th>date</th>
//   </tr>`;
//     console.log(res.data.data.articles)
//     res.data.data.articles.forEach((record)=>{
//         records += `
//         <tr>
//         <th>Photo</th>
//         <th>${record.header}</th>
//         <th>${record.description}</th>
//         <th>up to date</th>
//         <td><button class="edit" style="width:4rem; height:2rem;background-color:green; border-style:none; color:white; cursor:pointer" onclick="edit(this)">Edit</button></td>
//         <td><button class="delete" style="width:4rem; height:2rem; background-color:red; border-style:none; color:white; cursor:pointer">Delete</button></td>
//       </tr>
//         `
//     })
//     holder.innerHTML = records;
// }
