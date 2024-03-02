document.querySelector('.exit').addEventListener('click', () => {
    document.getElementById('overlay-exit').classList.remove('hidden-exit')
    document.getElementById('postForm-exit').classList.remove('hidden-exit')

    document.querySelector('.close-button-exit').addEventListener('click', () => {
        document.getElementById('overlay-exit').classList.add('hidden-exit')
        document.getElementById('postForm-exit').classList.add('hidden-exit')
    })

    document.querySelector('.no-button').addEventListener('click', () => {
        document.getElementById('overlay-exit').classList.add('hidden-exit')
        document.getElementById('postForm-exit').classList.add('hidden-exit')
    })
    document.querySelector('.yes-button').addEventListener('click', () => {
        window.location.href = 'index.html'
    })
})

document.addEventListener('DOMContentLoaded', () => {
    posts = ''
    xhr = new XMLHttpRequest();
    id = localStorage.getItem('id_user')
    xhr.open('GET', 'hendler.php?user_id=' + id, true)
    xhr.responseType = 'json'

    xhr.onload = () => {
        if(xhr.status == 200) {
            posts = xhr.response.posts
            console.log(xhr.response)
            console.log(posts)
            if (posts !== '') {
                posts_user = document.querySelector('.posts-user')
                for (i = 0; i < posts.length; i++) {
                    postDiv = document.createElement('div')
                    postDiv.classList.add('post-div')
                    post = document.createElement('div')
                    post.classList.add('post')
                    title = document.createElement('div')
                    title.classList.add('post-title')
                    text = document.createElement('div')
                    text.classList.add('text-post')
                    title.textContent = posts[i].data
                    text.textContent = posts[i].text_post
                    post.appendChild(title)
                    post.appendChild(text)
                    postDiv.appendChild(post)
                    posts_user.appendChild(postDiv)
                }
            }
        }
        else {
            console.error(xhr.status)
        }
    }
    xhr.send();

})

document.getElementById('add').addEventListener('click', () => {
    document.getElementById('overlay').classList.remove('hidden')
    document.getElementById('postForm').classList.remove('hidden')

    document.querySelector('.close-button').addEventListener('click', () => {
        document.getElementById('overlay').classList.add('hidden')
        document.getElementById('postForm').classList.add('hidden')
    })
    document.getElementById('postFormForm').addEventListener('submit', e => {
        e.preventDefault()

        let postLable = document.getElementById('postLabel').value 
        let postText = document.getElementById('postText').value
        let idUser = JSON.parse(localStorage.getItem('id_user'))

        if (postLable !== '' &&
        postText !== '') {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', 'hendler.php', true)
            xhr.setRequestHeader('Content-type', 'application/json')

            let data = {
                idUser: idUser,
                postLable: postLable,
                postText: postText,
                fromForm: "add"
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.responseText)
                    document.getElementById('overlay').classList.add('hidden')
                    document.getElementById('postForm').classList.add('hidden')
                }
            }
            xhr.send(JSON.stringify(data))
        }

    })
})


