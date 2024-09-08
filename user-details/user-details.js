// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
//

const userDetails=JSON.parse(localStorage.getItem('user'))


const block=document.createElement('div');
block.classList='block';

const ul=document.createElement('ul');
recursiveBuilder(userDetails,ul)
block.appendChild(ul);




function liCreator(key,value,block){
    const li=document.createElement('li');
    li.innerHTML=`<b>${key} :</b> ${value}`
    block.appendChild(li)
}

function ulCreator(key,object,block){
    const li=document.createElement('li');
    const ul=document.createElement('ul');
    li.innerHTML=`<b>${key} :</b>`
    block.appendChild(li);
    li.appendChild(ul)
    recursiveBuilder(object,ul)
}

function recursiveBuilder(object,block){
    for (const key in object) {
        typeof object[key]==='object'?ulCreator(key,object[key],block):liCreator(key,object[key],block)
    }
}


const postsMainWrap=document.createElement('div');
postsMainWrap.classList='postMainWrap';

const postButton=document.createElement('button')
postButton.innerText='post of current user';
block.append(postButton)

postButton.onclick=()=>{

        async function getPosts(){

           const posts= await fetch(`https://jsonplaceholder.typicode.com/users/${userDetails.id}/posts`).then(res=>res.json())

            for (const post of posts) {

                let title=document.createElement('div');
                title.innerText=`${post.title}`

                const postDetailsButton=document.createElement('button')
                postDetailsButton.innerText='Post Details'
                postDetailsButton.classList='postDetailsButton';

                const postTitleWrap=document.createElement('div')
                postTitleWrap.classList='postTitleWrap';
                postTitleWrap.append(title,postDetailsButton)

                postsMainWrap.appendChild(postTitleWrap)


                postDetailsButton.onclick=()=>{
                    localStorage.setItem('post',JSON.stringify(post))
                    location.href='../post-details/post-details.html'
                }
            }
        }
        getPosts()
}

document.body.append(block,postsMainWrap)

