class AnimalAlertModel {
    id: number;
    title: string;
    description?: string;
    imagePath: string;
    last_location?: string;
    animal: Animal;

    constructor (animal: Animal, id: number, title: string, description: string, imagePath: string, last_location?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.last_location = last_location;
        this.animal = animal;
    }

}

class Animal {
    id: number;
    chip_number: string;
    name: string;
    species: string;
    color: string;

    constructor(data: { id: number; chip_number: string; name: string; species: string; color: string }) {
        this.id = data.id;
        this.chip_number = data.chip_number;
        this.name = data.name;
        this.species = data.species;
        this.color = data.color;
    }
}

export default AnimalAlertModel;