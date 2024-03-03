class CreateAnimalAlert {
  title: string;
  description: string;
  imagePath: string;
  chipNumber: string;
  lastLocation: string;
  name: string;
  species: string;
  color: string;
  userEmail: string

  constructor (name: string, title: string, description: string, chipNumber: string, lastLocation: string, species: string, color: string, imagePath: string, userEmail: string) {
      this.title = title;
      this.description = description;
      this.chipNumber = chipNumber;
      this.lastLocation = lastLocation;
      this.name = name;
      this.species = species;
      this.color = color;
      this.imagePath = imagePath;
      this.userEmail = userEmail;
  }

}

export default CreateAnimalAlert;