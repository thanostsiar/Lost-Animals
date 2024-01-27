class AddAnimalAlertRequest {
    title: string;
    description: string;
    picture_url?: string;
    chip_number: string;
    last_location?: string;
    animal: Animal;

    constructor (animal: Animal, title: string, description: string, chip_number: string, last_location?: string) {
        this.animal = animal;
        this.title = title;
        this.description = description;
        this.chip_number = chip_number;
        this.last_location = last_location;
    }
}

class Animal {
    name: string;
    species: string;
    color: string;

    constructor(data: { id: number; name: string; species: string; color: string }) {
        this.name = data.name;
        this.species = data.species;
        this.color = data.color;
    }
}

class User {
    first_name: string;
    last_name: string;

    constructor (first_name: string, last_name: string) {
        this.first_name = first_name;
        this.last_name = last_name;
    }
}

export default AddAnimalAlertRequest;