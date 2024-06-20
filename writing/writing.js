document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("#title");
  const detail = document.querySelector("#detail");
  const postBtn = document.querySelector("#post");
  const previousBtn = document.querySelector("#previous");
  const postForm = document.querySelector("#postForm");
  const logo = document.querySelector("h1");
  const profile = document.querySelector("#profile");
  let userId = "";

  const serverURL =
    "https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app/";

  profile.addEventListener("click", () => {
    window.location.href = `/profile?id=${userId}`;
  });

  logo.addEventListener("click", () => {
    window.location.href = `/`;
  });

  profile.addEventListener("click", () => {
    window.location.href = `$/profile?id=${userId}`;
  });

  logo.addEventListener("click", () => {
    window.location.href = `/`;
  });

  function btnColor() {
    if (title && detail) {
      if (title.value.trim() !== "" && detail.value.trim() !== "") {
        postBtn.style.color = "white";
        postBtn.style.background = "var(--Main, #3269F6)";
      } else {
        postBtn.style.color = "white";
        postBtn.style.background = "var(--gray1, #D1D1D1)";
      }
    }
  }
  title.addEventListener("input", btnColor);

  detail.addEventListener("input", btnColor);

  previousBtn.addEventListener("click", () => {
    history.back();
  });

  postBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const detail = document.getElementById("detail").value;

    const data = {
      title: title,
      content: detail,
    };

    try {
      const response = await fetch(`${serverURL}api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(error);
      }

      window.location.href = `/`;
    } catch (error) {
      console.error("Failed to post:", error);
    }
  });

  function getUserId() {
    fetch(`${serverURL}api/user`)
      .then((response) => response.json())
      .then((data) => {
        userId = data.id;
      })
      .catch((error) => console.error(error));
  }
  getUserId();
});
