authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('auth-name').value;
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Handle successful login/signup (store JWT in localStorage)
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            authSection.style.display = 'none';
            welcome.style.display = 'flex';

            setTimeout(() => {
                welcome.style.display = 'none';
                appContent.style.display = 'block';
            }, 2000);
        } else {
            alert(data.msg);
        }
    } catch (err) {
        console.error(err);
        alert('Something went wrong, please try again.');
    }
});
