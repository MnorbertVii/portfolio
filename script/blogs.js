function retrieveBlogs(){
    let  retrieve = JSON.parse(localStorage.getItem("blogList"));
    return retrieve?.map(blog => {
        return `<div class="first-content">
        <p class="blog-title">${blog.title}</p>
        <p class="blog-description">${blog.description}
        </p>
        <a href="singlepost.html" class="read-more"><u>Read more&rarr;</u></a>
        <div class="profile-info">
            <div class="profile-pic">
                <img src=${blog.file} alt="!!" class="profile-img">
            </div>
            <div class="names-date">
                <p class="names">Paul Mugisha</p>
                <p class="date">${blog.date}</p>
            </div>
        </div>
        <div class="interactions">
            <div class="comments">
                <p class="comments-number">10 comments</p>
            </div>
            <div class="likes">
                <p class="likes-number">2 likes</p>
            </div>
        </div>
    </div>`
    }).join("");
}

document.querySelector(".blogs-content").innerHTML = retrieveBlogs();