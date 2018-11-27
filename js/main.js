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
    document.getElementById("myForm").reset();
    fetchBookmark();
    
    e.preventDefault();
}



function deleteBookmark(Url){
    var bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
    for(var i=0;i<bookmarks.length;i++){
        if (bookmarks[i].Url===Url){
            bookmarks.splice(i,1);
            
        }
    }
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    document.getElementById("myForm").reset();
    fetchBookmark();
}

function fetchBookmark(){
    var bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
    var bookmarksResult=document.getElementById("bookmarksResults");
    bookmarksResult.innerHTML ="";
    for(var i=0;i<bookmarks.length;i++){
        var name=bookmarks[i].name;
        var Url=bookmarks[i].Url;
        bookmarksResult.innerHTML += `<div class="card bg-light text-dark card-body">`+
                                      `<h4>`+name+`<small>`+ Url +`</small></h4>`+
                                      
                                      `<div class="container "><a class="btn btn-primary good" target="_blank" href="` + Url+ ` ">Visit the site</a>`+
                                      `<a onclick=deleteBookmark(\"`+Url+`"\) class="btn btn-danger good" href="#">Delete</a></div>`+
                                      `</div>`
    }
}




