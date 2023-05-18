import FirebaseSerive from "./firebase-service.js";

const firebaseService = new FirebaseSerive();

document.getElementById('formLogin').addEventListener('submit',()=>{
    console.log(email.value, password.value)
    firebaseService.onLoginUser(email.value, password.value).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('Đăng nhập thành công');
        window.location.pathname = 'system.html';
        firebaseService.observableAuthChanged();

    })
    .catch((error) => {
        alert("Đăng nhập thất bại");
    });
})

function onSignUp(){
    var email = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var cfpass = document.getElementById("confirmpass").value;
    firebaseService.onRegisterUser(email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Đăng ký người dùng thành công ");
        })
        .catch((error) => {
            alert(error.message);
        });
}