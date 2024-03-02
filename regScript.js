document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault()
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirmPassword').value
    if (e.submitter.id === 'sub'  &&
    name != '' &&
    email != '' &&
    password != '' &&
    confirmPassword != '') {
        if (password !== confirmPassword) {
            alert('password and confirm password not match')
            return
        }
        let xhr = new XMLHttpRequest()
        xhr.open('POST', 'hendler.php', true)
        xhr.setRequestHeader('Content-Type', 'application/json')

        let data = {
            name: name,
            email: email, 
            password: password,
            fromForm: "reg"
        }
        xhr.onload = () => {
            response = ''
            if (xhr.status >= 200 && xhr.status < 300) {
                response = JSON.parse(xhr.responseText)
                console.log(response)
            } else {
                console.error('Error sending requset:', xhr.statusText)
            }
            if (response.name == "yes") {
                window.location.href = 'autorisation.html'
                
                
            } else if (response.name == "no") {
                alert('Name alredy exist')
            } else alert('Error')
        }
        xhr.send(JSON.stringify(data))
    } else if (e.submitter.id === 'aut') {
        window.location.href = 'autorisation.html'
    }


})