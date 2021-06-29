// document.addEventListener("DOMContentLoaded", function (ev) {
//     const form = document.getElementById('google__form');
//     const name = form.querySelector("input[name='name']");
//     const phone = form.querySelector("input[name='phone']");
//     const email = form.querySelector("input[name='email']");
//     const note = form.querySelector("input[name='note']");
//     const errorElement = document.getElementById('error');
//     const successElement = document.getElementById('success');
//
//
//     form.addEventListener("submit", function(ev){
//         ev.preventDefault();
//         const errors = [];
//         if (name.value === '' || name.value == null) errors.push('Fill in name');
//         if (phone.value === '' || phone.value == null) errors.push('Fill in phone');
//         const numbers = /^\+?[0-9]+$/;
//         if(!phone.value.trim().match(numbers)) {
//             errors.push("Phone must be in correct format +11122444")
//         }
//         if (email.value === '' || email.value == null) errors.push('Fill in email');
//
//         if(errors.length > 0) {
//             errorElement.innerText = errors.join(', ');
//             errorElement.classList.add('active');
//             if (successElement.classList.contains('active')) successElement.classList.remove('active');
//             return;
//         } else {
//             successElement.classList.add('active');
//             if (errorElement.classList.contains('active')) errorElement.classList.remove('active');
//         }
//     });
// })