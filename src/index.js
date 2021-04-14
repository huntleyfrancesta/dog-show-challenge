document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs() {
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(dogs => showDogs(dogs))
}

function showDogs(dogs) {
    createElements(dogs)
}

function createElements(dogs) {

    for (const dog of dogs) {
        //creating table elements
        let table = document.getElementById('table-body')
        let row = table.insertRow(0)
        let name = row.insertCell(0)
        let breed = row.insertCell(1)
        let sex = row.insertCell(2)
        let edit = row.insertCell(3)

        //assigning table elements
        name.textContent = dog.name
        breed.textContent = dog.breed
        sex.textContent = dog.sex
        edit.innerHTML = `<button type='button' id = '${dog.id}'>Edit Dog</button>`
        edit.addEventListener('click', () => {
            handleEdit(dog)
        })
    }
}


function handleEdit(dog) {
    //populating form values
    let form = document.getElementById('dog-form')
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.dataset.id = dog.id
    form.addEventListener('submit', (e) => {
        handleSubmit(e, dog)
    })
}

function handleSubmit(form, dog) { //submitting edits from form
    form.preventDefault()
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'name': form.target.name.value,
                'breed': form.target.breed.value,
                'sex': form.target.sex.value
            })
        }).then(resp => resp.json())
        .then(console.log)
    setTimeout(getDogs, 10)
}