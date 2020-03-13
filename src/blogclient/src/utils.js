export default class utils {
    removePost(id, after){
        console.log("remove id:" + id);
        /*
        ongelmia
         */
        fetch("http://localhost:8080/delete/" + id, {
            method: 'DELETE',
        });
    }
    addPost(idIn, authorIn, textIn, after){
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
    addNewPost(authorIn,textIn, after){
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