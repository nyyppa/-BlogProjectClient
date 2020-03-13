export default class utils {
    //remove post from backend
    removePost(id){
        console.log("remove id:" + id);
        fetch("http://localhost:8080/delete/" + id, {
            method: 'DELETE',
        });
    }
    //modify post from backend
    addPost(idIn, authorIn, textIn){
        const data = { id: idIn, author: authorIn, text: textIn };
        fetch("http://localhost:8080/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            console.log("data send");
        });
    }
    //add new post to backend
    addNewPost(authorIn,textIn){
        const data = { author: authorIn, text: textIn };
        fetch("http://localhost:8080/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            console.log("data send");
        });
    }
}