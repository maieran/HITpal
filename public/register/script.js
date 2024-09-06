document.getElementById('register-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Registration successful');
      window.location.href = '/login'; // Redirect to login page
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
