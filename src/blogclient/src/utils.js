export default class utils {
    //remove post from backend
    removePost(id){
        console.log("remove id:" + id);
        fetch("http://localhost:8080/delete/" + id, {
            method: 'DELETE',
        });
    }
    //modify backend post
    addPostWithTags(idIn, authorIn, textIn, tag){
        if(tag.length >= 2) {
            let vali = [];
            for(let lap=0; lap < tag.length; lap++){
                vali.push({tagId : tag[lap]});
            }
            const data = {id: idIn, author: authorIn, text: textIn, tags: vali};
            console.log("data: " + JSON.stringify(data));
            fetch("http://localhost:8080/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => {
                console.log("data send");
            });
        } else{
            alert("add least 2 tags. (separate tags with ,)");
        }
    }
    //add new post to backend with tags
    addNewPost(authorIn,textIn, tag){
        if(tag.length >= 2) {
            let vali = [];
            for(let lap=0; lap < tag.length; lap++){
                vali.push({tagId : tag[lap]});
            }
            const data = {author: authorIn, text: textIn, tags: vali};
            console.log("data: " + JSON.stringify(data));
            fetch("http://localhost:8080/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => {
                console.log("data send");
            });
        } else{
            alert("add least 2 tags. (separate tags with ,)");
        }
    }
}