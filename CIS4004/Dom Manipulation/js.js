//Leonardo Tjong
//Week 5- DOM Manipulation

// Toggle visibility of the filter form
function showFilter() {
    var filterForm = document.getElementById("filterContent");
    if (filterForm.style.display === "none") {
        filterForm.style.display = "block";
    } else {
        filterForm.style.display = "none";
    }
}

// Toggle visibility of the add new article form
function showAddNew() {
    var newContentForm = document.getElementById("newContent");
    if (newContentForm.style.display === "none") {
        newContentForm.style.display = "flex";
    } else {
        newContentForm.style.display = "none";
    }
}

// Filter articles based on checkbox state
function filterArticles() {
    var showOpinion = document.getElementById("opinionCheckbox").checked;
    var showRecipe = document.getElementById("recipeCheckbox").checked;
    var showUpdate = document.getElementById("updateCheckbox").checked;
    
    var articles = document.getElementsByTagName("article");
    
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        
        if (article.classList.contains("opinion")) {
            article.style.display = showOpinion ? "" : "none";
        } else if (article.classList.contains("recipe")) {
            article.style.display = showRecipe ? "" : "none";
        } else if (article.classList.contains("update")) {
            article.style.display = showUpdate ? "" : "none";
        }
    }
}

// Add new article to the list
function addNewArticle() {
    var header = document.getElementById("inputHeader").value;
    var text = document.getElementById("inputArticle").value;
    
    // Get the selected article type
    var articleType = "";
    if (document.getElementById("opinionRadio").checked) {
        articleType = "opinion";
    } else if (document.getElementById("recipeRadio").checked) {
        articleType = "recipe";
    } else if (document.getElementById("lifeRadio").checked) {
        articleType = "update";
    }
    
    // Validate inputs
    if (header === "" || text === "" || articleType === "") {
        alert("Please fill in all fields");
        return;
    }
    
    // Get the article list
    var articleList = document.getElementById("articleList");
    
    // Create new article element
    var newArticle = document.createElement("article");
    newArticle.className = articleType;
    
    // Generate a unique ID
    var articleId = "a" + (document.getElementsByTagName("article").length + 1);
    newArticle.id = articleId;
    
    // Create the article content
    var typeLabel = "";
    if (articleType === "opinion") {
        typeLabel = "Opinion";
    } else if (articleType === "recipe") {
        typeLabel = "Recipe";
    } else if (articleType === "update") {
        typeLabel = "Update";
    }
    
    newArticle.innerHTML = 
        '<span class="marker">' + typeLabel + '</span>' +
        '<h2>' + header + '</h2>' +
        '<p>' + text + '</p>' +
        '<p><a href="moreDetails.html">Read more...</a></p>';
    
    // Add the new article to the list
    articleList.appendChild(newArticle);
    
    // Clear the form
    document.getElementById("inputHeader").value = "";
    document.getElementById("inputArticle").value = "";
    document.getElementById("opinionRadio").checked = false;
    document.getElementById("recipeRadio").checked = false;
    document.getElementById("lifeRadio").checked = false;
    
    // Hide the form after adding
    document.getElementById("newContent").style.display = "none";
}
