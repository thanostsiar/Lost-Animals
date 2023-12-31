class AnimalAlertModel {
    id: number;
    title: string;
    description?: string;
    picture_url: string;
    chip_number?: string;
    last_location?: string;
    animal: Animal;

    constructor (animal: Animal, id: number, title: string, description: string, picture_url: string, chip_number?: string, last_location?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture_url = picture_url;
        this.chip_number = chip_number;
        this.last_location = last_location;
        this.animal = animal;
    }

}

class Animal {
    id: number;
    name: string;
    species: string;
    color: string;

    constructor(data: { id: number; name: string; species: string; color: string }) {
        this.id = data.id;
        this.name = data.name;
        this.species = data.species;
        this.color = data.color;
    }
}

export default AnimalAlertModel;