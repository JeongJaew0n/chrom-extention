fetch(chrome.runtime.getURL("popup.html"))
  .then(res => res.text())
  .then(html => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    // 이미지 src 경로 지정
    const img = wrapper.querySelector("#popup-image");
    img.src = chrome.runtime.getURL("images/icon-16.png");

    // X 버튼에 이벤트 리스너 추가
    wrapper.querySelector("#popup-close")?.addEventListener("click", () => {
      wrapper.remove();
    });

    document.body.appendChild(wrapper);
  });