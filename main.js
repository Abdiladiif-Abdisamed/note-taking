let noteArea = document.querySelector(".note-area");
let noteText = document.querySelector(".note-text");
let title = document.querySelector(".title");
let note = document.querySelector(".note");
let notes = document.querySelector(".notes");
//display Note area 
const showNoteArea =()=>{
     noteText.style ='display:block';
     noteArea.classList.add("note-now");
     title.setAttribute("placeholder", "Title");
     title.style=("fontSize :20px");

}
//Hide note area 
const hideNoteArea =()=>{
    noteText.style ='display:none';
    noteArea.classList.remove("note-now");
}

// function to adding note text to note
const addNote =(t,n)=>{
    notes.innerHTML +=`
       <div class="note">
                <h3 class="title-text">${t}</h3>
                <p class="note-blog">${n}</p>
                <i class="fa fa-trash"></i>  
            </div>
    
    `

        title.value ='';
        noteText.value = '';
}

// adding notes Localstroge

const addnoteToLocalStroge =(note)=>{
    if(note.length < 0){
        return;
    }
    console.log(note);
    let oldNote ;
    if(localStorage.getItem("notes")=== null){
        oldNote =[];
    }else{
        oldNote = JSON.parse(localStorage.getItem("notes"))
    }
     oldNote.push(note);
    localStorage.setItem("notes",JSON.stringify(oldNote));
}
noteArea.addEventListener("click", showNoteArea);

// add notetext to note & check isn't empty & Local Stroge
document.addEventListener("click", (event)=>{
    let isClicked = noteArea.contains(event.target);
    if(!isClicked){
        hideNoteArea();
        if(title.value.length ===0 && noteText.value.length ===0){
            return;
        }else{
            addnoteToLocalStroge([title.value , noteText.value])
            addNote(title.value , noteText.value);


        }
    }

})

//function of read local stroge
const readLocalStroge = ()=>{
    let oldNote;
    if(localStorage.getItem("notes")===  null){
        oldNote = [];
    }else{
        oldNote= JSON.parse(localStorage.getItem("notes"))
    }
    oldNote.forEach(note =>{

        notes.innerHTML +=`
        <div class="note">
                 <h3 class="title-text">${note[0]}</h3>
                 <p class="note-blog">${note[1]}</p>
                 <i class="fa fa-trash"></i>  
             </div>
     
     `

    })
}
document.addEventListener("DOMContentLoaded",readLocalStroge)


// display the trash icon
document.addEventListener("mouseover",(event)=>{

    if(event.target.classList.contains("note")){
        event.target.querySelector("i").classList.add("show");
    };

})
//Hide the trash Icon
document.addEventListener("mouseout",(event)=>{
    if(event.target.classList.contains("note")){
        event.target.querySelector("i").classList.remove("show");
    }
})
// Delete the note 

const deleteFromLocalStroge =(deletedNote)=>{
    let oldNote;
    if(localStorage.getItem("notes")===  null){
        oldNote = [];
    }else{
        oldNote= JSON.parse(localStorage.getItem("notes"))
    }

    oldNote.map((note,index)=>{

        if(note[0] == deletedNote.children[0].textContent && note[1] == deletedNote.children[1].textContent){
                    // console.log("yess");
                    oldNote.splice(index,1);
                    return oldNote;
        }
    });
    localStorage.setItem("notes",JSON.stringify(oldNote));
}
document.addEventListener("click", (event)=>{
    if(event.target.classList.contains("fa-trash")){
        event.target.parentElement.remove();
        deleteFromLocalStroge(event.target.parentElement);
    }
})








