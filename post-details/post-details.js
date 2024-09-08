// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const postDetails=JSON.parse(localStorage.getItem('post'));


const postWrapper=document.createElement('div');
postWrapper.classList='postWrapper';

for (const key in postDetails) {

    const postBlock=document.createElement('div');

    postBlock.innerHTML=(` <b>${key} :</b> ${postDetails[key]}; `)

    postWrapper.append(postBlock);

}

const commentMainWrapper=document.createElement('div')
commentMainWrapper.classList='commentMainWrapper';

async function getComments(){

    const comments=await fetch(`https://jsonplaceholder.typicode.com/posts/${postDetails.id}/comments`).then(res=>res.json())

    for (const comment of comments) {

            const commentWrapper=document.createElement('div');
            commentWrapper.classList='commentWrapper';

        for (const commentElement in comment) {

            const commentBlock=document.createElement('div');

            commentBlock.innerHTML=(` <b/>${commentElement} :</b> ${comment[commentElement]};`)

            commentWrapper.append(commentBlock)
        }
            commentMainWrapper.appendChild(commentWrapper)
    }
}
getComments()
document.body.append(postWrapper,commentMainWrapper)


