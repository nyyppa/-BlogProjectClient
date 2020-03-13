export default class utils {
    removePost(id){
        console.log("remove id:" + id);
        /*
        ongelmia
         */
        fetch("http://localhost:8080/delete/" + id, {
            method: 'DELETE',
        });
    }
    addPost(id, author, text){

    }
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