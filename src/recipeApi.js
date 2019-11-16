const appId = "app_id=8d9a0a8a";
const apiKey = "app_key=61cfb40830621f827735b64fd206f438";


export const recipeData = searchQuery => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
  

    xhr.open(
      "GET",
      `https://api.edamam.com/search?q=${searchQuery}&to=20&${appId}&${apiKey}`,
      true
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhr.onload = function() {
      if (this.status === 200) {
        let data = JSON.parse(this.responseText);
        let recipes = data.hits.map(hit => hit.recipe);
        resolve(recipes);
      }
    };

    xhr.onerror = function() {
      reject('oops, there was an error making the request.');
      
    };

    xhr.send();
  });
}

