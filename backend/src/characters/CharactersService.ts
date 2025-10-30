import { CharactersRepository } from "./CharactersRepository.js";

export class CharactersService {
  constructor(private charactersRepository: CharactersRepository) {}

  async getAllCharacters() {
    return this.charactersRepository.findAll();
  }

  async getCharacterById(id: string) {
    return this.charactersRepository.findById(id);
  }

  async createCharacter(data: any) {
    return this.charactersRepository.create(data);
  }

  async updateCharacter(id: string, data: any) {
    return this.charactersRepository.update(id, data);
  }

  async deleteCharacter(id: string) {
    return this.charactersRepository.delete(id);
  }
}
