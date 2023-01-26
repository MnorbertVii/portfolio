// we begin by getting references to the input fields from our html file
const form = document.getElementById("form");
const titleNew = document.getElementById("title");
const pic = document.getElementById("picture");
const desc = document.getElementById("description");
const time = document.getElementById("date");
const photo=document.getElementById("add-btn");


// declare an array to hold our blogs
const blogs = [];

// first check if there are no already existing blogs in local storage
const oldBlogs = JSON.parse(localStorage.getItem('blogList')) ?? [];
if(oldBlogs.length > 0){
    console.log("This is old blog:", oldBlogs);
    oldBlogs.forEach(item => {
        blogs.push(item);
    })
}
let file;


photo.addEventListener('change', e =>{
  const reader = new FileReader();
  reader.onloadend = function() {
    file=reader.result;
  }
  reader.readAsDataURL(e.target.files[0]);
})



// event handler to accept the data
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // base object for a blog
    const article = {
        header: null,
        description: null,
    }

    article.header = titleNew.value;
    article.description = desc.value;
    console.log(article)
    try{
        const serverRes = await axios({
            method: 'POST',
            url: 'http://localhost:1000/articles/create',
            data: article
        })
        alert(serverRes.data.message)
        location.reload()
    }catch (error){
        return alert(error.response.data.error)
    }
   

    
})
async function load(){
    let holder = document.getElementById("blogTable")
    const res = await axios({
        method: 'GET',
        url: 'http://localhost:1000/articles/all'
    })
    let records = ` <tr>
    <th>Photo</th>
    <th>Title</th>
    <th>Content</th>
    <th>date</th>
  </tr>`;
    console.log(res.data.data.articles)
    res.data.data.articles.forEach((record)=>{
        records += `
        <tr>
        <th>Photo</th>
        <th>${record.header}</th>
        <th>${record.description}</th>
        <th>up to date</th>
        <td><button class="edit" style="width:4rem; height:2rem;background-color:green; border-style:none; color:white; cursor:pointer" onclick="edit(this)">Edit</button></td>
        <td><button class="delete" style="width:4rem; height:2rem; background-color:red; border-style:none; color:white; cursor:pointer">Delete</button></td>
      </tr>
        `
    })
    holder.innerHTML = records;
}













