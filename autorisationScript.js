document.getElementById('autorisationForm').addEventListener('submit', event => {
    event.preventDefault()

    let name = document.getElementById('name').value 
    let password = document.getElementById('password').value

    let xhr = new XMLHttpRequest()

    xhr.open('POST', 'hendler.php', true)
    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText)
            } else {
                console.error('error: ' + xhr.status)
            }
        }
    }

    let data = {
        name: name,
        email: "0",
        password: password,
        fromForm: "aut"
    }
    allowed = false
    xhr.onload = () => {
        resoponse = ''
    
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText)
            response = JSON.parse(xhr.responseText)
        } else {
            console.error('Error sending request:', xhr.statusText)
        }
        if (response.aut === 'allowed') {
            allowed = true
            localStorage.setItem('id_user', JSON.stringify(JSON.parse(xhr.responseText).id_user))
            window.location.href = 'userpage.html'
        } else if (response.aut === 'denied') {
            alert('incorrect password')
        } else {
            alert('Error!')
        }
    }
    xhr.onerror = () => {
        console.error('Network error')
    }

    xhr.send(JSON.stringify(data))
})