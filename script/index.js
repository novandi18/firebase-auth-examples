// Conditional Menu
const logoutLinks = document.querySelectorAll("#logout");
const loginLinks = document.querySelectorAll("#login");
const txt = document.querySelector(".txt");
const accountBody = document.querySelector("#accountInfo");

const setupUI = (user) => {
    if(user) {
        // Show collection data to document
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <h1 class="mt-5">Welcome back, ${doc.data().name}!</h1>
            `;
            const accountInfo = `
            <p>Display name : ${doc.data().name}</p>
            <p>Email address : ${user.email}</p>
            `;
            accountBody.innerHTML = accountInfo;
            txt.innerHTML = html;
        });

        logoutLinks.forEach(item => item.style.display = 'block');
        loginLinks.forEach(item => item.style.display = 'none');
    } else {
        const html = `
            <h1 class="mt-5">You are not logged in to any account.</h1>
        `;
        txt.innerHTML = html;
        logoutLinks.forEach(item => item.style.display = 'none');
        loginLinks.forEach(item => item.style.display = 'block');
    }
}