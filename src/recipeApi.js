const appId = "app_id=8d9a0a8a";
const apiKey = "app_key=61cfb40830621f827735b64fd206f438";
let count = 0

export const recipeData = imageData => {
  return new Promise((resolve, reject) => {

    const queryCheck = (searchQuery) => {
      const xhr = new XMLHttpRequest();
      console.log(searchQuery)
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
          if(recipes.length < 1) {
            //if searchQuery has no results run next item in array
            count++
            return queryCheck(imageData[count])
          }else{
            count = 0;
            resolve([recipes, searchQuery]);
          }
         
        }
      };
  
      xhr.onerror = function() {
        reject('oops, there was an error making the request.');
        
      };
  
      xhr.send();
    }

    queryCheck(imageData[count])
   
  });
}

