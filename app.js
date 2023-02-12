//This is Javascript File
const music = new Audio("1.mp3");
let song_side = document.getElementsByClassName("song_side")[0];
let content_heading = document.getElementsByClassName("content_heading")[0];
// create Array
console.log(content_heading);
console.log(content_heading.innerHTML);

const songs = [
  {
    id: "1",
    songName: ` On My Way <br>
        <div class="subTitle">Alan Walker</div>`,
    poster: "img/1.jpg",
  },
  {
    id: "2",
    songName: ` Alan Walker-Fade <br>
        <div class="subTitle">Alan Walker</div>`,
    poster: "img/2.jpg",
  },
  // all object type
  {
    id: "3",
    songName: `Cartoon - On & On <br><div class="subTitle"> Daniel Levi</div>`,
    poster: "img/3.jpg",
  },
  {
    id: "4",
    songName: `Warriyo - Mortals <br><div class="subTitle">Mortals</div>`,
    poster: "img/4.jpg",
  },
  {
    id: "5",
    songName: `Ertugrul Gazi <br><div class="subTitle">Ertugrul</div>`,
    poster: "img/5.jpg",
  },
  {
    id: "6",
    songName: `Electronic Music <br><div class="subTitle">Electro</div>`,
    poster: "img/6.jpg",
  },
  {
    id: "7",
    songName: `Agar Tum Sath Ho <br><div class="subTitle">Tamashaa</div>`,
    poster: "img/7.jpg",
  },
  {
    id: "8",
    songName: `Suna Hai <br><div class="subTitle">Neha Kakker</div>`,
    poster: "img/8.jpg",
  },
  {
    id: "9",
    songName: `Dilber <br><div class="subTitle">Satyameva Jayate</div>`,
    poster: "img/9.jpg",
  },
  {
    id: "10",
    songName: `Duniya <br><div class="subTitle">Luka Chuppi</div>`,
    poster: "img/10.jpg",
  },
  {
    id: "11",
    songName: `Lagdi Lahore Di <br><div class="subTitle">Street Dancer 3D</div>`,
    poster: "img/11.jpg",
  },
  {
    id: "12",
    songName: `Putt Jatt Da <br><div class="subTitle">Putt Jatt Da</div>`,
    poster: "img/12.jpg",
  },
  {
    id: "13",
    songName: `Baarishein <br><div class="subTitle">Atif Aslam</div>`,
    poster: "img/13.jpg",
  },
  {
    id: "14",
    songName: `Vaaste <br><div class="subTitle">Dhvani Bhanushali</div>`,
    poster: "img/14.jpg",
  },
  {
    id: "15",
    songName: `Lut Gaye <br><div class="subTitle">Jubin Nautiyal</div>`,
    poster: "img/15.jpg",
  },
];

Array.from(document.getElementsByClassName("songItem")).forEach(
  (element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByTagName("h5")[0].innerHTML = songs[i].songName;
    // content_heading.innerHTML = songs[i].songName;
  }
);
let wave = document.getElementsByClassName("wave")[0];
// console.log(wave);
const change_pause_play = () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterPlay.classList.remove("bi-pause-fill");
    masterPlay.classList.add("bi-play-fill");
    wave.classList.remove("active2");
  }
};
let masterPlay = document.getElementById("masterPlay");
masterPlay.addEventListener("click", change_pause_play);

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.classList.remove("bi-pause-circle-fill");
      element.classList.add("bi-play-circle-fill");
    }
  );
};
const makeAllBackgrounds = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
    element.style.background = "rgb(105,105,170,0)";
  });
};

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");
// console.log(poster_master_play);
Array.from(document.getElementsByClassName("playListPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      index = e.target.id;
      makeAllPlays();
      e.target.classList.remove("bi-play-circle-fill");
      e.target.classList.add("bi-pause-circle-fill");
      music.src = `audio/${index}.mp3`;
      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
      poster_master_play.src = `img/${index}.jpg`;
      song_side.style.backgroundImage = `url("img/${index}.jpg")`;

      music.play();
      let song_title = songs.filter((ele) => {
        return ele.id == index;
      });
      song_title.forEach((ele) => {
        let { songName } = ele;
        title.innerHTML = songName;
        console.log(songName);
        content_heading.innerHTML = songName;
      });
      music.addEventListener("ended", () => {
        masterPlay.classList.remove("bi-pause-fill");
        masterPlay.classList.add("bi-play-fill");
        wave.classList.remove("active2");
      });
      makeAllBackgrounds();
      Array.from(document.getElementsByClassName("songItem"))[
        `${index}` - 1
      ].style.background = "rgb(105,105,170,0.1)";
    });
  }
);
let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = Math.floor(music.duration);
  let min = Math.floor(music_curr / 60);
  let sec = Math.floor(music_curr % 60);
  let dur_min = Math.floor(music_dur / 60);
  let dur_sec = Math.floor(music_dur % 60);
  if (dur_sec < 10) currentEnd.innerText = `${dur_min} : 0${dur_sec}`;
  else currentEnd.innerText = `${dur_min} : ${dur_sec}`;
  if (sec <= 9) {
    currentStart.innerText = `${min} : 0${sec}`;
  } else currentStart.innerText = `${min} : ${sec}`;

  let progressbar = parseInt((music.currentTime / music.duration) * 100);
  //   console.log(progressbar);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});
seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});
music.addEventListener("ended", () => {
  masterPlay.classList.remove("bi-pause-fill");
  masterPlay.classList.add("bi-play-fill");
  wave.classList.remove("active2");
});

//volume slidebar

let vol = document.getElementById("vol");
let vol_icon = document.getElementById("vol_icon");
let vol_dot = document.getElementById("vol_dot");
let vol_bar = document.getElementsByClassName("vol_bar")[0];
let vol_ab = vol.value;
vol_bar.style.width = `${vol_ab}%`;
vol_dot.style.left = `${vol_ab}%`;
music.volume = vol_ab / 100;
vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.add("bi-volume-up-fill");
  }

  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

//function for previous song
const back_func = () => {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName("songItem")).length;
  }
  music.src = `audio/${index}.mp3`;
  song_side.style.backgroundImage = `url("img/${index}.jpg")`;

  poster_master_play.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => {
    let { songName } = ele;
    content_heading.innerHTML = `${songName}`;
    title.innerHTML = songName;
  });
  makeAllPlays();
  console.log(document.getElementById(`${index}`));
  document.getElementById(`${index}`).classList.remove("bi-play-circle-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-circle-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105, 105, 170, .1)";
  change_pause_play();
};
const next_func = () => {
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName("songItem")).length) {
    index = 1;
  }
  music.src = `audio/${index}.mp3`;
  song_side.style.backgroundImage = `url("img/${index}.jpg")`;

  poster_master_play.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => {
    let { songName } = ele;
    content_heading.innerHTML = `${songName}`;

    title.innerHTML = songName;
  });
  makeAllPlays();

  document.getElementById(`${index}`).classList.remove("bi-play-circle-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-circle-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105, 105, 170, .1)";
  change_pause_play();
};
let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", back_func);

next.addEventListener("click", next_func);

let left_scroll = document.getElementById("left_scroll");
let right_scroll = document.getElementById("right_scroll");
let pop_song = document.getElementsByClassName("pop_song")[0];

left_scroll.addEventListener("click", () => {
  pop_song.scrollLeft -= 200;
});
right_scroll.addEventListener("click", () => {
  pop_song.scrollLeft += 200;
});

let left_scrolls = document.getElementById("left_scrolls");
let right_scrolls = document.getElementById("right_scrolls");
let item = document.getElementsByClassName("item")[0];

left_scrolls.addEventListener("click", () => {
  item.scrollLeft -= 200;
});
right_scrolls.addEventListener("click", () => {
  item.scrollLeft += 200;
});

//Code to pause the music after pressing space
document.addEventListener("keypress", (e) => {
  let key = e.key;
  if (key == " " || e.code == "Space") {
    // console.log();
    if (music.paused == true) {
      music.play();

      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
    } else {
      music.pause();

      masterPlay.classList.add("bi-play-fill");
      masterPlay.classList.remove("bi-pause-fill");
      wave.classList.remove("active2");
    }
  }
  //   if (e.code == "39") {
  //     console.log(Hello);
  //   }
});
document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowRight") {
    next_func();
  }
  if (e.code == "ArrowLeft") {
    back_func();
  }
});

//code to change the song_side background according to the song
