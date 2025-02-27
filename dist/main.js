(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-32",headers:{authorization:"722f9317-1629-4396-87db-5b13933a4340","Content-Type":"application/json"}};function o(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function a(e,t,n){var a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=a.querySelector(".card__image"),i=a.querySelector(".card__title"),u=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-container")||document.createElement("div");a.querySelector(".card__like-container")||(s.classList.add("card__like-container"),l.parentNode.appendChild(s),s.appendChild(l));var d=a.querySelector(".card__like-counter");return d||((d=document.createElement("span")).classList.add("card__like-counter"),s.appendChild(d)),a.dataset.cardId=e._id,c.src=e.link,c.alt=e.name,i.textContent=e.name,d.textContent=e.likes?e.likes.length:0,e.likes&&e.likes.some((function(e){return e._id===n}))&&l.classList.add("card__like-button_is-active"),e.owner&&e.owner._id===n||(u.style.display="none"),u.addEventListener("click",(function(){var t;(t=e._id,fetch("".concat(r.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:r.headers}).then(o)).then((function(){a.remove()})).catch((function(e){console.error("Ошибка при удалении карточки: ".concat(e))}))})),l.addEventListener("click",(function(){var t;l.classList.contains("card__like-button_is-active")?(t=e._id,fetch("".concat(r.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:r.headers}).then(o)).then((function(e){l.classList.remove("card__like-button_is-active"),d.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при снятии лайка: ".concat(e))})):function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(o)}(e._id).then((function(e){l.classList.add("card__like-button_is-active"),d.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при постановке лайка: ".concat(e))}))})),c.addEventListener("click",(function(){t({name:e.name,link:e.link})})),a}var c={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function i(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}function u(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),r.classList.add(t.inactiveButtonClass),r.disabled=!0}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,f=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),m=document.querySelector(".profile__image"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_avatar"),S=document.querySelector(".popup_type_image"),b=S.querySelector(".popup__image"),q=S.querySelector(".popup__caption"),k=y.querySelector(".popup__input_type_name"),E=y.querySelector(".popup__input_type_description"),L=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),x=v.querySelector(".popup__form"),A=y.querySelector(".popup__form"),U=h.querySelector(".popup__form"),w=h.querySelector("#avatar-input"),T=document.querySelector(".places__list"),j=x.querySelector(".popup__input_type_card-name"),B=x.querySelector(".popup__input_type_url");function O(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function D(t){b.src=t.link,b.alt=t.name,q.textContent=t.name,e(S)}document.querySelectorAll(".popup").forEach((function(e){var n=e.querySelector(".popup__close");n&&n.addEventListener("click",(function(){return t(e)})),e.addEventListener("mousedown",(function(n){n.target===n.currentTarget&&t(e)})),e.classList.add("popup_is-animated")})),A.addEventListener("submit",(function(e){e.preventDefault();var n,a=A.querySelector(".popup__button");O(!0,a),(n={name:k.value,about:E.value},fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n.name,about:n.about})}).then(o)).then((function(e){L.textContent=e.name,C.textContent=e.about,t(y)})).catch((function(e){console.error("Ошибка при обновлении профиля: ".concat(e))})).finally((function(){O(!1,a)}))})),x.addEventListener("submit",(function(e){e.preventDefault();var n,i=x.querySelector(".popup__button");O(!0,i),(n={name:j.value,link:B.value},fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(o)).then((function(e){var n=a(e,D,p);T.prepend(n),t(v),x.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки: ".concat(e))})).finally((function(){O(!1,i),s(x,c)}))})),U.addEventListener("submit",(function(e){e.preventDefault();var n,a=U.querySelector(".popup__button");O(!0,a),(n=w.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(o)).then((function(e){g.style.backgroundImage="url(".concat(e.avatar,")"),t(h),U.reset()})).catch((function(e){console.error("Ошибка при обновлении аватара: ".concat(e))})).finally((function(){O(!1,a)}))})),f.addEventListener("click",(function(){k.value=L.textContent,E.value=C.textContent,s(A,c),e(y)})),_.addEventListener("click",(function(){x.reset(),s(x,c),e(v)})),m.addEventListener("click",(function(){U.reset(),s(U,c),e(h)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?u(e,t,n):t.validity.patternMismatch&&t.dataset.errorMessage?i(e,t,t.dataset.errorMessage,n):i(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(c),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then(o),fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then(o)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];p=o._id,L.textContent=o.name,C.textContent=o.about,o.avatar&&(g.style.backgroundImage="url(".concat(o.avatar,")")),c.forEach((function(e){var t=a(e,D,p);T.append(t)}))})).catch((function(e){console.error("Ошибка при загрузке данных: ".concat(e))}))})();