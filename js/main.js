document.getElementById('myForm').addEventListener("submit", saveBookmark);
// save the site name and URL in local storage
function saveBookmark(e){
    var siteName=document.getElementById("siteName").value;
    var siteUrl=document.getElementById("siteUrl").value;
    //validate if the form is empty or unvalide URL
    if(!siteName||!siteUrl){
        alert("Please fill the form");
        return false;
    }
    if(!siteUrl.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)){
        alert("Please fenter a valid URL!");
        return false;
    }
    var bookmark={
        name:siteName,
        Url:siteUrl
    }
    //check if it is the first bookmarked site (bookmarks is empty array)
    if(localStorage.getItem("bookmarks")==null){
        var bookmarks=[];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }else{
        var bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }


    // reset the form after submitting data
    document.getElementById("myForm").reset();
    fetchBookmark();
    // prevent function of default behavior 
    e.preventDefault();
}


// delete button
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

// fetch websites from local storage and inject the data in an empty div with bookmarksResult id 
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




