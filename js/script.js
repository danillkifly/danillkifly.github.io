const iconToggle = document.querySelector(".toggle_icon");
const navbarMenu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu_link");
const iconClose = document.querySelector(".close_icon");
const toggleText = document.querySelector(".toggle_text");
const closeText = document.querySelector(".close_text");

// Fungsi untuk menampilkan atau menyembunyikan navbarMenu
function toggleMenu() {
  navbarMenu.classList.toggle("active");
}

iconToggle.addEventListener("click", toggleMenu);
toggleText.addEventListener("click", toggleMenu);

iconClose.addEventListener("click", () => {
  navbarMenu.classList.remove("active");
});

closeText.addEventListener("click", () => {
  navbarMenu.classList.remove("active");
});

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", () => {
    navbarMenu.classList.remove("active");
  });
});

// Tambahkan event listener pada dokumen untuk menyembunyikan navbar saat klik di luar area
document.addEventListener("click", (event) => {
  // Periksa apakah yang diklik bukan bagian dari navbar atau ikon toggle
  if (
    !navbarMenu.contains(event.target) &&
    event.target !== iconToggle &&
    event.target !== toggleText
  ) {
    navbarMenu.classList.remove("active");
  }
});

// Change Background Header
function scrollHeader() {
  const header = document.getElementById("header");
  this.scrollY >= 20
    ? header.classList.add("active")
    : header.classList.remove("active");
}

window.addEventListener("scroll", scrollHeader);

// Hero Type Effect
const typed = document.querySelector(".typed");

if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

$(document).ready(function () {
  $(".filter_item").click(function () {
    const value = $(this).attr("data-filter");
    $(".filter_item").removeClass("active-filter");
    $(this).addClass("active-filter");

    if (value == "all") {
      $(".post_box:hidden").fadeIn(300);
    } else {
      $(".post_box." + value + ":hidden").fadeIn(300); // Mempercepat animasi saat post box yang sesuai dengan filter belum terlihat
      $(".post_box:not(." + value + ")").fadeOut(300); // Animasi untuk menyembunyikan post box yang tidak sesuai dengan filter
    }
  });
});

// Post_img gambarnya akan lebih cerah jika cursor diarahkan ke gambar
document.addEventListener("DOMContentLoaded", function () {
  const postImgs = document.querySelectorAll(".post_img");

  postImgs.forEach(function (postImg) {
    postImg.addEventListener("mouseenter", function () {
      // Menyesuaikan kecerahan gambar saat kursor masuk
      postImg.style.filter = "brightness(120%)";
      postImg.style.transition = "filter 0.4s ease"; // Tambahkan properti transisi
    });

    postImg.addEventListener("mouseleave", function () {
      // Menghapus penyesuaian kecerahan saat kursor meninggalkan gambar
      postImg.style.filter = "none";
      postImg.style.transition = "filter 0.4s ease"; // Tambahkan properti transisi
    });
  });
});

// Post_img / gambarnya di klik membuka halaman baru
document.addEventListener("DOMContentLoaded", function () {
  const postImgs = document.querySelectorAll(".post_img");

  postImgs.forEach(function (postImg) {
    postImg.addEventListener("click", function () {
      // Dapatkan URL dari link yang terkait dengan gambar
      const linkURL = postImg.parentNode
        .querySelector(".post_title")
        .getAttribute("href");

      // Buka halaman baru
      window.open(linkURL, "_blank");
    });
  });
});

// Post_title di klik membuka halaman baru
document.addEventListener("DOMContentLoaded", function () {
  // Menambahkan event listener untuk gambar
  const postImgs = document.querySelectorAll(".post_img");

  postImgs.forEach(function (postImg) {
    postImg.addEventListener("click", function () {
      const linkURL = postImg.parentNode
        .querySelector(".post_title")
        .getAttribute("href");
      window.open(linkURL, "_blank");
    });
  });

  // Menambahkan event listener untuk judul posting
  const postTitles = document.querySelectorAll(".post_title");

  postTitles.forEach(function (postTitle) {
    postTitle.addEventListener("click", function (event) {
      event.preventDefault(); // Menghentikan perilaku default dari link
      const linkURL = postTitle.getAttribute("href");
      window.open(linkURL, "_blank");
    });
  });
});

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage =
    "Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}";

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "kuybal10@gmail.com",
    Password: "6717E9A24DA258AE832675CEA760375D824B",
    To: "kuybal10@gmail.com",
    From: "kuybal10@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success",
        text: "Message sent successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value ==''){
      item.classList.add('error')
      item.parentElement.classList.add('error')
    }

    item.addEventListener('keyup', () => {
      if (item.value !='') {
        item.classList.remove('error')
      item.parentElement.classList.remove('error')
      }
      else {
        item.classList.add('error')
      item.parentElement.classList.add('error')
      }
    })
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs
//   sendEmail();
// });
