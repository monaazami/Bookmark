document.getElementById('myForm').addEventListener("submit", saveBookmark);

function saveBookmark(e){
    var siteName=document.getElementById("siteName").value;
    var siteUrl=document.getElementById("siteUrl").value;
    var bookmark={
        name:siteName,
        Url:siteUrl
    }
    if(localStorage.getItem("bookmarks")==null){
        var bookmarks=[];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }else{
        var bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }
    e.preventDefault();
}

function fetchBookmark(){
    var bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
    console.log(bookmarks);
    var bookmarksResult=document.getElementById("bookmarksResults");
    bookmarksResult.innerHTML ="";
    for(var i=0;i<bookmarks.length;i++){
        var name=bookmarks[i].name;
        var Url=bookmarks[i].Url;
        bookmarksResult.innerHTML += `<div class="card bg-light text-dark card-body">`+
                                      `<h1>`+name+`</h1>`+
                                      `<a class="btn btn-primary" target="_blank" href="` + Url+ ` ">Visit the site</a>`+
                                      `<a onclick=deleteBookmark(\"`+Url+`"\) class="btn btn-danger" href="#">Delete</a>`+
                                      `</div>`
    }
}




document.getElementById("bookmarksResults")