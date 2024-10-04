// show catagories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
loadCatagories();

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML =
    `
    <button id="${item.category_id}" class="btn btn-primary"  onclick="loadcategoriesVideos('${item.category_id}')">${item.category}</button>
    `
    
    categoriesContainer.append(buttonContainer);
  });
};

// show videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
loadVideos();

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";

if(videos.length === 0){
  videosContainer.classList.remove("grid");
  const emptyDiv = document.createElement("div");
  emptyDiv.classList = "flex justify-center items-center";
  emptyDiv.innerHTML = `
  <h1 class="text-3xl font-bold text-center">No Videos Found</h1>
  `
  videosContainer.append(emptyDiv);
  return;
}
else{
  videosContainer.classList.add("grid");
}

  videos.forEach((video) => {
    console.log(video);

    const videoDiv = document.createElement("div");
    videoDiv.classList = "card card-compact ";
    
    videoDiv.innerHTML = `
         <figure class="h-[200px] relative" >
    <img
      src=${video.thumbnail}
      class="w-full h-full object-cover"
      alt="video" />

    ${video.others.posted_date?.length === 0 ? "" : `<span class="absolute bottom-2 right-2 bg-black text-white p-1 px-2 rounded-lg">${video.others.posted_date}</span>`}

    
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} class="w-12 h-12 rounded-full" />
    </div>
    <div >
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>

    ${video.authors[0].verified === true ?
         `<img class="w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" />` : ``}

    </div>
   
    
    </div>

   
  </div>
        
        `;

    videosContainer.append(videoDiv);
  });
};
// show videos based on catagory

const loadcategoriesVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};
